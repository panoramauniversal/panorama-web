// Lee las notas desde content/notas/*.md. Cada archivo tiene un encabezado
// (titulo, fecha, autores, colaboracion, resumen) y el cuerpo en Markdown simple.
import fs from "node:fs";
import path from "node:path";

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
