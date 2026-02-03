// Datos de la malla curricular extraídos de la imagen
const curriculumData = {
    semesters: [
        {
            id: 1,
            name: "I SEMESTRE",
            courses: [
                { id: "c1", name: "Razonamiento Lógico Matemático", credits: 4 },
                { id: "c2", name: "Matemática Básica", credits: 4 },
                { id: "c3", name: "Técnicas de Comunicación", credits: 3 },
                { id: "c4", name: "Estructuras Discretas", credits: 3 },
                { id: "c5", name: "Fundamentos de la Programación I", credits: 4 },
                { id: "c6", name: "Metodología del Trabajo Intelectual Universitario", credits: 2 },
                { id: "c7", name: "Relaciones Humanas", credits: 2 }
            ]
        },
        {
            id: 2,
            name: "II SEMESTRE",
            courses: [
                { id: "c8", name: "Cálculo en una Variable", credits: 4 },
                { id: "c9", name: "Estructuras Discretas 2", credits: 3 },
                { id: "c10", name: "Fundamentos de Programación 2", credits: 4 },
                { id: "c11", name: "Programación Web I", credits: 4 },
                { id: "c12", name: "Comunicación Integral", credits: 3 },
                { id: "c13", name: "Realidad Nacional", credits: 2 }
            ]
        },
        {
            id: 3,
            name: "III SEMESTRE",
            courses: [
                { id: "c14", name: "Cálculo en Varias Variables", credits: 4 },
                { id: "c15", name: "Innovación y Emprendimiento", credits: 3 },
                { id: "c16", name: "Estructura de Datos y Algoritmos", credits: 4 },
                { id: "c17", name: "Programación Web 2", credits: 4 },
                { id: "c18", name: "Talleres de Psicología", credits: 3 },
                { id: "c19", name: "Liderazgo y Colaboración", credits: 2 },
                { id: "c20", name: "Ciudadanía e Interculturalidad", credits: 2 },
                { id: "c21", name: "Redacción de Artículos e Informes de Investigación", credits: 2 }
            ]
        },
        {
            id: 4,
            name: "IV SEMESTRE",
            courses: [
                { id: "c22", name: "Estadística Aplicada a Negocios y Métodos Empíricos de Investigación", credits: 3 },
                { id: "c23", name: "Arquitectura de Computadoras", credits: 3 },
                { id: "c24", name: "Análisis y Diseño de Algoritmos", credits: 4 },
                { id: "c25", name: "Interacción Humano Computador", credits: 3 },
                { id: "c26", name: "Enfoque Empresarial de Negocios", credits: 2 },
                { id: "c27", name: "Ecología y Conservación Ambiental", credits: 2 },
                { id: "c28", name: "Métodos de Investigación y Redacción", credits: 2 }
            ]
        },
        {
            id: 5,
            name: "V SEMESTRE",
            courses: [
                { id: "c29", name: "Investigación de Operaciones", credits: 4 },
                { id: "c30", name: "Programación de Sistemas", credits: 4 },
                { id: "c31", name: "Teoría de la Computación", credits: 3 },
                { id: "c32", name: "Ingeniería y Procesos de Software", credits: 3 },
                { id: "c33", name: "Base de Datos", credits: 4 },
                { id: "c34", name: "Organización de Métodos", credits: 2 }
            ]
        },
        {
            id: 6,
            name: "VI SEMESTRE",
            courses: [
                { id: "c35", name: "Métodos Numéricos", credits: 3 },
                { id: "c36", name: "Sistemas Operativos", credits: 4 },
                { id: "c37", name: "Redes y Comunicación de Datos", credits: 4 },
                { id: "c38", name: "Construcción de Software", credits: 4 },
                { id: "c39", name: "Tecnología de Base de Datos", credits: 3 },
                { id: "c40", name: "Fundamentos de Sistemas de Información", credits: 3 }
            ]
        },
        {
            id: 7,
            name: "VII SEMESTRE",
            courses: [
                { id: "c41", name: "Inteligencia Artificial", credits: 3 },
                { id: "c42", name: "Física Computacional", credits: 3 },
                { id: "c43", name: "Sistemas Distribuidos", credits: 4 },
                { id: "c44", name: "Pruebas de Software", credits: 3 },
                { id: "c45", name: "Ingeniería de Requisitos de Software", credits: 4 },
                { id: "c46", name: "Tecnología de Información", credits: 4 }
            ]
        },
        {
            id: 8,
            name: "VIII SEMESTRE",
            courses: [
                { id: "c47", name: "Introducción al Desarrollo de Emprendimiento (E)", credits: 3 },
                { id: "c48", name: "Introducción al Desarrollo de Plataformas (E)", credits: 3 },
                { id: "c49", name: "Aspectos Formales de Verificación (E)", credits: 3 },
                { id: "c50", name: "Calidad de Software", credits: 3 },
                { id: "c51", name: "Arquitectura de Software", credits: 4 },
                { id: "c52", name: "Gestión de Proyectos de Software", credits: 3 },
                { id: "c53", name: "Auditoría de Sistemas y Negocios Electrónicos (E)", credits: 4 },
                { id: "c54", name: "Auditoría de Sistemas", credits: 3 }
            ]
        },
        {
            id: 9,
            name: "IX SEMESTRE",
            courses: [
                { id: "c55", name: "Computación Gráfica (E) / Desarrollo de Multimedia (E)", credits: 3 },
                { id: "c56", name: "Desarrollo avanzado de Plataformas (E)", credits: 4 },
                { id: "c57", name: "Seguridad Informática", credits: 3 },
                { id: "c58", name: "Arquitectura y Configuración y Gestión de Software", credits: 3 },
                { id: "c59", name: "Proyecto de Ingeniería de Software", credits: 3 },
                { id: "c60", name: "Gestión de Emprendimiento de Software", credits: 2 },
                { id: "c61", name: "Ingeniería de Test y Aseguramiento de Calidad (E)", credits: 3 },
                { id: "c62", name: "Tópicos Avanzados en Base de Datos (E)", credits: 2 },
                { id: "c63", name: "Ética General y Profesional", credits: 2 }
            ]
        },
        {
            id: 10,
            name: "X SEMESTRE",
            courses: [
                { id: "c64", name: "Desarrollo de Software Para Negocios (E)", credits: 3 },
                { id: "c65", name: "Plataformas Emergentes (E)", credits: 3 },
                { id: "c66", name: "Tópicos Avanzados en Ingeniería de Software", credits: 3 },
                { id: "c67", name: "Prácticas Pre Profesionales", credits: 3 },
                { id: "c68", name: "Seminario de Ingeniería de Software", credits: 4 },
                { id: "c69", name: "Seminario de Tesis I", credits: 2 },
                { id: "c70", name: "Gestión de Sistemas de Información (E)", credits: 4 }
            ]
        }
    ],
    // Relaciones de prerequisitos (ejemplos basados en la lógica típica)
    prerequisites: {
        "c8": ["c2"],   // Cálculo en una variable requiere Matemática Básica
        "c9": ["c4"],   // Estructuras Discretas 2 requiere Estructuras Discretas
        "c10": ["c5"],  // Fundamentos Prog 2 requiere Fundamentos Prog 1
        "c11": ["c5"],  // Programación Web I requiere Fundamentos Prog 1
        "c14": ["c8"],  // Cálculo varias variables requiere Cálculo una variable
        "c16": ["c9"],  // Estructura de Datos requiere Estructuras Discretas 2
        "c17": ["c11"], // Programación Web 2 requiere Programación Web 1
        "c24": ["c16"], // Análisis y Diseño de Algoritmos requiere Estructura de Datos
        "c30": ["c16"], // Programación de Sistemas requiere Estructura de Datos
        "c33": ["c16"], // Base de Datos requiere Estructura de Datos
        "c36": ["c23"], // Sistemas Operativos requiere Arquitectura de Computadoras
        "c38": ["c32"], // Construcción de Software requiere Ingeniería de Software
        "c39": ["c33"], // Tecnología de BD requiere Base de Datos
        "c43": ["c36"], // Sistemas Distribuidos requiere Sistemas Operativos
        "c44": ["c38"], // Pruebas de Software requiere Construcción de Software
        "c50": ["c44"], // Calidad de Software requiere Pruebas de Software
        "c51": ["c38"], // Arquitectura de Software requiere Construcción de Software
    }
};
