import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Footer, Header } from "./components";
import { areas } from "./equipo";
import { getNotas } from "./notas/datos";
import { TarjetaNota } from "./notas/tarjeta";
import {
  comunidad,
  hero,
  links,
  mision,
  pilares,
  porQue,
  principios,
  queHacemos,
  quienesSomos,
  redes,
  sumate,
  vision,
} from "./content";



function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-tierra text-crema">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border-[3rem] border-oro/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -left-32 h-[28rem] w-[28rem] rounded-full border-[2rem] border-oro/10"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.3fr_1fr] md:py-28">
        <div>
          <Eyebrow light>Análisis internacional</Eyebrow>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {hero.lema.split(" ").slice(0, 3).join(" ")}{" "}
            <span className="font-serif italic text-oro">
              {hero.lema.split(" ").slice(3).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-crema/80">{hero.bajada}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#quienes-somos"
              className="rounded-full bg-oro px-6 py-3 font-semibold text-tierra transition hover:bg-crema"
            >
              Conocenos
            </a>
            <a
              href="#sumate"
              className="rounded-full border border-crema/30 px-6 py-3 font-semibold transition hover:border-oro hover:text-oro"
            >
              Sumate
            </a>
          </div>
        </div>
        <div className="mx-auto w-56 rounded-full bg-crema p-3 shadow-2xl sm:w-72 md:w-full md:max-w-sm">
          <Image
            src="/logo.png"
            alt="Logo de Panorama Universal"
            width={1252}
            height={1280}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

function QuienesSomos() {
  return (
    <section id="quienes-somos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Pensar el mundo con rigor, <span className="font-serif italic text-oro">para todos</span>
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-tierra-suave">
          {quienesSomos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-oro-claro p-8 sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tierra-suave">
          Nuestra misión
        </p>
        <p className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">{mision}</p>
      </div>
    </section>
  );
}

function PorQue() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>¿Por qué Panorama Universal?</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Más allá de los medios tradicionales
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-tierra-suave">
              {porQue.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Cómo entendemos el mundo</Eyebrow>
            <p className="text-lg leading-relaxed text-tierra-suave">
              Para nosotros, la diversidad de enfoques no es un obstáculo: es lo que enriquece el
              análisis y fortalece el debate. Por eso Panorama es:
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {principios.map((p) => (
                <li key={p.titulo} className="rounded-2xl border border-tierra/10 p-5">
                  <p className="text-sm font-bold uppercase tracking-widest text-oro">{p.titulo}</p>
                  <p className="mt-2 text-tierra-suave">{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pilares() {
  return (
    <section id="pilares" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Eyebrow>Nuestros pilares</Eyebrow>
      <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
        Alineados con la Agenda 2030 de la ONU
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-tierra-suave">
        Nuestro trabajo se guía por cinco pilares vinculados a los Objetivos de Desarrollo
        Sostenible.
      </p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pilares.map((p) => (
          <li
            key={p.titulo}
            className="flex flex-col rounded-3xl border border-tierra/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-3xl" aria-hidden>
              {p.icono}
            </span>
            <span className="mt-5 w-fit rounded-full bg-oro-claro px-3 py-1 text-xs font-semibold">
              {p.ods}
            </span>
            <h3 className="mt-3 text-xl font-semibold">{p.titulo}</h3>
            <p className="mt-2 text-tierra-suave">{p.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function QueHacemos() {
  return (
    <section id="que-hacemos" className="bg-tierra text-crema">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow light>Qué hacemos</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
          Análisis, diálogo y <span className="font-serif italic text-oro">comunidad</span>
        </h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-crema/10 sm:grid-cols-2 lg:grid-cols-3">
          {queHacemos.map((item, i) => (
            <li key={item.titulo} className="bg-tierra p-7">
              <span className="font-serif text-3xl italic text-oro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-crema/75">{item.texto}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center bg-oro p-7 text-tierra">
            <h3 className="text-xl font-semibold">Seguinos</h3>
            <p className="mt-2">Enterate de cada nueva publicación y actividad.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {redes.map((r) => (
                <a
                  key={r.nombre}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-tierra px-4 py-2 text-sm font-semibold text-crema transition hover:bg-crema hover:text-tierra"
                >
                  {r.nombre}
                </a>
              ))}
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function UltimasNotas() {
  const notas = getNotas().slice(0, 3);
  if (notas.length === 0) return null;
  return (
    <section id="notas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Últimas notas</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Lo último que analizamos</h2>
        </div>
        <Link href="/notas" className="font-semibold text-oro hover:underline">
          Ver todas las notas →
        </Link>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {notas.map((n) => (
          <li key={n.slug}>
            <TarjetaNota nota={n} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Comunidad() {
  return (
    <section id="comunidad" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <Eyebrow>Nuestra comunidad</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Una red de intercambio y construcción conjunta
          </h2>
          <p className="mt-6 text-lg text-tierra-suave">{comunidad.intro}</p>
          <ul className="mt-6 space-y-4">
            {comunidad.grupos.map((g) => (
              <li key={g} className="flex gap-3 text-tierra-suave">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-oro" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow>Cómo nos organizamos</Eyebrow>
          <p className="text-lg text-tierra-suave">
            Panorama funciona a través de un equipo directivo y secretarías, con el apoyo de un
            equipo de voluntarios. Tocá cada área para conocer qué hace y quiénes la integran.
          </p>
          <ul className="mt-6 space-y-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/equipo/${a.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-tierra/10 bg-white px-5 py-4 transition hover:border-oro hover:shadow-md"
                >
                  <span className="font-medium">{a.nombre}</span>
                  <span className="text-oro transition group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/equipo/voluntariado"
                className="group flex items-center justify-between gap-4 rounded-2xl bg-oro px-5 py-4 transition hover:shadow-md"
              >
                <span className="font-semibold">Voluntariado</span>
                <span className="transition group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 border-t border-tierra/10 pt-16 text-center">
        <Eyebrow>
          <span className="mx-auto">¿Hacia dónde vamos?</span>
        </Eyebrow>
        <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">{vision}</p>
      </div>
    </section>
  );
}

function Sumate() {
  return (
    <section id="sumate" className="px-4 pb-20 sm:px-6 md:pb-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-oro px-8 py-14 text-center sm:px-16">
        <h2 className="text-3xl font-bold sm:text-4xl">Sumate a Panorama</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg">{sumate}</p>
        <a
          href={links.formularioVoluntariado}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-tierra px-7 py-3 font-semibold text-crema transition hover:bg-crema hover:text-tierra"
        >
          Dejanos tus datos
        </a>
        <Link
          href="/equipo/voluntariado"
          className="mt-4 block font-semibold underline-offset-4 hover:underline sm:ml-6 sm:mt-0 sm:inline-block"
        >
          Conocé el voluntariado →
        </Link>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuienesSomos />
        <PorQue />
        <Pilares />
        <QueHacemos />
        <UltimasNotas />
        <Comunidad />
        <Sumate />
      </main>
      <Footer />
    </>
  );
}
