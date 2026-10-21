import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { redesDe, separarAutores, slugAutor } from "../autores";
import { formatearFecha, getNota, getNotas } from "../datos";
import { TarjetaNota } from "../tarjeta";
import { BotonesRedes } from "../redes";
import { TextoNota } from "../texto";

type Props = { params: Promise<{ slug: string }> };

function Autores({ autores }: { autores: string }) {
  const nombres = separarAutores(autores);
  return (
    <>
      {nombres.map((nombre, i) => (
        <span key={nombre}>
          {i > 0 && (i === nombres.length - 1 ? " y " : ", ")}
          <Link href={`/notas/autores/${slugAutor(nombre)}`} className="font-semibold text-crema hover:text-oro">
            {nombre}
          </Link>
        </span>
      ))}
    </>
  );
}

function RedesAutores({ autores }: { autores: string }) {
  const conRedes = separarAutores(autores).filter((a) => redesDe(a));
  if (conRedes.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
      {conRedes.map((nombre) => (
        <li key={nombre} className="flex flex-wrap items-center gap-2">
          {conRedes.length > 1 && <span className="text-crema/70">{nombre}</span>}
          <BotonesRedes redes={redesDe(nombre)!} light />
        </li>
      ))}
    </ul>
  );
}

export function generateStaticParams() {
  return getNotas().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const nota = getNota((await params).slug);
  return nota
    ? {
        title: `${nota.titulo} | Panorama Universal`,
        description: nota.resumen,
        openGraph: { title: nota.titulo, description: nota.resumen, type: "article" },
      }
    : {};
}

export default async function NotaPage({ params }: Props) {
  const nota = getNota((await params).slug);
  if (!nota) notFound();

  const otras = getNotas()
    .filter((n) => n.slug !== nota.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <article>
          <header className="bg-tierra text-crema">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
              <Link href="/notas" className="text-sm font-medium text-crema/70 hover:text-oro">
                ← Todas las notas
              </Link>
              <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {nota.titulo}
              </h1>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-crema/80">
                <span>
                  Por <Autores autores={nota.autores} />
                </span>
                <span>{formatearFecha(nota.fecha)}</span>
                {nota.colaboracion && <span>En colaboración con {nota.colaboracion}</span>}
              </div>
              <RedesAutores autores={nota.autores} />
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
            <p className="border-l-4 border-oro pl-5 font-serif text-xl leading-relaxed sm:text-2xl">
              {nota.resumen}
            </p>
            <div className="mt-10">
              <TextoNota cuerpo={nota.cuerpo} />
            </div>
          </div>
        </article>

        {otras.length > 0 && (
          <section className="border-t border-tierra/10 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
              <h2 className="mb-6 text-2xl font-bold">Más notas</h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {otras.map((n) => (
                  <li key={n.slug}>
                    <TarjetaNota nota={n} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
