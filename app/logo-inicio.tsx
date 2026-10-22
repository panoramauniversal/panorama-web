"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Logo de la barra superior: siempre lleva al comienzo de la portada.
// Subimos la página antes de navegar, porque el desplazamiento suave
// hacía que a veces la portada quedara abierta más abajo.
export function LogoInicio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      onClick={(e) => {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (pathname === "/") {
          e.preventDefault();
          if (window.location.hash) history.replaceState(null, "", "/");
        }
      }}
    >
      {children}
    </Link>
  );
}
