import Image from "next/image";
import Link from "next/link";
import { links, nav, redes } from "./content";
import { IconoRed } from "./iconos";
import { LogoInicio } from "./logo-inicio";

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${
        light ? "text-oro" : "text-oro"
      }`}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

// Líneas verticales finas de fondo de los héroes oscuros.
export const lineasHero = {
  backgroundImage: "linear-gradient(to right, rgb(212 172 72 / 0.08) 1px, transparent 1px)",
  backgroundSize: "calc(100% / 12) 100%",
};

// Cabecera oscura de las páginas internas: mismo estilo que el inicio de la portada.
// El título arranca en cursiva dorada (`cursiva`) y sigue en negrita (`children`).
export function CabeceraPagina({
  etiqueta,
  cursiva,
  children,
  bajada,
  volver,
  arriba,
  extra,
  className = "",
}: {
  etiqueta?: string;
  cursiva: string;
  children?: React.ReactNode;
  bajada?: React.ReactNode;
  volver?: { href: string; label: string };
  arriba?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-tierra text-crema ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={lineasHero} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border-[3rem] border-oro/10"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        {volver && (
          <Link
            href={volver.href}
            className="mb-6 inline-block text-sm font-medium text-crema/70 transition hover:text-oro"
          >
            ← {volver.label}
          </Link>
        )}
        {arriba}
        {etiqueta && (
          <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-oro">
            {etiqueta}
          </p>
        )}
        <h1 className="max-w-4xl text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          <span className="font-serif font-medium italic text-oro">{cursiva}</span>
          {children && <span className="font-bold"> {children}</span>}
        </h1>
        {bajada && <div className="mt-6 max-w-2xl text-lg text-crema/80">{bajada}</div>}
        {extra}
      </div>
    </section>
  );
}

// Título de sección que arranca con una o más palabras en cursiva serif, como "*Quiénes* somos".
export function Titulo({
  children,
  cursiva,
  light = false,
  sobreOro = false,
  className = "",
}: {
  children: React.ReactNode;
  cursiva: string;
  light?: boolean;
  // Sobre fondo dorado la cursiva va en marrón para que se lea.
  sobreOro?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${light ? "text-crema" : ""} ${className}`}
    >
      <span className={`font-serif font-medium italic ${sobreOro ? "" : "text-oro"}`}>{cursiva}</span>{" "}
      {children}
    </h2>
  );
}

function RedesHeader() {
  return (
    <ul className="flex items-center gap-3">
      {redes.map((r) => (
        <li key={r.nombre}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${r.nombre} de Panorama Universal`}
            title={r.nombre}
            className="block text-tierra transition hover:text-oro"
          >
            <IconoRed nombre={r.nombre} className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-tierra/10 bg-crema/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <LogoInicio>
          <Image src="/logo.png" alt="" width={40} height={41} className="h-10 w-auto" priority />
          <span className="leading-tight">
            <span className="block text-lg font-bold">Panorama</span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-tierra-suave">
              Universal
            </span>
          </span>
        </LogoInicio>

        <div className="hidden items-center gap-7 lg:flex">
          <nav aria-label="Principal">
            <ul className="flex items-center gap-7 text-sm font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={
                      item.href === "/#sumate"
                        ? "rounded-full bg-tierra px-4 py-2 text-crema transition hover:bg-oro hover:text-tierra"
                        : "transition hover:text-oro"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="h-6 w-px bg-tierra/15" aria-hidden />
          <RedesHeader />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <RedesHeader />
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-full border border-tierra/20 px-4 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
              Menú
            </summary>
            <ul className="absolute right-0 mt-2 w-52 rounded-xl border border-tierra/10 bg-white p-2 shadow-lg">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-oro-claro"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-tierra text-crema/70">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 md:pt-20">
        <p
          aria-hidden
          className="text-6xl leading-[0.9] tracking-tight sm:text-8xl lg:text-[8.5rem]"
        >
          <span className="block font-bold text-crema">Panorama</span>
          <span className="block font-serif font-medium italic text-oro">Universal</span>
        </p>
        <div className="mt-14 flex flex-col items-center justify-between gap-5 text-sm sm:flex-row">
          <span>Entendé el mundo que viene</span>
          <div className="flex items-center gap-6">
            {redes.map((r) => (
              <a
                key={r.nombre}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.nombre}
                title={r.nombre}
                className="transition hover:text-oro"
              >
                <IconoRed nombre={r.nombre} />
              </a>
            ))}
          </div>
          <span>© {new Date().getFullYear()} Panorama Universal</span>
        </div>
      </div>
    </footer>
  );
}

// Corta el mail solo en la "@" para que no quede una letra suelta en otro renglón.
export function MailLink({ mail, className = "" }: { mail: string; className?: string }) {
  const [usuario, dominio] = mail.split("@");
  return (
    <a href={`mailto:${mail}`} className={`hover:underline ${className}`}>
      <span className="whitespace-nowrap">{usuario}</span>
      <wbr />
      <span className="whitespace-nowrap">@{dominio}</span>
    </a>
  );
}

// Invitación a escribir en Panorama. Cuando haya formulario, se carga en links.formularioEscribir.
export function BotonEscribir({ light = false }: { light?: boolean }) {
  const estilo = light
    ? "border-oro bg-oro text-tierra hover:bg-crema hover:border-crema"
    : "border-tierra bg-tierra text-crema hover:bg-oro hover:border-oro hover:text-tierra";
  return (
    <a
      href={links.formularioEscribir || undefined}
      target={links.formularioEscribir ? "_blank" : undefined}
      rel={links.formularioEscribir ? "noopener noreferrer" : undefined}
      className={`inline-block cursor-pointer whitespace-nowrap rounded-full border px-5 py-3 font-semibold transition sm:px-6 ${estilo}`}
    >
      ¿Querés escribir en Panorama?
    </a>
  );
}
