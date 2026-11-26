"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Item = { slug: string; anio: string; region?: string; tarjeta: ReactNode };

// Orden en que aparecen los botones de región.
const ORDEN_REGIONES = [
  "Argentina",
  "América del Sur",
  "Centroamérica y Caribe",
  "América del Norte",
  "Europa",
  "Medio Oriente",
  "África",
  "Asia",
  "Global",
];

function Boton({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        activo
          ? "bg-tierra text-crema"
          : "border border-tierra/15 bg-white hover:border-oro hover:text-oro"
      }`}
    >
      {children}
    </button>
  );
}

// Muestra las notas de un año, con botones para filtrar por región arriba y
// el cambio de año abajo de todo. El año elegido queda en la dirección (#2024).
export function NotasFiltradas({ items, anios }: { items: Item[]; anios: string[] }) {
  const [anio, setAnio] = useState(anios[0]);
  const [region, setRegion] = useState<string | null>(null);
  const arriba = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leerHash = () => {
      const h = window.location.hash.slice(1);
      if (anios.includes(h)) setAnio(h);
    };
    leerHash();
    window.addEventListener("hashchange", leerHash);
    return () => window.removeEventListener("hashchange", leerHash);
  }, [anios]);

  const delAnio = items.filter((i) => i.anio === anio);
  const regiones = ORDEN_REGIONES.filter((r) => delAnio.some((i) => i.region === r));
  const regionActiva = region && regiones.includes(region) ? region : null;
  const visibles = regionActiva ? delAnio.filter((i) => i.region === regionActiva) : delAnio;

  function elegirAnio(a: string) {
    setAnio(a);
    setRegion(null);
    history.replaceState(null, "", `#${a}`);
    arriba.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div ref={arriba} className="scroll-mt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-tierra-suave">
          Filtrar por región
        </p>
        <nav className="mb-10 flex flex-wrap gap-2" aria-label="Regiones">
          <Boton activo={!regionActiva} onClick={() => setRegion(null)}>
            Todas
          </Boton>
          {regiones.map((r) => (
            <Boton key={r} activo={r === regionActiva} onClick={() => setRegion(r)}>
              {r}
            </Boton>
          ))}
        </nav>
      </div>

      <h2 className="mb-6 border-b border-tierra pb-4 text-3xl font-bold tracking-tight">
        <span className="font-serif font-medium italic text-oro">Notas</span> de {anio}
        {regionActiva && <span className="text-tierra-suave"> · {regionActiva}</span>}
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((i) => (
          <li key={i.slug}>{i.tarjeta}</li>
        ))}
      </ul>

      <div className="mt-16 border-t border-tierra/15 pt-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-tierra-suave">
          Archivo por año
        </p>
        <nav className="flex flex-wrap gap-2" aria-label="Años">
          {anios.map((a) => (
            <Boton key={a} activo={a === anio} onClick={() => elegirAnio(a)}>
              {a}
            </Boton>
          ))}
        </nav>
      </div>
    </>
  );
}
