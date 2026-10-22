// Voluntarios y voluntarias de Panorama Universal (/equipo/voluntariado/voluntarios).
// Para sumar a alguien, agregalo a la lista con su área (por ejemplo "Académica" o "Cooperación Internacional"). La foto va en public/equipo/ (cuadrada, 600×600).
import type { Integrante } from "./equipo";

export type Voluntario = Omit<Integrante, "cargo"> & { area: string };

export const voluntarios: Voluntario[] = [
  { nombre: "Agustina Luc", area: "Comunicación y Diseño" },
  { nombre: "Cecile Fabian-Fränkel", area: "Comunicación y Diseño" },
  { nombre: "Iara Bornaz", area: "Comunicación y Diseño" },
  { nombre: "Lourdes Torres", area: "Comunicación y Diseño" },
  { nombre: "Santiago Provensale", area: "Comunicación y Diseño" },
];
