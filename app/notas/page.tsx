import type { Metadata } from "next";
import { BotonEscribir, Eyebrow, Footer, Header } from "../components";
import { NotasPorAnio } from "./anios";
import { getNotas } from "./datos";
import { PestanasNotas } from "./pestanas";
import { TarjetaNota } from "./tarjeta";

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
        <section className="bg-tierra text-crema">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <PestanasNotas activa="notas" />
            <Eyebrow>Notas</Eyebrow>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Análisis para entender{" "}
              <span className="font-serif italic text-oro">el mundo que viene</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-crema/80">
              Todas las notas de Panorama Universal sobre geopolítica, conflictos, elecciones,
              economía y política exterior.
            </p>
            <div className="mt-8">
              <BotonEscribir light />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <NotasPorAnio
            anios={anios.map((anio) => {
              const delAnio = notas.filter((n) => n.fecha.startsWith(anio));
              return {
                anio,
                cantidad: delAnio.length,
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
