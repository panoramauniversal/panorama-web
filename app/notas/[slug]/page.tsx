import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header, Titulo, lineasHero } from "../../components";
import { Avatar } from "../../equipo/miembro";
import { buscarEnEquipo } from "../equipo-autor";
import { redesDe, separarAutores, slugAutor } from "../autores";
import { fechaCorta, getNota, getNotas } from "../datos";
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
          <Link
            href={`/notas/autores/${slugAutor(nombre)}`}
            className="font-semibold text-crema hover:text-oro"
          >
            {nombre}
          </Link>
        </span>
      ))}
    </>
  );
}

// Al final de la nota: quién la escribió, con su foto (si es del equipo), cargo y redes.
function FichaAutores({ autores }: { autores: string }) {
  const nombres = separarAutores(autores);
  return (
    <aside className="mt-14 rounded-3xl border border-tierra/10 bg-white p-7 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-oro">
        {nombres.length > 1 ? "Escribieron esta nota" : "Escribió esta nota"}
      </p>
      <ul className="mt-5 grid gap-6 sm:grid-cols-2">
        {nombres.map((nombre) => {
          const slug = slugAutor(nombre);
          const equipo = buscarEnEquipo(slug);
          const redes = redesDe(nombre);
          return (
            <li key={nombre} className="flex gap-4">
              <Avatar persona={equipo?.persona ?? { nombre, cargo: "" }} size="sm" />
              <div>
                <Link href={`/notas/autores/${slug}`} className="text-lg font-semibold hover:text-oro">
                  {nombre}
                </Link>
                {equipo && (
                  <p className="text-xs font-medium uppercase tracking-wider text-tierra-suave">
                    {equipo.cargo}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {redes && <BotonesRedes redes={redes} />}
                  <Link
                    href={`/notas/autores/${slug}`}
                    className="text-xs font-semibold text-tierra underline underline-offset-4 hover:text-oro"
                  >
                    Todas sus notas →
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
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
        openGraph: {
          title: nota.titulo,
          description: nota.resumen,
          type: "article",
          ...(nota.imagen && { images: [nota.imagen] }),
        },
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
          <header className="relative overflow-hidden bg-tierra text-crema">
            <div aria-hidden className="pointer-events-none absolute inset-0" style={lineasHero} />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border-[3rem] border-oro/10"
            />
            <div
              className={`relative mx-auto max-w-4xl px-4 pt-14 sm:px-6 md:pt-16 ${nota.imagen ? "pb-32 md:pb-44" : "pb-14 md:pb-16"}`}
            >
              <Link href="/notas" className="text-sm font-medium text-crema/70 hover:text-oro">
                ← Todas las notas
              </Link>
              <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-oro">
                <span>{fechaCorta(nota.fecha)}</span>
                {nota.region && <span>{nota.region}</span>}
                {nota.colaboracion && <span>En colaboración con {nota.colaboracion}</span>}
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {nota.titulo}
              </h1>
              <p className="mt-6 text-crema/80">
                Por <Autores autores={nota.autores} />
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {nota.imagen && (
              <figure className="-mt-24 md:-mt-36">
                <Image
                  src={nota.imagen}
                  alt=""
                  width={1200}
                  height={675}
                  sizes="(min-width: 896px) 848px, 100vw"
                  priority
                  className="relative aspect-video w-full rounded-3xl object-cover shadow-2xl"
                />
                {nota.credito && (
                  <figcaption className="mt-2 text-xs text-tierra-suave">
                    {nota.creditoUrl ? (
                      <a
                        href={nota.creditoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-oro"
                      >
                        {nota.credito}
                      </a>
                    ) : (
                      nota.credito
                    )}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-14">
            <p className="font-serif text-xl leading-relaxed text-tierra sm:text-2xl">
              {nota.resumen}
            </p>
            <div className="mt-8 h-px w-16 bg-oro" />
            <div className="mt-8">
              <TextoNota cuerpo={nota.cuerpo} />
            </div>
            <FichaAutores autores={nota.autores} />
          </div>
        </article>

        {otras.length > 0 && (
          <section className="border-t border-tierra/10 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
              <Titulo cursiva="Más" className="mb-8">
                notas
              </Titulo>
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
