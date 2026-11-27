"use client";

import { useState, type ReactNode } from "react";

type Item = { slug: string; nombre: string; letra: string; tarjeta: ReactNode };

// Sin tildes y en minúscula, para que "jose" encuentre a "José".
function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Listado de autores por letra, con un buscador por nombre arriba.
export function ListaAutores({ items, letras }: { items: Item[]; letras: string[] }) {
  const [busqueda, setBusqueda] = useState("");
  const q = normalizar(busqueda.trim());
  const visibles = q ? items.filter((i) => normalizar(i.nombre).includes(q)) : items;
  const conAutores = letras.filter((l) => visibles.some((i) => i.letra === l));

  return (
    <>
      <div className="mb-12 rounded-3xl border border-tierra/10 bg-white p-6 sm:p-8">
        <label htmlFor="buscar-autor" className="text-xs font-semibold uppercase tracking-[0.25em] text-oro">
          Buscar por nombre
        </label>
        <input
          id="buscar-autor"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Escribí un nombre o apellido"
          className="mt-3 w-full rounded-full border border-tierra/20 bg-crema px-5 py-3 text-lg outline-none transition placeholder:text-tierra-suave/60 focus:border-oro"
        />
        {!q && (
          <nav className="mt-5 flex flex-wrap gap-2" aria-label="Letras">
            {letras.map((l) => (
              <a
                key={l}
                href={`#letra-${l}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-tierra/15 font-serif text-base italic transition hover:border-oro hover:text-oro"
              >
                {l}
              </a>
            ))}
          </nav>
        )}
      </div>

      {conAutores.length === 0 && (
        <p className="text-lg text-tierra-suave">No encontramos autores con “{busqueda}”.</p>
      )}
      {conAutores.map((letra) => (
        <section key={letra} id={`letra-${letra}`} className="mb-12 scroll-mt-24 last:mb-0">
          <h2 className="mb-5 border-b border-tierra pb-3 font-serif text-4xl font-medium italic text-oro">
            {letra}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibles
              .filter((i) => i.letra === letra)
              .map((i) => (
                <li key={i.slug}>{i.tarjeta}</li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
