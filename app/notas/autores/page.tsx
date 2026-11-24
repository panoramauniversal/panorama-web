import type { Metadata } from "next";
import Link from "next/link";
import { BotonEscribir, CabeceraPagina, Footer, Header } from "../../components";
import { Avatar } from "../../equipo/miembro";
import { buscarEnEquipo } from "../equipo-autor";
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
        <CabeceraPagina
          arriba={<PestanasNotas activa="autores" />}
          etiqueta={`Autores · ${autores.length} firmas`}
          cursiva="Quienes escriben"
          bajada={`${autores.length} autores y autoras ya publicaron con nosotros. Entrá a cada perfil para ver todas sus notas y sus redes.`}
          extra={
            <>
              <div className="mt-8">
                <BotonEscribir light />
              </div>
              <nav className="mt-8 flex flex-wrap gap-2" aria-label="Letras">
                {letras.map((l) => (
                  <a
                    key={l}
                    href={`#letra-${l}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-crema/30 font-serif text-base italic transition hover:border-oro hover:text-oro"
                  >
                    {l}
                  </a>
                ))}
              </nav>
            </>
          }
        >
          en Panorama
        </CabeceraPagina>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          {letras.map((letra) => (
            <section key={letra} id={`letra-${letra}`} className="mb-12 scroll-mt-24 last:mb-0">
              <h2 className="mb-5 border-b border-tierra pb-3 font-serif text-4xl font-medium italic text-oro">
                {letra}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {autores
                  .filter((a) => inicial(a.nombre) === letra)
                  .map((a) => (
                    <li
                      key={a.slug}
                      className="flex h-full flex-col rounded-3xl border border-tierra/10 bg-white p-6 transition hover:border-oro hover:shadow-lg"
                    >
                      <Link
                        href={`/notas/autores/${a.slug}`}
                        className="group flex items-center gap-4"
                      >
                        <Avatar
                          persona={buscarEnEquipo(a.slug)?.persona ?? { nombre: a.nombre, cargo: "" }}
                          size="sm"
                        />
                        <span>
                          <span className="block text-lg font-semibold group-hover:text-oro">
                            {a.nombre}
                          </span>
                          <span className="block text-sm text-tierra-suave">
                            {a.notas.length} {a.notas.length === 1 ? "nota" : "notas"}
                          </span>
                        </span>
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
