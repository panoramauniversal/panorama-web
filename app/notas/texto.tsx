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
  return (
    <div className="space-y-5 text-lg leading-relaxed text-tierra-suave">
      {cuerpo.split(/\n\s*\n/).map((bloque, i) =>
        bloque.startsWith("## ") ? (
          <h2 key={i} className="pt-6 text-2xl font-semibold text-tierra">
            {enLinea(bloque.slice(3))}
          </h2>
        ) : (
          <p key={i}>{enLinea(bloque)}</p>
        ),
      )}
    </div>
  );
}
