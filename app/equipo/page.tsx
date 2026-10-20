import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Footer, Header } from "../components";
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
        <section className="bg-tierra text-crema">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Eyebrow>Equipo</Eyebrow>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Quiénes hacen <span className="font-serif italic text-oro">Panorama</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-crema/80">
              Panorama funciona a través de un equipo directivo y secretarías, con el apoyo de un
              equipo de voluntarios. Elegí un área para conocer qué hace y quiénes la integran.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/equipo/${a.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-tierra/10 bg-white p-7 transition hover:-translate-y-1 hover:border-oro hover:shadow-lg"
                >
                  <h2 className="text-xl font-semibold">{a.nombre}</h2>
                  <p className="mt-2 text-tierra-suave">{a.resumen}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
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
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
