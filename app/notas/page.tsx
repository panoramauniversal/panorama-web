import type { Metadata } from "next";
import { Eyebrow, Footer, Header } from "../components";
import { getNotas } from "./datos";
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
            <Eyebrow>Notas</Eyebrow>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Análisis para entender{" "}
              <span className="font-serif italic text-oro">el mundo que viene</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-crema/80">
              Todas las notas de Panorama Universal sobre geopolítica, conflictos, elecciones,
              economía y política exterior.
            </p>
            {anios.length > 1 && (
              <nav className="mt-8 flex flex-wrap gap-2" aria-label="Años">
                {anios.map((a) => (
                  <a
                    key={a}
                    href={`#anio-${a}`}
                    className="rounded-full border border-crema/30 px-4 py-1.5 text-sm font-medium transition hover:border-oro hover:text-oro"
                  >
                    {a}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          {anios.map((anio) => (
            <section key={anio} id={`anio-${anio}`} className="mb-16 last:mb-0">
              <h2 className="mb-6 font-serif text-3xl italic text-oro">{anio}</h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {notas
                  .filter((n) => n.fecha.startsWith(anio))
                  .map((n) => (
                    <li key={n.slug}>
                      <TarjetaNota nota={n} />
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
