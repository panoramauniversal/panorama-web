import Image from "next/image";
import Link from "next/link";
import { formatearFecha, type Nota } from "./datos";

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
        <p className="text-xs font-semibold uppercase tracking-widest text-oro">
          {formatearFecha(nota.fecha)}
        </p>
        <h3 className="mt-3 text-xl font-semibold leading-snug">{nota.titulo}</h3>
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
