import Image from "next/image";
import Link from "next/link";
import { fechaCorta, type Nota } from "./datos";

// Fecha corta y región, arriba de cada tarjeta.
function Datos({ nota }: { nota: Nota }) {
  return (
    <p className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest">
      <span>{fechaCorta(nota.fecha)}</span>
      {nota.region && <span className="text-oro">{nota.region}</span>}
    </p>
  );
}

export function TarjetaNota({ nota }: { nota: Nota }) {
  return (
    <Link
      href={`/notas/${nota.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tierra/10 bg-white transition hover:-translate-y-1 hover:border-oro hover:shadow-lg"
    >
      {nota.imagen && (
        <Image
          src={nota.imagen}
          alt=""
          width={800}
          height={450}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-7">
        <Datos nota={nota} />
        <h3 className="mt-3 text-xl font-bold leading-snug">{nota.titulo}</h3>
        <p className="mt-3 line-clamp-3 text-tierra-suave">{nota.resumen}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6 text-sm">
          <span className="text-tierra-suave">Por {nota.autores}</span>
          <span className="shrink-0 font-semibold text-oro transition group-hover:translate-x-1">
            Leer →
          </span>
        </div>
      </div>
    </Link>
  );
}

// La nota más reciente, en grande y a lo ancho.
export function TarjetaDestacada({ nota }: { nota: Nota }) {
  return (
    <Link
      href={`/notas/${nota.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-tierra/10 bg-white transition hover:border-oro hover:shadow-lg md:grid-cols-[1.35fr_1fr]"
    >
      {nota.imagen && (
        <span className="relative block aspect-video md:aspect-auto md:min-h-80">
          <Image
            src={nota.imagen}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover"
          />
        </span>
      )}
      <div className="flex flex-col p-7 sm:p-9">
        <Datos nota={nota} />
        <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">{nota.titulo}</h2>
        <p className="mt-4 line-clamp-4 text-tierra-suave">{nota.resumen}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6 text-sm">
          <span className="text-tierra-suave">Por {nota.autores}</span>
          <span className="shrink-0 font-semibold text-oro transition group-hover:translate-x-1">
            Leer →
          </span>
        </div>
      </div>
    </Link>
  );
}
