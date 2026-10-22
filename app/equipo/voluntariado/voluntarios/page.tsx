import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../../../components";
import { voluntarios } from "../../../voluntarios";
import { TarjetaMiembro } from "../../miembro";

export const metadata: Metadata = {
  title: "Nuestros voluntarios | Panorama Universal",
  description: "Las personas que forman parte del voluntariado de Panorama Universal.",
};

export default function VoluntariosPage() {
  const lista = [...voluntarios].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  return (
    <>
      <Header />
      <main>
        <section className="bg-tierra text-crema">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Link
              href="/equipo/voluntariado"
              className="text-sm font-medium text-crema/70 transition hover:text-oro"
            >
              ← Voluntariado
            </Link>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
              Nuestros <span className="font-serif italic text-oro">voluntarios</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-crema/80">
              Estudiantes y graduados que se sumaron al voluntariado 2026 y trabajan junto a las
              secretarías de Panorama Universal.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lista.map(({ area, ...persona }) => (
              <li key={persona.nombre}>
                <TarjetaMiembro persona={{ ...persona, cargo: `Voluntariado · ${area}` }} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
