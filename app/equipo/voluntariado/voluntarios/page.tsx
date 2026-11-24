import type { Metadata } from "next";
import { CabeceraPagina, Footer, Header } from "../../../components";
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
        <CabeceraPagina
          volver={{ href: "/equipo/voluntariado", label: "Voluntariado" }}
          etiqueta={`Voluntariado 2026 · ${lista.length} voluntarios`}
          cursiva="Nuestros"
          bajada="Estudiantes y graduados que se sumaron al voluntariado 2026 y trabajan junto a las secretarías de Panorama Universal."
        >
          voluntarios
        </CabeceraPagina>

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
