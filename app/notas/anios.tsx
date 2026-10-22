"use client";

import { useEffect, useState, type ReactNode } from "react";

type Anio = { anio: string; cantidad: number; contenido: ReactNode };

// Muestra las notas de un año por vez. El año elegido queda en la dirección (#2024) para poder compartirlo.
export function NotasPorAnio({ anios }: { anios: Anio[] }) {
  const [activo, setActivo] = useState(anios[0]?.anio);

  useEffect(() => {
    const leerHash = () => {
      const h = window.location.hash.slice(1);
      if (anios.some((a) => a.anio === h)) setActivo(h);
    };
    leerHash();
    window.addEventListener("hashchange", leerHash);
    return () => window.removeEventListener("hashchange", leerHash);
  }, [anios]);

  function elegir(anio: string) {
    setActivo(anio);
    history.replaceState(null, "", `#${anio}`);
  }

  return (
    <>
      <nav className="mb-10 flex flex-wrap gap-2" aria-label="Años">
        {anios.map((a) => (
          <button
            key={a.anio}
            type="button"
            onClick={() => elegir(a.anio)}
            aria-pressed={a.anio === activo}
            className={`rounded-full px-5 py-2 font-semibold transition ${
              a.anio === activo
                ? "bg-tierra text-crema"
                : "border border-tierra/15 bg-white hover:border-oro hover:text-oro"
            }`}
          >
            {a.anio}{" "}
            <span className={a.anio === activo ? "text-crema/60" : "text-tierra-suave/60"}>
              ({a.cantidad})
            </span>
          </button>
        ))}
      </nav>
      {anios.map((a) => (
        <section key={a.anio} hidden={a.anio !== activo}>
          <h2 className="mb-6 font-serif text-3xl italic text-oro">{a.anio}</h2>
          {a.contenido}
        </section>
      ))}
    </>
  );
}
