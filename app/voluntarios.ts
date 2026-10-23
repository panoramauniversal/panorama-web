// Voluntarios y voluntarias de Panorama Universal (/equipo/voluntariado/voluntarios).
// Para sumar a alguien, agregalo a la lista con su área (por ejemplo "Académica" o "Cooperación Internacional").
// La bio no repite el área: ya se muestra debajo del nombre. La foto va en public/equipo/ (cuadrada, 600×600).
import type { Integrante } from "./equipo";

export type Voluntario = Omit<Integrante, "cargo"> & { area: string };

export const voluntarios: Voluntario[] = [
  { nombre: "Agustina Luc", area: "Comunicación y Diseño" },
  {
    nombre: "Martina Ayelén Rein",
    area: "Asuntos Institucionales y Proyectos",
    foto: "/equipo/martina-rein.jpg",
    bio: "Estudiante avanzada de Relaciones Internacionales en la Universidad Católica Argentina.",
    linkedin: "https://www.linkedin.com/in/martinarein/",
  },
  {
    nombre: "Milagros Larsen",
    area: "Académica",
    foto: "/equipo/milagros-larsen.jpg",
    bio: "Estudiante de Relaciones Internacionales en la Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN).",
    instagram: "milii_larsen",
  },
  {
    nombre: "Milagros Portilla",
    area: "Académica",
    foto: "/equipo/milagros-portilla.jpg",
    bio: "Estudiante de Relaciones Internacionales y Ciencia Política en la Universidad de Palermo.",
    instagram: "milaporti",
    linkedin: "https://www.linkedin.com/in/milagros-portilla-4b19bb317/",
  },
  {
    nombre: "Tomás Barrera",
    autor: "Tomás Gabriel Barrera",
    area: "Académica",
    foto: "/equipo/tomas-barrera.jpg",
    bio: "Licenciado en Historia por la Universidad de Chile y estudiante de Periodismo en la Universidad Gabriela Mistral. Actualmente se desempeña como profesional de capacitaciones en World Vision Chile, vinculando su trayectoria con la educación, los derechos humanos y las relaciones internacionales.",
    instagram: "guajira.cosmica",
  },
  { nombre: "Cecile Fabian-Fränkel", area: "Comunicación y Diseño" },
  { nombre: "Iara Bornaz", area: "Comunicación y Diseño" },
  {
    nombre: "Lucia Sol Martin",
    area: "Asuntos Institucionales y Proyectos",
    foto: "/equipo/lucia-sol-martin.jpg",
    bio: "Estudiante de Relaciones Internacionales en la Universidad Católica Argentina. Actualmente se desempeña como becaria en la Alianza Francesa de Buenos Aires.",
    linkedin: "https://www.linkedin.com/in/luciasolmartin/",
  },
  {
    nombre: "Lourdes Torres",
    area: "Comunicación y Diseño",
    foto: "/equipo/lourdes-torres.jpg",
    bio: "Estudiante de la Licenciatura en Relaciones Internacionales en la Universidad Católica de Santiago del Estero. Actualmente se desempeña como Community Manager y gestora de redes sociales en Tárpuy Agencia, dedicada al marketing digital.",
    instagram: "louu.torres",
  },
  {
    nombre: "Santiago Provensale",
    area: "Comunicación y Diseño",
    bio: "Licenciado en Relaciones Internacionales por la Universidad Católica de Córdoba (UCC). Actualmente se desempeña en el área de Comunicación de la Secretaría General de la Gobernación de Córdoba, donde realiza tareas de análisis y comunicación política.",
    instagram: "santiproven8",
    linkedin: "https://www.linkedin.com/in/santiagojavierprovensale/",
  },
];
