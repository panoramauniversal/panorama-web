import type { Metadata } from "next";
import { BotonEscribir, CabeceraPagina, Footer, Header, Titulo } from "../components";
import { NotasFiltradas } from "./anios";
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
          etiqueta="Notas · Archivo"
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
              <Titulo cursiva="Última" className="mb-6">
                nota
              </Titulo>
              <TarjetaDestacada nota={notas[0]} />
            </div>
          )}
          <NotasFiltradas
            anios={anios}
            items={notas
              // La destacada ya está arriba, así que no se repite en la grilla.
              .filter((n) => n.slug !== notas[0]?.slug)
              .map((n) => ({
                slug: n.slug,
                anio: n.fecha.slice(0, 4),
                region: n.region,
                tarjeta: <TarjetaNota nota={n} />,
              }))}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
