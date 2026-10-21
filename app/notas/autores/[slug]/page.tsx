import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../../components";
import { areas } from "../../../equipo";
import { Avatar } from "../../../equipo/miembro";
import { redesDe } from "../../autores";
import { getAutor, getAutores } from "../../datos";
import { BotonesRedes } from "../../redes";
import { TarjetaNota } from "../../tarjeta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAutores().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const autor = getAutor((await params).slug);
  if (!autor) return {};
  const titulo = `${autor.nombre} | Autores de Panorama Universal`;
  const descripcion = `Todas las notas de ${autor.nombre} en Panorama Universal.`;
  return { title: titulo, description: descripcion, openGraph: { title: titulo, description: descripcion } };
}

// Si la persona forma parte del equipo, usamos su foto y su cargo.
function buscarEnEquipo(nombre: string) {
  for (const area of areas) {
    const persona = area.integrantes.find(
      (p) => p.nombre === nombre || p.nombre.startsWith(`${nombre} `),
    );
    if (persona) return { persona, area };
  }
}

export default async function AutorPage({ params }: Props) {
  const autor = getAutor((await params).slug);
  if (!autor) notFound();
  const equipo = buscarEnEquipo(autor.nombre);
  const redes = redesDe(autor.nombre);

  return (
    <>
      <Header />
      <main>
        <section className="bg-tierra text-crema">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Link href="/notas/autores" className="text-sm font-medium text-crema/70 hover:text-oro">
              ← Todos los autores
            </Link>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar persona={equipo?.persona ?? { nombre: autor.nombre, cargo: "" }} size="lg" />
              <div>
                <h1 className="text-4xl font-bold sm:text-5xl">{autor.nombre}</h1>
                {equipo && (
                  <p className="mt-2 text-sm font-medium uppercase tracking-wider text-oro">
                    {equipo.persona.cargo} · {equipo.area.nombre}
                  </p>
                )}
                <p className="mt-2 text-crema/80">
                  {autor.notas.length} {autor.notas.length === 1 ? "nota publicada" : "notas publicadas"} en
                  Panorama Universal
                </p>
                {redes && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <BotonesRedes redes={redes} light />
                  </div>
                )}
              </div>
            </div>
            {equipo?.persona.bio && (
              <p className="mt-8 max-w-3xl leading-relaxed text-crema/80">{equipo.persona.bio}</p>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="mb-6 text-2xl font-bold">Sus notas</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {autor.notas.map((n) => (
              <li key={n.slug}>
                <TarjetaNota nota={n} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
