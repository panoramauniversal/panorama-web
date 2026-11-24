import type { Metadata } from "next";
import Link from "next/link";
import { CabeceraPagina, Footer, Header } from "../components";
import { areas } from "../equipo";
import { Avatar } from "./miembro";

export const metadata: Metadata = {
  title: "Equipo | Panorama Universal",
  description: "Conocé a las personas y las áreas que hacen Panorama Universal.",
};

export default function EquipoPage() {
  return (
    <>
      <Header />
      <main>
        <CabeceraPagina
          etiqueta={`Equipo · ${areas.length} áreas y voluntariado`}
          cursiva="Quiénes hacen"
          bajada="Panorama funciona a través de un equipo directivo y secretarías, con el apoyo de un equipo de voluntarios. Elegí un área para conocer qué hace y quiénes la integran."
        >
          Panorama
        </CabeceraPagina>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-tierra/10 bg-tierra/10 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <li key={a.slug} className="bg-white">
                <Link
                  href={`/equipo/${a.slug}`}
                  className="group flex h-full min-h-64 flex-col gap-6 p-7 transition hover:bg-oro-claro"
                >
                  <span className="font-serif text-3xl italic text-oro">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">{a.nombre}</h2>
                    <p className="mt-2 text-tierra-suave">{a.resumen}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {a.integrantes.map((p) => (
                        <span key={p.nombre} className="rounded-full ring-2 ring-white">
                          <Avatar persona={p} size="sm" />
                        </span>
                      ))}
                    </div>
                    <span className="font-semibold text-oro transition group-hover:translate-x-1">
                      Ver área →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            <li className="bg-oro sm:col-span-2 lg:col-span-3">
              <Link
                href="/equipo/voluntariado"
                className="group flex h-full flex-col gap-6 p-7 md:flex-row md:items-center md:gap-10"
              >
                <span className="font-serif text-3xl italic">
                  {String(areas.length + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl font-semibold">Voluntariado</h2>
                  <p className="mt-2">
                    Conocé cómo trabajan nuestros voluntarios y dejanos tus datos para la
                    convocatoria 2027.
                  </p>
                </div>
                <span className="mt-auto font-semibold transition group-hover:translate-x-1 md:ml-auto md:mt-0 md:shrink-0">
                  Ver voluntariado →
                </span>
              </Link>
            </li>
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
