import Image from "next/image";
import Link from "next/link";
import { BotonEscribir, Eyebrow, Footer, Header, Titulo } from "./components";
import { areas } from "./equipo";
import { getNotas } from "./notas/datos";
import {
  comunidad,
  hero,
  links,
  mision,
  porQue,
  principios,
  queHacemos,
  quienesSomos,
  redes,
  sumate,
  vision,
} from "./content";



// Líneas verticales finas de fondo del hero.
const lineasHero = {
  backgroundImage: "linear-gradient(to right, rgb(212 172 72 / 0.08) 1px, transparent 1px)",
  backgroundSize: "calc(100% / 12) 100%",
};

function Hero() {
  const [primera, segunda] = [
    hero.lema.split(" ").slice(0, 3).join(" "),
    hero.lema.split(" ").slice(3).join(" "),
  ];
  return (
    <section id="inicio" className="relative overflow-hidden bg-tierra text-crema">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={lineasHero} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border-[3rem] border-oro/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -left-32 h-[28rem] w-[28rem] rounded-full border-[2rem] border-oro/10"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-16">
        <ul className="flex flex-wrap gap-x-10 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-oro">
          {hero.etiquetas.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <div className="relative mt-8 md:mt-10">
          <h1 className="text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.75rem]">
            <span className="block font-bold">{primera}</span>
            <span className="block font-serif font-medium italic text-oro">{segunda}.</span>
          </h1>
          <div className="absolute bottom-0 right-0 hidden w-40 rounded-full bg-crema p-2 shadow-2xl lg:block">
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
        <div className="mt-10 grid items-end gap-8 md:mt-12 md:grid-cols-[1fr_auto]">
          <p className="max-w-xl text-lg text-crema/80">{hero.bajada}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/notas"
              className="rounded-full bg-oro px-6 py-3 font-semibold text-tierra transition hover:bg-crema"
            >
              Leer las notas
            </Link>
            <a
              href="#quienes-somos"
              className="rounded-full border border-crema/60 px-6 py-3 font-semibold transition hover:border-oro hover:text-oro"
            >
              Conocenos
            </a>
          </div>
        </div>
        <div className="mt-12 w-32 rounded-full bg-crema p-1.5 shadow-2xl sm:w-40 lg:hidden">
          <Image src="/logo.png" alt="" width={1252} height={1280} className="h-auto w-full" />
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
          <Titulo cursiva="Pensar el mundo">con rigor, para todos</Titulo>
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
            <Titulo cursiva="Más allá">de los medios tradicionales</Titulo>
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

function QueHacemos() {
  return (
    <section id="que-hacemos" className="bg-tierra text-crema">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow light>Qué hacemos</Eyebrow>
        <Titulo light cursiva="Análisis, diálogo">y comunidad</Titulo>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-crema/10 sm:grid-cols-2 lg:grid-cols-3">
          {queHacemos.map((item, i) => (
            <li key={item.titulo} className="flex min-h-56 flex-col justify-between gap-8 bg-tierra p-7">
              <span className="font-serif text-3xl italic text-oro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{item.titulo}</h3>
                <p className="mt-2 text-crema/75">{item.texto}</p>
              </div>
            </li>
          ))}
          <li className="flex min-h-56 flex-col justify-between gap-8 bg-oro p-7 text-tierra">
            <span className="font-serif text-3xl italic">06</span>
            <div>
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
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function fechaCorta(fecha: string) {
  const [a, m, d] = fecha.split("-");
  return `${d}.${m}.${a}`;
}

// Las últimas notas como tarjetas con foto, con la fecha y la región arriba.
function UltimasNotas() {
  const notas = getNotas().slice(0, 3);
  if (notas.length === 0) return null;
  return (
    <section id="notas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-tierra pb-5">
        <div>
          <Eyebrow>Últimas notas</Eyebrow>
          <Titulo cursiva="Lo último">que analizamos</Titulo>
        </div>
        <Link
          href="/notas"
          className="text-sm font-semibold underline underline-offset-4 transition hover:text-oro"
        >
          Ver archivo completo →
        </Link>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {notas.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/notas/${n.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tierra/10 bg-white transition hover:-translate-y-1 hover:border-oro hover:shadow-lg"
            >
              {n.imagen && (
                <Image
                  src={n.imagen}
                  alt=""
                  width={800}
                  height={450}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-7">
                <p className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest">
                  <span>{fechaCorta(n.fecha)}</span>
                  {n.region && <span className="text-oro">{n.region}</span>}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-snug">{n.titulo}</h3>
                <p className="mt-3 line-clamp-3 text-tierra-suave">{n.resumen}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6 text-sm">
                  <span className="text-tierra-suave">Por {n.autores}</span>
                  <span className="shrink-0 font-semibold text-oro transition group-hover:translate-x-1">
                    Leer →
                  </span>
                </div>
              </div>
            </Link>
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
          <Titulo cursiva="Una red">de intercambio y construcción conjunta</Titulo>
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-oro">¿Hacia dónde vamos?</p>
        <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">{vision}</p>
      </div>
    </section>
  );
}

function Sumate() {
  return (
    <section id="sumate" className="px-4 pb-20 sm:px-6 md:pb-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-oro px-8 py-14 text-center sm:px-16">
        <Titulo sobreOro cursiva="Sumate">a Panorama</Titulo>
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
        <div className="mt-6">
          <BotonEscribir />
        </div>
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
        <UltimasNotas />
        <QuienesSomos />
        <PorQue />
        <QueHacemos />
        <Comunidad />
        <Sumate />
      </main>
      <Footer />
    </>
  );
}
