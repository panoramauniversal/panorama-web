import type { Metadata } from "next";
import Link from "next/link";
import { CabeceraPagina, Eyebrow, Footer, Header, Titulo } from "../../components";
import { links } from "../../content";
import { voluntariado as v } from "../../voluntariado";

export const metadata: Metadata = {
  title: "Voluntariado | Panorama Universal",
  description: "Conocé el voluntariado de Panorama Universal y sumate a la edición 2027.",
};

function BotonFormulario({ className = "" }: { className?: string }) {
  return (
    <a
      href={links.formularioVoluntariado}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full px-7 py-3 font-semibold transition ${className}`}
    >
      Quiero sumarme en 2027
    </a>
  );
}

export default function VoluntariadoPage() {
  return (
    <>
      <Header />
      <main>
        <CabeceraPagina
          volver={{ href: "/equipo", label: "Todo el equipo" }}
          etiqueta="Equipo · Voluntariado"
          cursiva="Voluntariado"
          bajada={v.intro}
          extra={<BotonFormulario className="mt-8 bg-oro text-tierra hover:bg-crema" />}
        >
          Panorama
        </CabeceraPagina>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <div>
              <Eyebrow>Edición 2026</Eyebrow>
              <Titulo cursiva={v.edicion2026.titulo.split(" ")[0]}>
                {v.edicion2026.titulo.split(" ").slice(1).join(" ")}
              </Titulo>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-tierra-suave">
                {v.edicion2026.texto.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link
                href="/equipo/voluntariado/voluntarios"
                className="mt-8 inline-block rounded-full bg-tierra px-7 py-3 font-semibold text-crema transition hover:bg-oro hover:text-tierra"
              >
                Nuestros voluntarios →
              </Link>
            </div>
            <div>
              <Eyebrow>Dónde participan</Eyebrow>
              <ul className="space-y-3">
                {v.areas.map((a) => (
                  <li key={a.nombre} className="rounded-2xl border border-tierra/10 bg-white p-5">
                    <p className="font-semibold">{a.nombre}</p>
                    <p className="mt-1 text-tierra-suave">{a.tareas}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Eyebrow>Qué te ofrecemos</Eyebrow>
            <Titulo cursiva="Aprender haciendo,">con un equipo</Titulo>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-tierra/10 sm:grid-cols-2 lg:grid-cols-4">
              {v.queOfrecemos.map((item, i) => (
                <li key={item.titulo} className="flex flex-col gap-6 bg-oro-claro p-6">
                  <span className="font-serif text-3xl italic text-oro">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold">{item.titulo}</h3>
                  <p className="mt-2 text-tierra-suave">{item.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Eyebrow>Cómo funciona</Eyebrow>
          <Titulo cursiva="Paso" className="mb-10">
            a paso
          </Titulo>
          <ol className="grid gap-5 md:grid-cols-3">
            {v.comoFunciona.map((item, i) => (
              <li key={item.paso} className="rounded-3xl border border-tierra/10 bg-white p-7">
                <span className="font-serif text-3xl italic text-oro">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{item.paso}</h3>
                <p className="mt-2 text-tierra-suave">{item.texto}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-tierra-suave">{v.aclaracion}</p>
        </section>

        <section className="px-4 pb-20 sm:px-6 md:pb-28">
          <div className="mx-auto max-w-6xl rounded-3xl bg-oro px-8 py-14 text-center sm:px-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em]">Próxima convocatoria</p>
            <Titulo sobreOro cursiva={v.edicion2027.titulo.split(" ")[0]} className="mt-3">
              {v.edicion2027.titulo.split(" ").slice(1).join(" ")}
            </Titulo>
            <p className="mx-auto mt-4 max-w-2xl text-lg">{v.edicion2027.texto}</p>
            <BotonFormulario className="mt-8 bg-tierra text-crema hover:bg-crema hover:text-tierra" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
