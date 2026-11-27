// Si quien firma una nota forma parte del equipo o del voluntariado, devuelve su ficha
// (foto, bio) y su cargo. Se busca igual que el botón "Ver sus notas" de las tarjetas.
import { areas, type Integrante } from "../equipo";
import { voluntarios } from "../voluntarios";
import { getAutorDeIntegrante } from "./datos";

export function buscarEnEquipo(slug: string): { persona: Integrante; cargo: string } | undefined {
  const esElAutor = (p: Integrante) => getAutorDeIntegrante(p.autor ?? p.nombre)?.slug === slug;
  for (const area of areas) {
    const persona = area.integrantes.find(esElAutor);
    if (persona) return { persona, cargo: `${persona.cargo} · ${area.nombre}` };
  }
  for (const { area, ...v } of voluntarios) {
    const persona = { ...v, cargo: "Voluntariado" };
    if (esElAutor(persona)) return { persona, cargo: `Voluntariado · ${area}` };
  }
}
