// Convierte el Markdown simple de las notas (## subtítulos, párrafos, **negrita**, *cursiva*).
import { Fragment } from "react";

function enLinea(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((parte, i) => {
    if (parte.startsWith("**")) return <strong key={i}>{parte.slice(2, -2)}</strong>;
    if (parte.startsWith("*")) return <em key={i}>{parte.slice(1, -1)}</em>;
    return <Fragment key={i}>{parte}</Fragment>;
  });
}

export function TextoNota({ cuerpo }: { cuerpo: string }) {
  const bloques = cuerpo.split(/\n\s*\n/);
  // La primera letra del primer párrafo va destacada, como en las revistas.
  const primerParrafo = bloques.findIndex((b) => !b.startsWith("## "));
  return (
    <div className="space-y-5 text-lg leading-relaxed text-tierra-suave">
      {bloques.map((bloque, i) =>
        bloque.startsWith("## ") ? (
          <h2 key={i} className="pt-8 font-serif text-2xl font-medium italic text-oro sm:text-3xl">
            {enLinea(bloque.slice(3))}
          </h2>
        ) : (
          <p
            key={i}
            className={
              i === primerParrafo
                ? "first-letter:float-left first-letter:mr-1.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.75rem] first-letter:font-medium first-letter:leading-[0.75] first-letter:text-oro first-letter:text-tierra"
                : undefined
            }
          >
            {enLinea(bloque)}
          </p>
        ),
      )}
    </div>
  );
}
