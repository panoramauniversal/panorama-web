import type { Redes } from "./autores";

// Botones de Instagram y LinkedIn de un autor, para fondo oscuro o claro.
export function BotonesRedes({ redes, light = false }: { redes: Redes; light?: boolean }) {
  const estilo = light
    ? "border-crema/25 text-crema/90 hover:border-oro hover:text-oro"
    : "border-tierra/15 text-tierra hover:border-oro hover:text-oro";
  const clase = `rounded-full border px-3 py-1 text-xs font-semibold transition ${estilo}`;
  return (
    <>
      {redes.instagram && (
        <a
          href={`https://www.instagram.com/${redes.instagram}/`}
          target="_blank"
          rel="noopener noreferrer"
          className={clase}
        >
          Instagram
        </a>
      )}
      {redes.linkedin && (
        <a href={redes.linkedin} target="_blank" rel="noopener noreferrer" className={clase}>
          LinkedIn
        </a>
      )}
    </>
  );
}
