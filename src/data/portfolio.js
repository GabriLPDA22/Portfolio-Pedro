// src/data/portfolio.js
// Datos del Portfolio - PERSONALIZAR AQUÍ

export const portfolioData = {
  // Información personal - 🔄 CAMBIAR TODOS ESTOS DATOS
  personal: {
    name: "Pedro Miguel Melo Sousa", // 🔄 CAMBIAR por el nombre real
    title: "Técnico Superior en Mecanizado",
    subtitle: "Especialista en Mecanizado de Precisión",
    description:
      "Profesional del mecanizado con sólida formación técnica en grado medio y superior. Especializado en la fabricación de piezas de alta precisión mediante técnicas avanzadas de mecanizado CNC.",
    location: "Caspe, Aragón, España",
    avatar: "/images/avatar.jpg", // 🔄 AÑADIR foto real
  },

  // Información de contacto - 🔄 CAMBIAR TODOS
  contact: {
    email: "contacto@tuamigo.com", // 🔄 CAMBIAR
    phone: "+34 123 456 789", // 🔄 CAMBIAR
    linkedin: "https://linkedin.com/in/tuamigo", // 🔄 CAMBIAR
    github: "", // Opcional
    website: "", // Opcional
    address: "Caspe, Aragón, España",
  },

  // Sobre mí
  about: {
    description:
      "Profesional del mecanizado con sólida formación técnica y experiencia práctica en el sector industrial. Especializado en la fabricación de piezas de alta precisión mediante técnicas avanzadas de mecanizado, con conocimientos profundos en programación CNC, metrología y control de calidad.",

    highlights: [
      {
        title: "Grado Medio en Mecanizado", // 🔄 CAMBIAR nombre exacto
        description:
          "Formación técnica en fundamentos de mecanizado, operaciones básicas de torno y fresadora.",
        icon: "🎓",
        year: "2020-2022", // 🔄 CAMBIAR fechas reales
      },
      {
        title: "Grado Superior en Programación CNC", // 🔄 CAMBIAR nombre exacto
        description:
          "Especialización avanzada en programación de máquinas CNC, CAD/CAM y control de calidad.",
        icon: "🏆",
        year: "2022-2024", // 🔄 CAMBIAR fechas reales
      },
      {
        title: "Experiencia Práctica",
        description:
          "Aplicación real de conocimientos en entornos industriales con tolerancias extremas.",
        icon: "⚙️",
        year: "2024-Presente",
      },
    ],
  },

  // Habilidades técnicas
  skills: [
    {
      category: "Mecanizado",
      items: [
        {
          name: "Torneado CNC",
          level: 90,
          icon: "🔧",
          description: "Programación y operación de tornos CNC",
        },
        {
          name: "Fresado",
          level: 85,
          icon: "⚙️",
          description: "Mecanizado de piezas complejas",
        },
        {
          name: "Programación ISO",
          level: 80,
          icon: "💻",
          description: "Código G y M para CNC",
        },
        {
          name: "Metrología",
          level: 95,
          icon: "📏",
          description: "Instrumentos de medición dimensional",
        },
        {
          name: "CAD/CAM",
          level: 75,
          icon: "📐",
          description: "Diseño y programación asistida",
        },
        {
          name: "Control de Calidad",
          level: 90,
          icon: "✅",
          description: "SPC y control estadístico",
        },
      ],
    },
  ],

  // Proyectos destacados - 🔄 PERSONALIZAR CON PROYECTOS REALES
  projects: [
    {
      id: 1,
      title: "Piezas de Precisión Aeronáutica",
      description:
        "Mecanizado de componentes críticos para la industria aeroespacial con tolerancias de ±0.005mm.",
      technologies: ["CNC", "Titanio", "Control Calidad"],
      icon: "✈️",
      image: "/images/projects/aero.jpg",
    },
    {
      id: 2,
      title: "Utillajes Industriales",
      description:
        "Fabricación de herramientas y utillajes para líneas de producción automatizada.",
      technologies: ["Acero", "Fresado", "Tratamientos"],
      icon: "🔨",
      image: "/images/projects/tooling.jpg",
    },
    {
      id: 3,
      title: "Prototipos Automovilísticos",
      description:
        "Desarrollo de prototipos funcionales para la industria del automóvil.",
      technologies: ["Aluminio", "Torneado", "CAM"],
      icon: "🚗",
      image: "/images/projects/automotive.jpg",
    },
  ],

  // Experiencia laboral - 🔄 CAMBIAR POR EXPERIENCIA REAL
  experience: [
    {
      id: 1,
      position: "Técnico de Mecanizado",
      company: "Empresa Industrial S.L.", // 🔄 CAMBIAR
      period: "2023 - Presente",
      description:
        "Responsable del mecanizado de piezas complejas y supervisión de procesos de calidad.",
    },
    {
      id: 2,
      position: "Operario CNC",
      company: "Talleres Mecánicos", // 🔄 CAMBIAR
      period: "2022 - 2023",
      description:
        "Operación de máquinas CNC y programación de piezas de serie.",
    },
    {
      id: 3,
      position: "Estudiante en Prácticas",
      company: "Centro de Formación", // 🔄 CAMBIAR
      period: "2021 - 2022",
      description:
        "Formación práctica en taller y primeros contactos con el mundo laboral.",
    },
  ],
};
