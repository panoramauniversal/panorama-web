import type { Metadata } from "next";
import { BotonEscribir, CabeceraPagina, Footer, Header } from "../components";
import { NotasPorAnio } from "./anios";
import { getNotas } from "./datos";
import { PestanasNotas } from "./pestanas";
import { TarjetaDestacada, TarjetaNota } from "./tarjeta";

export const metadata: Metadata = {
  title: "Notas | Panorama Universal",
  description: "Análisis sobre política internacional, geopolítica y asuntos globales.",
};

export default function NotasPage() {
  const notas = getNotas();
  const anios = [...new Set(notas.map((n) => n.fecha.slice(0, 4)))];

  return (
    <>
      <Header />
      <main>
        <CabeceraPagina
          arriba={<PestanasNotas activa="notas" />}
          etiqueta={`Notas · Archivo · ${notas.length} publicaciones`}
          cursiva="Análisis"
          bajada="Todas las notas de Panorama Universal sobre geopolítica, conflictos, elecciones, economía y política exterior."
          extra={
            <div className="mt-8">
              <BotonEscribir light />
            </div>
          }
        >
          para entender el mundo
        </CabeceraPagina>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          {notas[0] && (
            <div className="mb-16">
              <TarjetaDestacada nota={notas[0]} />
            </div>
          )}
          <NotasPorAnio
            anios={anios.map((anio) => {
              // La destacada ya está arriba, así que no se repite en la grilla.
              const delAnio = notas.filter((n) => n.fecha.startsWith(anio) && n.slug !== notas[0]?.slug);
              return {
                anio,
                contenido: (
                  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {delAnio.map((n) => (
                      <li key={n.slug}>
                        <TarjetaNota nota={n} />
                      </li>
                    ))}
                  </ul>
                ),
              };
            })}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
