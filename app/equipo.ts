// Equipo de Panorama Universal. Para agregar una foto, subila a public/equipo/
// y poné la ruta en el campo "foto" de la persona (por ejemplo "/equipo/nombre.jpg").

export type Integrante = {
  nombre: string;
  cargo: string;
  bio?: string;
  foto?: string;
  linkedin?: string;
  instagram?: string;
};

export type Area = {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  tareas: string[];
  mail?: string;
  integrantes: Integrante[];
};

export const areas: Area[] = [
  {
    slug: "equipo-directivo",
    nombre: "Equipo Directivo",
    resumen: "Conduce el proyecto y coordina el trabajo de todas las secretarías.",
    descripcion:
      "El Equipo Directivo define la orientación de Panorama Universal, representa al proyecto ante otras instituciones y coordina el trabajo de todas las secretarías.",
    tareas: [
      "Definir la estrategia y los objetivos anuales del proyecto.",
      "Representar a Panorama Universal ante instituciones, embajadas y organizaciones aliadas.",
      "Coordinar el trabajo entre las distintas secretarías.",
    ],
    mail: "panoramauniversal2024@gmail.com",
    integrantes: [
      {
        nombre: "Stefano Boubeta",
        cargo: "Fundador y Presidente",
        foto: "/equipo/stefano-boubeta.png",
        bio: "Licenciado en Relaciones Internacionales por la Universidad Nacional de General San Martín (UNSAM). Maestrando en Defensa Nacional en la Universidad de la Defensa Nacional (UNDEF). Fundador y Presidente de Panorama Universal. Se desempeña como Asistente Académico en la Secretaría de Coordinación del Consejo Argentino para Relaciones Internacionales (CARI). En la UNSAM ha sido profesor adscripto en las materias Historia Argentina (2023), Derechos Humanos en la Agenda Internacional (2024) y Cooperación Internacional (2025).",
        linkedin: "https://www.linkedin.com/in/stefano-boubeta",
        instagram: "stefboubeta",
      },
      {
        nombre: "Karina Herrera",
        cargo: "Vicepresidenta",
        bio: "Profesora de Educación Especial (I.N.S.P.E.E.) con especialización en ciegos y disminuidos visuales. Posgrado en Estimulación Temprana (I.N.S.P.E.E.). Óptica y Contactóloga. Posgrado en Pedagogía y Psicopedagogía Terapéutica (Universidad de Nebrija, España). Cursó la licenciatura en Relaciones Internacionales en la USAL. Fue profesora y Secretaria en la Escuela Técnica N°1 Manuel Belgrano (Tres de Febrero, Buenos Aires). Fue Jefe General de Taller de Óptica en Escuela Técnica N°16 D.E. 17 (CABA). Autora de diversos artículos ligados a salud y educación en Revista Mujer Actual de España. Es vicepresidenta de Panorama Universal.",
        foto: "/equipo/karina-herrera.jpg",
      },
      {
        nombre: "Santiago Simons",
        cargo: "Secretario General",
        linkedin: "https://www.linkedin.com/in/santiago-simons/",
        instagram: "santisimons",
      },
    ],
  },
  {
    slug: "academica",
    nombre: "Secretaría Académica",
    resumen: "Garantiza la calidad y el rigor de todo lo que publicamos.",
    descripcion:
      "La Secretaría Académica es responsable del contenido de Panorama Universal: acompaña a quienes escriben, corrige y edita cada publicación y piensa nuevos formatos para acercar el análisis internacional a más personas.",
    tareas: [
      "Redacción, corrección y edición de las publicaciones.",
      "Elaboración de la guía y las normas editoriales para quienes escriben.",
      "Análisis académico y resumen de las principales noticias internacionales de la semana.",
      "Desarrollo de nuevos formatos, como el newsletter y, a largo plazo, una revista propia.",
    ],
    mail: "academicapanoramauniversal@gmail.com",
    integrantes: [
      {
        nombre: "Luca Nava",
        cargo: "Secretario",
        bio: "Estudiante avanzado y tesista de la Licenciatura en Relaciones Internacionales por la Universidad Nacional de General San Martín (UNSAM). Secretario Académico de Panorama Universal. Redactor de Diplomacia Activa. Ex Voluntario de la Secretaría de Coordinación del CARI. Trabaja en la Secretaría de Trabajo y Producción de la Municipalidad de Tres de Febrero.",
        foto: "/equipo/luca-nava.jpg",
        linkedin: "https://www.linkedin.com/in/luca-nava-30aa08286/",
        instagram: "lucaa.nava",
      },
      { nombre: "Tomás Vallica", cargo: "Subsecretario" },
    ],
  },
  {
    slug: "comunicacion-y-diseno",
    nombre: "Secretaría de Comunicación y Diseño",
    resumen: "Lleva nuestro contenido a las redes y cuida la identidad de Panorama.",
    descripcion:
      "La Secretaría de Comunicación y Diseño transforma los análisis en publicaciones, reels y mapas, gestiona nuestras redes sociales y cuida la identidad visual de Panorama Universal.",
    tareas: [
      "Publicación semanal de análisis en redes sociales.",
      "Reels con el clip político de la semana y mapas mensuales.",
      "Gestión de Instagram, LinkedIn, TikTok y la página web.",
      "Diseño y cuidado de la marca Panorama Universal.",
    ],
    mail: "comunicacionpanoramauniversal@gmail.com",
    integrantes: [
      {
        nombre: "Agostina Granero Vocos",
        cargo: "Secretaria",
        foto: "/equipo/agostina-granero-vocos.webp",
        linkedin: "https://www.linkedin.com/in/agostinagranerovocos/",
        instagram: "agosgranero22",
      },
      { nombre: "Joaquín Campoy", cargo: "Subsecretario", foto: "/equipo/joaquin-campoy.jpg" },
    ],
  },
  {
    slug: "asuntos-institucionales-y-proyectos",
    nombre: "Secretaría de Asuntos Institucionales y Proyectos",
    resumen: "Construye alianzas y organiza nuestras actividades y visitas.",
    descripcion:
      "La Secretaría de Asuntos Institucionales y Proyectos construye y sostiene los vínculos de Panorama Universal con embajadas, universidades y organizaciones, y diseña las actividades que nos acercan a la comunidad.",
    tareas: [
      "Gestión de alianzas con embajadas, universidades, cámaras de comercio y organizaciones de la sociedad civil.",
      "Organización de visitas a embajadas, centros culturales y museos.",
      "Ciclos de charlas, encuentros y actividades virtuales o presenciales.",
      "Participación en congresos y federalización del proyecto.",
      "Ceremonial y protocolo.",
    ],
    mail: "institucionalpanoramauniversal@gmail.com",
    integrantes: [
      {
        nombre: "Iara Sofía Santoro",
        cargo: "Secretaria de Asuntos Institucionales",
        foto: "/equipo/iara-santoro.jpg",
        bio: "Estudiante avanzada y tesista de la Licenciatura en Relaciones Internacionales por la Universidad Nacional de San Martín (UNSAM), con tesis orientada en política exterior. Cuenta con experiencia en gestión institucional, comunicación y apoyo operativo en eventos académicos y diplomáticos. Se desempeña en el sector privado como administrativa, es ex voluntaria de la Secretaría de Comunicación del CARI, actualmente voluntaria en Directorio Legislativo y Secretaria de Asuntos Institucionales de Panorama Universal.",
        linkedin: "https://www.linkedin.com/in/iarasantoro",
        instagram: "iarusantoro",
      },
      {
        nombre: "Lucía Castillo Jerez",
        cargo: "Secretaria de Proyectos",
        foto: "/equipo/lucia-castillo-jerez.jpg",
        bio: "Licenciada en Relaciones Internacionales por la Universidad Católica de Córdoba, con experiencia en coordinación institucional, análisis estratégico y desarrollo de proyectos vinculados a sostenibilidad, impacto social y cooperación internacional. Se desempeña como Secretaria de Proyectos en Panorama Universal, Secretaria General en NSL Foundation y redactora en United Explanations. Actualmente cursa una diplomatura en Consultoría y Gestión Ambiental Público-Privada.",
        linkedin: "https://www.linkedin.com/in/lucia-castillo-jerez/",
        instagram: "pupicastilloo_",
      },
    ],
  },
  {
    slug: "cooperacion-internacional",
    nombre: "Secretaría de Cooperación Internacional",
    resumen: "Busca oportunidades, programas y vínculos internacionales.",
    descripcion:
      "La Secretaría de Cooperación Internacional construye la proyección internacional de Panorama Universal: identifica becas, programas y oportunidades de financiamiento, y promueve vínculos con actores de otros países.",
    tareas: [
      "Búsqueda de becas, programas y fondos para el proyecto.",
      "Coordinación de la cooperación con instituciones aliadas.",
      "Aviso al equipo sobre convocatorias relevantes y apoyo en las postulaciones.",
      "Presentación institucional de Panorama Universal en el exterior.",
    ],
    mail: "cooperacionpanoramauniversal@gmail.com",
    integrantes: [
      {
        nombre: "Martina Yannone",
        cargo: "Secretaria",
        foto: "/equipo/martina-yannone.jpg",
        bio: "Licenciada en Relaciones Internacionales por la Universidad Nacional de San Martín y Diplomada en Gestión Parlamentaria y Políticas Públicas por el Instituto de Capacitación Parlamentaria (ICaP) de la Honorable Cámara de Diputados de la Nación Argentina. Se especializa en Cooperación Internacional al Desarrollo y actualmente investiga las políticas impulsadas por la Unión Europea en esta materia. Cuenta con experiencia en la formulación, implementación y monitoreo de proyectos de cooperación internacional en organizaciones de la sociedad civil argentinas, articulando con diversos actores públicos y privados, tanto a nivel local como internacional, con el objetivo de promover el acceso a derechos, la reducción de las desigualdades, el fortalecimiento de las instituciones democráticas y el desarrollo sostenible. Además, desde 2025 integra el equipo docente de la cátedra de Cooperación Internacional de la Licenciatura en Relaciones Internacionales de la Universidad Nacional de San Martín como docente adscripta.",
        linkedin: "https://ar.linkedin.com/in/martinayannone",
        instagram: "martuyannone",
      },
      {
        nombre: "María Eugenia Silva",
        cargo: "Subsecretaria",
        foto: "/equipo/maria-eugenia-silva.jpg",
        bio: "Licenciada en Relaciones Internacionales por la Pontificia Universidad Católica Argentina (UCA). Actualmente se desempeña como Investment analyst en PromArgentina. A su vez, cuenta con experiencia en el ámbito parlamentario. Es voluntaria de la ONG Agenda Antártica y ha escrito numerosas notas en distintos diarios y portales académicos.",
        linkedin: "https://www.linkedin.com/in/maria-eugenia-silva-a50385276/",
        instagram: "eugee.silvaa",
      },
    ],
  },
  {
    slug: "recursos-humanos",
    nombre: "Secretaría de Recursos Humanos",
    resumen: "Acompaña a miembros y voluntarios y coordina el trabajo interno.",
    descripcion:
      "La Secretaría de Recursos Humanos cuida a las personas que hacen Panorama Universal: organiza las convocatorias de voluntariado, acompaña a miembros y voluntarios y coordina el trabajo entre las secretarías.",
    tareas: [
      "Convocatoria, selección e incorporación de miembros y voluntarios.",
      "Coordinación entre todas las secretarías y organización de reuniones.",
      "Capacitación en habilidades y herramientas.",
      "Seguimiento de actividades, eventos y fechas importantes.",
    ],
    mail: "rrhhpanoramauniversal@gmail.com",
    integrantes: [
      {
        nombre: "Ornella Ramírez",
        cargo: "Secretaria",
        bio: "Estudiante de Relaciones Internacionales en la UAI. Cuenta con experiencia en recursos humanos y actualmente se desempeña como secretaria de RRHH en Panorama Universal. Interesada en la gestión institucional y el trabajo en equipo.",
        linkedin: "https://www.linkedin.com/in/ornella-ramirez-4370a4313",
        instagram: "orneramirez",
      },
      {
        nombre: "Tomás Cot",
        cargo: "Subsecretario",
        bio: "Estudiante avanzado en la Licenciatura de Ciencia Política de la UBA, actualmente desempeña el cargo de subsecretario de RR.HH en Panorama Universal. Cuenta con experiencia en territorio en organizaciones no gubernamentales, proyectos sociales, selección y coordinación de voluntarios.",
        foto: "/equipo/tomas-cot.jpg",
        linkedin: "https://www.linkedin.com/in/tomas-cot/",
        instagram: "tomascot_",
      },
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
