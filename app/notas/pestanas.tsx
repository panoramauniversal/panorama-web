import Link from "next/link";

// Pestañas de la sección Notas: todas las notas o el listado de autores.
export function PestanasNotas({ activa }: { activa: "notas" | "autores" }) {
  const pestanas = [
    { id: "notas", href: "/notas", label: "Todas las notas" },
    { id: "autores", href: "/notas/autores", label: "Autores" },
  ];
  return (
    <nav className="mb-8 flex gap-2" aria-label="Secciones de Notas">
      {pestanas.map((p) => (
        <Link
          key={p.id}
          href={p.href}
          aria-current={p.id === activa ? "page" : undefined}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            p.id === activa
              ? "bg-oro text-tierra"
              : "border border-crema/30 text-crema hover:border-oro hover:text-oro"
          }`}
        >
          {p.label}
        </Link>
      ))}
    </nav>
  );
}
