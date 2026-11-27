import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header, Titulo, lineasHero } from "../../../components";
import { Avatar } from "../../../equipo/miembro";
import { redesDe } from "../../autores";
import { getAutor, getAutores } from "../../datos";
import { buscarEnEquipo } from "../../equipo-autor";
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

export default async function AutorPage({ params }: Props) {
  const autor = getAutor((await params).slug);
  if (!autor) notFound();
  const equipo = buscarEnEquipo(autor.slug);
  const redes = redesDe(autor.nombre);
  // Las regiones sobre las que más escribe, de más a menos frecuente (hasta tres).
  const cuenta = new Map<string, number>();
  for (const n of autor.notas) if (n.region) cuenta.set(n.region, (cuenta.get(n.region) ?? 0) + 1);
  const temas = [...cuenta.entries()]
    .sort((x, y) => y[1] - x[1])
    .slice(0, 3)
    .map(([r]) => r);

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-tierra text-crema">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={lineasHero} />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border-[3rem] border-oro/10"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
            <Link href="/notas/autores" className="text-sm font-medium text-crema/70 hover:text-oro">
              ← Todos los autores
            </Link>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar persona={equipo?.persona ?? { nombre: autor.nombre, cargo: "" }} size="lg" />
              <div>
                <h1 className="text-4xl tracking-tight sm:text-6xl">
                  <span className="font-serif font-medium italic text-oro">
                    {autor.nombre.split(" ")[0]}
                  </span>{" "}
                  <span className="font-bold">{autor.nombre.split(" ").slice(1).join(" ")}</span>
                </h1>
                {equipo && (
                  <p className="mt-2 text-sm font-medium uppercase tracking-wider text-oro">
                    {equipo.cargo}
                  </p>
                )}
                <p className="mt-2 text-crema/80">
                  {autor.notas.length} {autor.notas.length === 1 ? "nota publicada" : "notas publicadas"} en
                  Panorama Universal
                </p>
                {temas.length > 0 && (
                  <p className="mt-2 text-sm text-crema/80">
                    Escribe sobre{" "}
                    <span className="font-semibold text-oro">{temas.join(" · ")}</span>
                  </p>
                )}
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
          <Titulo cursiva="Sus" className="mb-8 border-b border-tierra pb-4">
            notas
          </Titulo>
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
