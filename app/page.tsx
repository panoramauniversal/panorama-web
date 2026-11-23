import Image from "next/image";
import Link from "next/link";
import { BotonEscribir, Footer, Header, Titulo } from "./components";
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
      <Titulo cursiva="somos">Quiénes</Titulo>
      <div className="mt-10 grid gap-10 border-t border-tierra pt-10 md:grid-cols-[1fr_1.4fr]">
        <p className="font-serif text-3xl leading-tight sm:text-4xl">
          Pensar el mundo con rigor, <span className="italic text-oro">para todos.</span>
        </p>
        <div className="space-y-5 text-lg leading-relaxed text-tierra-suave">
          {quienesSomos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 bg-oro-claro p-8 sm:p-12 md:grid-cols-[12rem_1fr]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-tierra-suave">
          Nuestra misión
        </p>
        <p className="font-serif text-2xl leading-snug sm:text-3xl">{mision}</p>
      </div>
    </section>
  );
}

function PorQue() {
  return (
    <section className="border-y border-tierra/15 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Titulo cursiva="Panorama Universal?">¿Por qué</Titulo>
        <div className="mt-10 grid gap-12 border-t border-tierra pt-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-tierra-suave">
            {porQue.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div>
            <p className="text-lg leading-relaxed text-tierra-suave">
              Para nosotros, la diversidad de enfoques no es un obstáculo: es lo que enriquece el
              análisis y fortalece el debate. Por eso Panorama es:
            </p>
            <ul className="mt-6 grid border-l border-t border-tierra sm:grid-cols-2">
              {principios.map((p) => (
                <li key={p.titulo} className="border-b border-r border-tierra p-5">
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
    <section id="que-hacemos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Titulo cursiva="hacemos">Qué</Titulo>
      <p className="mt-4 max-w-2xl text-lg text-tierra-suave">
        Análisis, diálogo y comunidad: así llevamos los asuntos internacionales a las nuevas
        generaciones.
      </p>
      <ol className="mt-10 grid border-l border-t border-tierra sm:grid-cols-2 lg:grid-cols-3">
        {queHacemos.map((item, i) => (
          <li
            key={item.titulo}
            className="flex min-h-56 flex-col justify-between gap-8 border-b border-r border-tierra p-6 sm:p-7"
          >
            <span className="font-serif text-3xl text-tierra-suave">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tierra-suave">{item.texto}</p>
            </div>
          </li>
        ))}
        <li className="flex min-h-56 flex-col justify-between gap-8 border-b border-r border-tierra bg-oro p-6 sm:p-7">
          <span className="font-serif text-3xl">06</span>
          <div>
            <h3 className="text-lg font-semibold">Seguinos</h3>
            <p className="mt-2 text-sm">Enterate de cada nueva publicación y actividad.</p>
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
    </section>
  );
}

// Colores del punto de cada región en el índice.
const colorRegion: Record<string, string> = {
  "América del Sur": "bg-oro",
  Argentina: "bg-oro",
  "América del Norte": "bg-tierra-suave",
  Europa: "bg-tierra",
  Asia: "bg-tierra-suave",
  África: "bg-oro",
  "Medio Oriente": "bg-tierra",
  Global: "border border-tierra",
};

function fechaCorta(fecha: string) {
  const [a, m, d] = fecha.split("-");
  return `${d}.${m}.${a}`;
}

// Primera oración del resumen, para la bajada corta del índice.
function bajada(resumen: string) {
  return resumen.match(/^.+?[.?!](?=\s|$)/)?.[0] ?? resumen;
}

function IndiceNotas() {
  const notas = getNotas().slice(0, 3);
  if (notas.length === 0) return null;
  return (
    <section id="notas" className="mx-auto max-w-6xl px-4 pb-6 pt-16 sm:px-6 md:pb-8 md:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Titulo cursiva="notas">Índice de</Titulo>
        <Link
          href="/notas"
          className="text-sm font-semibold underline underline-offset-4 transition hover:text-oro"
        >
          Ver archivo completo →
        </Link>
      </div>
      <div className="mt-8 border-t border-tierra">
        <div className="hidden grid-cols-[6.5rem_1fr_9rem_10rem] gap-6 border-b border-tierra py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-tierra-suave md:grid">
          <span>Fecha</span>
          <span>Título</span>
          <span>Región</span>
          <span>Autoría</span>
        </div>
        <ul>
          {notas.map((n) => (
            <li key={n.slug} className="border-b border-tierra/40">
              <Link
                href={`/notas/${n.slug}`}
                className="group grid gap-3 py-6 md:grid-cols-[6.5rem_1fr_9rem_10rem] md:gap-6"
              >
                <span className="text-sm font-semibold">{fechaCorta(n.fecha)}</span>
                <span className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {n.imagen && (
                    <span className="relative block aspect-video w-full shrink-0 overflow-hidden sm:w-44">
                      <Image
                        src={n.imagen}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 176px, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </span>
                  )}
                  <span>
                    <span className="block text-xl font-bold leading-snug transition group-hover:text-oro">
                      {n.titulo}
                    </span>
                    <span className="mt-2 line-clamp-2 text-sm text-tierra-suave">
                      {bajada(n.resumen)}
                    </span>
                  </span>
                </span>
                {n.region ? (
                  <span className="flex items-center gap-2 text-sm md:items-start md:pt-1">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full md:mt-1.5 ${colorRegion[n.region] ?? "bg-oro"}`}
                    />
                    {n.region}
                  </span>
                ) : (
                  <span className="hidden md:block" />
                )}
                <span className="text-sm text-tierra-suave md:pt-1">{n.autores}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Comunidad() {
  return (
    <section id="comunidad" className="border-t border-tierra/15 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Titulo cursiva="comunidad">Nuestra</Titulo>
        <div className="mt-10 grid gap-16 border-t border-tierra pt-10 md:grid-cols-2">
          <div>
            <p className="text-lg text-tierra-suave">{comunidad.intro}</p>
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
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-tierra-suave">
              Cómo nos organizamos
            </p>
            <p className="mt-3 text-lg text-tierra-suave">
              Panorama funciona a través de un equipo directivo y secretarías, con el apoyo de un
              equipo de voluntarios. Tocá cada área para conocer qué hace y quiénes la integran.
            </p>
            <ul className="mt-6 border-t border-tierra">
              {areas.map((a) => (
                <li key={a.slug} className="border-b border-tierra/40">
                  <Link
                    href={`/equipo/${a.slug}`}
                    className="group flex items-center justify-between gap-4 py-4 transition hover:text-oro"
                  >
                    <span className="font-medium">{a.nombre}</span>
                    <span className="text-oro transition group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-b border-tierra/40">
                <Link
                  href="/equipo/voluntariado"
                  className="group flex items-center justify-between gap-4 py-4 font-semibold transition hover:text-oro"
                >
                  <span>Voluntariado</span>
                  <span className="text-oro transition group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-tierra pt-14 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-tierra-suave">
            ¿Hacia dónde vamos?
          </p>
          <p className="mx-auto mt-5 max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
            {vision}
          </p>
        </div>
      </div>
    </section>
  );
}

function Sumate() {
  return (
    <section id="sumate" className="bg-oro">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sumate a <span className="font-serif font-medium italic">Panorama</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg">{sumate}</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <a
            href={links.formularioVoluntariado}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-tierra px-7 py-3 font-semibold text-crema transition hover:bg-crema hover:text-tierra"
          >
            Dejanos tus datos
          </a>
          <Link
            href="/equipo/voluntariado"
            className="font-semibold underline underline-offset-4 hover:no-underline"
          >
            Conocé el voluntariado →
          </Link>
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
        <IndiceNotas />
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
