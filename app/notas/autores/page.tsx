import type { Metadata } from "next";
import Link from "next/link";
import { BotonEscribir, Eyebrow, Footer, Header } from "../../components";
import { redesDe } from "../autores";
import { getAutores } from "../datos";
import { PestanasNotas } from "../pestanas";
import { BotonesRedes } from "../redes";

export const metadata: Metadata = {
  title: "Autores | Panorama Universal",
  description: "Quienes escriben en Panorama Universal y todas sus notas.",
};

function inicial(nombre: string) {
  return nombre.normalize("NFD")[0].toUpperCase();
}

export default function AutoresPage() {
  const autores = getAutores();
  const letras = [...new Set(autores.map((a) => inicial(a.nombre)))];

  return (
    <>
      <Header />
      <main>
        <section className="bg-tierra text-crema">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <PestanasNotas activa="autores" />
            <Eyebrow>Autores</Eyebrow>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Quienes escriben <span className="font-serif italic text-oro">en Panorama</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-crema/80">
              {autores.length} autores y autoras ya publicaron con nosotros. Entrá a cada perfil para
              ver todas sus notas y sus redes.
            </p>
            <div className="mt-8">
              <BotonEscribir light />
            </div>
            <nav className="mt-8 flex flex-wrap gap-2" aria-label="Letras">
              {letras.map((l) => (
                <a
                  key={l}
                  href={`#letra-${l}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-crema/30 text-sm font-medium transition hover:border-oro hover:text-oro"
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          {letras.map((letra) => (
            <section key={letra} id={`letra-${letra}`} className="mb-12 scroll-mt-24 last:mb-0">
              <h2 className="mb-5 font-serif text-3xl italic text-oro">{letra}</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {autores
                  .filter((a) => inicial(a.nombre) === letra)
                  .map((a) => (
                    <li
                      key={a.slug}
                      className="flex h-full flex-col rounded-3xl border border-tierra/10 bg-white p-6 transition hover:border-oro hover:shadow-lg"
                    >
                      <Link href={`/notas/autores/${a.slug}`} className="group">
                        <h3 className="text-lg font-semibold group-hover:text-oro">{a.nombre}</h3>
                        <p className="mt-1 text-sm text-tierra-suave">
                          {a.notas.length} {a.notas.length === 1 ? "nota" : "notas"}
                        </p>
                      </Link>
                      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                        {redesDe(a.nombre) && <BotonesRedes redes={redesDe(a.nombre)!} />}
                        <Link
                          href={`/notas/autores/${a.slug}`}
                          className="ml-auto text-sm font-semibold text-oro"
                        >
                          Ver notas →
                        </Link>
                      </div>
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
