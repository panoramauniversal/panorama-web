import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Footer, Header, MailLink } from "../../components";
import { areas, getArea } from "../../equipo";
import { TarjetaMiembro } from "../miembro";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getArea((await params).slug);
  return area
    ? { title: `${area.nombre} | Panorama Universal`, description: area.resumen }
    : {};
}

function QueHacemos({ tareas }: { tareas: string[] }) {
  return (
    <div>
      <Eyebrow>Qué hacemos</Eyebrow>
      <ul className="space-y-4">
        {tareas.map((t) => (
          <li key={t} className="flex gap-3 text-tierra-suave">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-oro" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contacto({ mail, className = "" }: { mail: string; className?: string }) {
  return (
    <p className={`rounded-2xl bg-oro-claro p-5 text-sm ${className}`}>
      <span className="block font-semibold">Contacto</span>
      <MailLink mail={mail} className="text-[13px] tracking-tight" />
    </p>
  );
}

export default async function AreaPage({ params }: Props) {
  const area = getArea((await params).slug);
  if (!area) notFound();

  const otras = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <Header />
      <main>
        <section className="bg-tierra text-crema">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Link
              href="/equipo"
              className="text-sm font-medium text-crema/70 transition hover:text-oro"
            >
              ← Todo el equipo
            </Link>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">{area.nombre}</h1>
            <p className="mt-5 max-w-3xl text-lg text-crema/80">{area.descripcion}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          {area.integrantes.length > 2 ? (
            // Con más de dos integrantes, van todos en una misma fila a lo ancho.
            <>
              <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-start">
                <QueHacemos tareas={area.tareas} />
                {area.mail && <Contacto mail={area.mail} />}
              </div>
              <div className="mt-14">
                <Eyebrow>Integrantes</Eyebrow>
                <div className="grid gap-5 lg:grid-cols-3">
                  {area.integrantes.map((p) => (
                    <TarjetaMiembro key={p.nombre} persona={p} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
              <div>
                <QueHacemos tareas={area.tareas} />
                {area.mail && <Contacto mail={area.mail} className="mt-8" />}
              </div>
              <div>
                <Eyebrow>Integrantes</Eyebrow>
                <div className="grid items-start gap-5 lg:grid-cols-2">
                  {area.integrantes.map((p) => (
                    <TarjetaMiembro key={p.nombre} persona={p} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="border-t border-tierra/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-tierra-suave">
              Otras áreas
            </p>
            <ul className="flex flex-wrap gap-3">
              {otras.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/equipo/${a.slug}`}
                    className="block rounded-full border border-tierra/15 px-4 py-2 text-sm font-medium transition hover:border-oro hover:text-oro"
                  >
                    {a.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/equipo/voluntariado"
                  className="block rounded-full bg-oro px-4 py-2 text-sm font-semibold transition hover:bg-tierra hover:text-crema"
                >
                  Voluntariado
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
