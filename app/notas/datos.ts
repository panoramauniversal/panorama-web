// Lee las notas desde content/notas/*.md. Cada archivo tiene un encabezado
// (titulo, fecha, autores, colaboracion, resumen) y el cuerpo en Markdown simple.
import fs from "node:fs";
import path from "node:path";
import { separarAutores, slugAutor } from "./autores";

export type Nota = {
  slug: string;
  titulo: string;
  fecha: string;
  autores: string;
  colaboracion?: string;
  resumen: string;
  cuerpo: string;
};

const carpeta = path.join(process.cwd(), "content", "notas");

function leerNota(archivo: string): Nota {
  const texto = fs.readFileSync(path.join(carpeta, archivo), "utf8");
  const [, encabezado, cuerpo] = texto.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
  if (!encabezado) throw new Error(`La nota ${archivo} no tiene encabezado`);

  const datos: Record<string, string> = {};
  for (const linea of encabezado.split("\n")) {
    const i = linea.indexOf(":");
    if (i > 0) datos[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
  }

  return {
    slug: archivo.replace(/\.md$/, ""),
    titulo: datos.titulo,
    fecha: datos.fecha,
    autores: datos.autores,
    colaboracion: datos.colaboracion || undefined,
    resumen: datos.resumen,
    cuerpo: cuerpo.trim(),
  };
}

export function getNotas(): Nota[] {
  return fs
    .readdirSync(carpeta)
    .filter((a) => a.endsWith(".md"))
    .map(leerNota)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getNota(slug: string) {
  return getNotas().find((n) => n.slug === slug);
}

export function formatearFecha(fecha: string) {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export type Autor = { nombre: string; slug: string; notas: Nota[] };

// Todas las personas que firmaron al menos una nota, en orden alfabético.
export function getAutores(): Autor[] {
  const porSlug = new Map<string, Autor>();
  for (const nota of getNotas()) {
    for (const nombre of separarAutores(nota.autores)) {
      const slug = slugAutor(nombre);
      const autor = porSlug.get(slug) ?? { nombre, slug, notas: [] };
      // Entre dos formas del mismo nombre, nos quedamos con la que tiene tildes.
      if (nombre.normalize("NFD").length > autor.nombre.normalize("NFD").length) autor.nombre = nombre;
      autor.notas.push(nota);
      porSlug.set(slug, autor);
    }
  }
  return [...porSlug.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export function getAutor(slug: string) {
  return getAutores().find((a) => a.slug === slug);
}
