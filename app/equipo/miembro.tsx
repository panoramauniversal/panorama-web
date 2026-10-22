import Image from "next/image";
import Link from "next/link";
import { getAutorDeIntegrante } from "../notas/datos";
import type { Integrante } from "../equipo";

function iniciales(nombre: string) {
  const partes = nombre.split(" ");
  return (partes[0][0] + (partes[1]?.[0] ?? "")).toUpperCase();
}

export function Avatar({ persona, size }: { persona: Integrante; size: "sm" | "lg" }) {
  const clases = size === "lg" ? "h-28 w-28 text-3xl" : "h-12 w-12 text-sm";
  if (persona.foto) {
    return (
      <Image
        src={persona.foto}
        alt={persona.nombre}
        width={size === "lg" ? 224 : 96}
        height={size === "lg" ? 224 : 96}
        className={`${clases} shrink-0 rounded-full bg-oro-claro object-cover object-top`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`${clases} flex shrink-0 items-center justify-center rounded-full bg-oro-claro font-semibold text-tierra`}
    >
      {iniciales(persona.nombre)}
    </span>
  );
}

export function TarjetaMiembro({ persona }: { persona: Integrante }) {
  const autor = getAutorDeIntegrante(persona.autor ?? persona.nombre);
  return (
    <article className="flex h-full flex-col rounded-3xl border border-tierra/10 bg-white p-7">
      <div className="flex items-center gap-5">
        <Avatar persona={persona} size="lg" />
        <div>
          <h3 className="text-xl font-semibold">{persona.nombre}</h3>
          <p className="mt-1 text-sm font-medium uppercase tracking-wider text-oro">
            {persona.cargo}
          </p>
        </div>
      </div>
      {persona.bio && <p className="mt-5 leading-relaxed text-tierra-suave">{persona.bio}</p>}
      {(persona.linkedin || persona.instagram || autor) && (
        <div className="mt-auto flex flex-wrap gap-3 pt-5 text-sm font-semibold">
          {autor && (
            <Link
              href={`/notas/autores/${autor.slug}`}
              className="rounded-full bg-tierra px-4 py-1.5 text-crema transition hover:bg-oro hover:text-tierra"
            >
              Ver sus notas
            </Link>
          )}
          {persona.linkedin && (
            <a
              href={persona.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-tierra/15 px-4 py-1.5 transition hover:border-oro hover:text-oro"
            >
              LinkedIn
            </a>
          )}
          {persona.instagram && (
            <a
              href={`https://www.instagram.com/${persona.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-tierra/15 px-4 py-1.5 transition hover:border-oro hover:text-oro"
            >
              Instagram
            </a>
          )}
        </div>
      )}
    </article>
  );
}
