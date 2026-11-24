import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CabeceraPagina, Eyebrow, Footer, Header, MailLink } from "../../components";
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
        <CabeceraPagina
          volver={{ href: "/equipo", label: "Todo el equipo" }}
          etiqueta={`Equipo · ${area.integrantes.length} ${area.integrantes.length === 1 ? "integrante" : "integrantes"}`}
          cursiva={area.nombre.split(" ")[0]}
          bajada={area.descripcion}
        >
          {area.nombre.split(" ").slice(1).join(" ")}
        </CabeceraPagina>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          {area.integrantes.length > 2 ? (
            // Con más de dos integrantes, van primero todos en una misma fila a lo ancho.
            <>
              <Eyebrow>Integrantes</Eyebrow>
              <div className="grid gap-5 lg:grid-cols-3">
                {area.integrantes.map((p) => (
                  <TarjetaMiembro key={p.nombre} persona={p} />
                ))}
              </div>
              <div className="mt-14 grid gap-8 md:grid-cols-[2fr_1fr] md:items-start">
                <QueHacemos tareas={area.tareas} />
                {area.mail && <Contacto mail={area.mail} />}
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
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <Eyebrow>Otras áreas</Eyebrow>
            <ul className="mt-2 grid gap-3 md:grid-cols-2">
              {otras.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/equipo/${a.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-tierra/10 bg-crema px-5 py-4 transition hover:border-oro hover:shadow-md"
                  >
                    <span className="font-medium">{a.nombre}</span>
                    <span className="text-oro transition group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/equipo/voluntariado"
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-oro px-5 py-4 transition hover:shadow-md"
                >
                  <span className="font-semibold">Voluntariado</span>
                  <span className="transition group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
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
