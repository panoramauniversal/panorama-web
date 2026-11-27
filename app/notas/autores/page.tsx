import type { Metadata } from "next";
import Link from "next/link";
import { BotonEscribir, CabeceraPagina, Footer, Header } from "../../components";
import { Avatar } from "../../equipo/miembro";
import { buscarEnEquipo } from "../equipo-autor";
import { redesDe } from "../autores";
import { getAutores } from "../datos";
import { PestanasNotas } from "../pestanas";
import { ListaAutores } from "./lista";
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
          etiqueta="Autores"
          cursiva="Quienes escriben"
          bajada="Entrá a cada perfil para ver todas sus notas y sus redes."
          extra={
            <div className="mt-8">
              <BotonEscribir light />
            </div>
          }
        >
          en Panorama
        </CabeceraPagina>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <ListaAutores
            letras={letras}
            items={autores.map((a) => ({
              slug: a.slug,
              nombre: a.nombre,
              letra: inicial(a.nombre),
              tarjeta: (
                <div className="flex h-full flex-col rounded-3xl border border-tierra/10 bg-white p-6 transition hover:border-oro hover:shadow-lg">
                  <Link href={`/notas/autores/${a.slug}`} className="group flex items-center gap-4">
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
                </div>
              ),
            }))}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
