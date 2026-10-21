import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { redesAutores, separarAutores } from "../autores";
import { formatearFecha, getNota, getNotas } from "../datos";
import { TarjetaNota } from "../tarjeta";
import { TextoNota } from "../texto";

type Props = { params: Promise<{ slug: string }> };

const pastilla =
  "rounded-full border border-crema/25 px-3 py-1 text-xs font-semibold text-crema/90 transition hover:border-oro hover:text-oro";

function RedesAutores({ autores }: { autores: string }) {
  const conRedes = separarAutores(autores).filter((a) => redesAutores[a]);
  if (conRedes.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
      {conRedes.map((nombre) => {
        const r = redesAutores[nombre];
        return (
          <li key={nombre} className="flex flex-wrap items-center gap-2">
            {conRedes.length > 1 && <span className="text-crema/70">{nombre}</span>}
            {r.instagram && (
              <a
                href={`https://www.instagram.com/${r.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={pastilla}
              >
                Instagram
              </a>
            )}
            {r.linkedin && (
              <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className={pastilla}>
                LinkedIn
              </a>
            )}
          </li>
        );
      })}
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
                  Por <span className="font-semibold text-crema">{nota.autores}</span>
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
