// Mallas disponibles — agregar nuevas mallas aquí
const mallasData = [

    // ── MALLA 1: Ingeniería de Software ─────────────────────────────────────
    {
        id: "ing-software",
        label: "Ingeniería de Software",
        icon: "💻",
        description: "Plan de estudios 2013 · Sistemas, algoritmos y construcción de software",
        accentPrimary: "#4A90E8",
        accentSecondary: "#1AC97A",
        semesters: [
            {
                id: 1, name: "I SEMESTRE",
                courses: [
                    { id: "c1",  name: "Razonamiento Lógico Matemático",                          credits: 4 },
                    { id: "c2",  name: "Matemática Básica",                                       credits: 4 },
                    { id: "c3",  name: "Técnicas de Comunicación",                                credits: 3 },
                    { id: "c4",  name: "Estructuras Discretas",                                   credits: 3 },
                    { id: "c5",  name: "Fundamentos de la Programación I",                        credits: 4 },
                    { id: "c6",  name: "Metodología del Trabajo Intelectual Universitario",       credits: 2 },
                    { id: "c7",  name: "Relaciones Humanas",                                      credits: 2 }
                ]
            },
            {
                id: 2, name: "II SEMESTRE",
                courses: [
                    { id: "c8",  name: "Cálculo en una Variable",           credits: 4 },
                    { id: "c9",  name: "Estructuras Discretas 2",           credits: 3 },
                    { id: "c10", name: "Fundamentos de Programación 2",     credits: 4 },
                    { id: "c11", name: "Programación Web I",                credits: 4 },
                    { id: "c12", name: "Comunicación Integral",             credits: 3 },
                    { id: "c13", name: "Realidad Nacional",                 credits: 2 }
                ]
            },
            {
                id: 3, name: "III SEMESTRE",
                courses: [
                    { id: "c14", name: "Cálculo en Varias Variables",                                credits: 4 },
                    { id: "c15", name: "Innovación y Emprendimiento",                                credits: 3 },
                    { id: "c16", name: "Estructura de Datos y Algoritmos",                           credits: 4 },
                    { id: "c17", name: "Programación Web 2",                                         credits: 4 },
                    { id: "c18", name: "Talleres de Psicología",                                     credits: 3 },
                    { id: "c19", name: "Liderazgo y Colaboración",                                   credits: 2 },
                    { id: "c20", name: "Ciudadanía e Interculturalidad",                             credits: 2 },
                    { id: "c21", name: "Redacción de Artículos e Informes de Investigación",         credits: 2 }
                ]
            },
            {
                id: 4, name: "IV SEMESTRE",
                courses: [
                    { id: "c22", name: "Estadística Aplicada a Negocios y Métodos Empíricos",   credits: 3 },
                    { id: "c23", name: "Arquitectura de Computadoras",                           credits: 3 },
                    { id: "c24", name: "Análisis y Diseño de Algoritmos",                        credits: 4 },
                    { id: "c25", name: "Interacción Humano Computador",                          credits: 3 },
                    { id: "c26", name: "Enfoque Empresarial de Negocios",                        credits: 2 },
                    { id: "c27", name: "Ecología y Conservación Ambiental",                      credits: 2 },
                    { id: "c28", name: "Métodos de Investigación y Redacción",                   credits: 2 }
                ]
            },
            {
                id: 5, name: "V SEMESTRE",
                courses: [
                    { id: "c29", name: "Investigación de Operaciones",          credits: 4 },
                    { id: "c30", name: "Programación de Sistemas",              credits: 4 },
                    { id: "c31", name: "Teoría de la Computación",              credits: 3 },
                    { id: "c32", name: "Ingeniería y Procesos de Software",     credits: 3 },
                    { id: "c33", name: "Base de Datos",                         credits: 4 },
                    { id: "c34", name: "Organización de Métodos",               credits: 2 }
                ]
            },
            {
                id: 6, name: "VI SEMESTRE",
                courses: [
                    { id: "c35", name: "Métodos Numéricos",                         credits: 3 },
                    { id: "c36", name: "Sistemas Operativos",                       credits: 4 },
                    { id: "c37", name: "Redes y Comunicación de Datos",             credits: 4 },
                    { id: "c38", name: "Construcción de Software",                  credits: 4 },
                    { id: "c39", name: "Tecnología de Base de Datos",               credits: 3 },
                    { id: "c40", name: "Fundamentos de Sistemas de Información",    credits: 3 }
                ]
            },
            {
                id: 7, name: "VII SEMESTRE",
                courses: [
                    { id: "c41", name: "Inteligencia Artificial",               credits: 3 },
                    { id: "c42", name: "Física Computacional",                  credits: 3 },
                    { id: "c43", name: "Sistemas Distribuidos",                 credits: 4 },
                    { id: "c44", name: "Pruebas de Software",                   credits: 3 },
                    { id: "c45", name: "Ingeniería de Requisitos de Software",  credits: 4 },
                    { id: "c46", name: "Tecnología de Información",             credits: 4 }
                ]
            },
            {
                id: 8, name: "VIII SEMESTRE",
                courses: [
                    { id: "c47", name: "Introducción al Desarrollo de Emprendimiento (E)",    credits: 3 },
                    { id: "c48", name: "Introducción al Desarrollo de Plataformas (E)",       credits: 3 },
                    { id: "c49", name: "Aspectos Formales de Verificación (E)",               credits: 3 },
                    { id: "c50", name: "Calidad de Software",                                  credits: 3 },
                    { id: "c51", name: "Arquitectura de Software",                             credits: 4 },
                    { id: "c52", name: "Gestión de Proyectos de Software",                     credits: 3 },
                    { id: "c53", name: "Auditoría de Sistemas y Negocios Electrónicos (E)",   credits: 4 },
                    { id: "c54", name: "Auditoría de Sistemas",                                credits: 3 }
                ]
            },
            {
                id: 9, name: "IX SEMESTRE",
                courses: [
                    { id: "c55", name: "Computación Gráfica (E) / Desarrollo de Multimedia (E)",    credits: 3 },
                    { id: "c56", name: "Desarrollo Avanzado de Plataformas (E)",                     credits: 4 },
                    { id: "c57", name: "Seguridad Informática",                                       credits: 3 },
                    { id: "c58", name: "Arquitectura y Configuración y Gestión de Software",          credits: 3 },
                    { id: "c59", name: "Proyecto de Ingeniería de Software",                          credits: 3 },
                    { id: "c60", name: "Gestión de Emprendimiento de Software",                       credits: 2 },
                    { id: "c61", name: "Ingeniería de Test y Aseguramiento de Calidad (E)",          credits: 3 },
                    { id: "c62", name: "Tópicos Avanzados en Base de Datos (E)",                     credits: 2 },
                    { id: "c63", name: "Ética General y Profesional",                                 credits: 2 }
                ]
            },
            {
                id: 10, name: "X SEMESTRE",
                courses: [
                    { id: "c64", name: "Desarrollo de Software Para Negocios (E)",          credits: 3 },
                    { id: "c65", name: "Plataformas Emergentes (E)",                         credits: 3 },
                    { id: "c66", name: "Tópicos Avanzados en Ingeniería de Software",        credits: 3 },
                    { id: "c67", name: "Prácticas Pre Profesionales",                        credits: 3 },
                    { id: "c68", name: "Seminario de Ingeniería de Software",                credits: 4 },
                    { id: "c69", name: "Seminario de Tesis I",                               credits: 2 },
                    { id: "c70", name: "Gestión de Sistemas de Información (E)",             credits: 4 }
                ]
            }
        ],
        prerequisites: {
            "c8":  ["c2"],          "c9":  ["c4"],          "c10": ["c5"],
            "c11": ["c5"],          "c14": ["c8"],           "c16": ["c9", "c10"],
            "c17": ["c11"],         "c18": ["c12"],          "c20": ["c13"],
            "c21": ["c13"],         "c23": ["c16"],          "c24": ["c16"],
            "c25": ["c17"],         "c28": ["c21"],          "c29": ["c22"],
            "c30": ["c23"],         "c31": ["c23"],          "c32": ["c23"],
            "c33": ["c24"],         "c36": ["c30"],          "c37": ["c30"],
            "c38": ["c32"],         "c39": ["c33"],          "c40": ["c33"],
            "c41": ["c22"],         "c43": ["c38"],          "c44": ["c38"],
            "c45": ["c38"],         "c46": ["c40"],          "c47": ["c26"],
            "c48": ["c43"],         "c50": ["c44"],          "c51": ["c44"],
            "c52": ["c44"],         "c53": ["c46"],          "c54": ["c46"],
            "c55": ["c48"],         "c56": ["c48"],          "c59": ["c52"],
            "c60": ["c47"],         "c61": ["c50"],          "c64": ["c59"],
            "c65": ["c56"],         "c66": ["c59"],          "c67": ["c59"],
            "c68": ["c59"],         "c69": ["c59"],          "c70": ["c59"]
        }
    },

    // ── MALLA 2: Ingeniería en Sistemas ─────────────────────────────────────
    {
        id: "ing-sistemas",
        label: "Ingeniería en Sistemas",
        icon: "🖥️",
        description: "Plan de estudios 2020 · Redes, datos, inteligencia artificial y gestión TI",
        accentPrimary: "#8B5CF6",
        accentSecondary: "#F59E0B",
        semesters: [
            {
                id: 1, name: "I SEMESTRE",
                courses: [
                    { id: "s1",  name: "Cálculo Diferencial",          credits: 4 },
                    { id: "s2",  name: "Álgebra Lineal",               credits: 3 },
                    { id: "s3",  name: "Fundamentos de Programación",  credits: 4 },
                    { id: "s4",  name: "Lógica Matemática",            credits: 3 },
                    { id: "s5",  name: "Comunicación y Expresión",     credits: 2 },
                    { id: "s6",  name: "Introducción a la Ingeniería", credits: 2 }
                ]
            },
            {
                id: 2, name: "II SEMESTRE",
                courses: [
                    { id: "s7",  name: "Cálculo Integral",                        credits: 4 },
                    { id: "s8",  name: "Álgebra Abstracta",                       credits: 3 },
                    { id: "s9",  name: "Programación Orientada a Objetos",        credits: 4 },
                    { id: "s10", name: "Estructuras Discretas",                   credits: 3 },
                    { id: "s11", name: "Física General",                          credits: 3 },
                    { id: "s12", name: "Inglés Técnico I",                        credits: 2 }
                ]
            },
            {
                id: 3, name: "III SEMESTRE",
                courses: [
                    { id: "s13", name: "Cálculo Multivariable",                   credits: 4 },
                    { id: "s14", name: "Estadística y Probabilidad",              credits: 3 },
                    { id: "s15", name: "Estructuras de Datos",                    credits: 4 },
                    { id: "s16", name: "Diseño Orientado a Objetos",              credits: 3 },
                    { id: "s17", name: "Física Computacional",                    credits: 3 },
                    { id: "s18", name: "Inglés Técnico II",                       credits: 2 }
                ]
            },
            {
                id: 4, name: "IV SEMESTRE",
                courses: [
                    { id: "s19", name: "Análisis y Diseño de Algoritmos",         credits: 4 },
                    { id: "s20", name: "Arquitectura de Computadoras",            credits: 3 },
                    { id: "s21", name: "Base de Datos I",                         credits: 4 },
                    { id: "s22", name: "Métodos Numéricos",                       credits: 3 },
                    { id: "s23", name: "Economía para Ingenieros",                credits: 2 },
                    { id: "s24", name: "Inglés Técnico III",                      credits: 2 }
                ]
            },
            {
                id: 5, name: "V SEMESTRE",
                courses: [
                    { id: "s25", name: "Sistemas Operativos",                     credits: 4 },
                    { id: "s26", name: "Redes de Computadoras I",                 credits: 4 },
                    { id: "s27", name: "Base de Datos II",                        credits: 3 },
                    { id: "s28", name: "Ingeniería de Software I",                credits: 3 },
                    { id: "s29", name: "Compiladores e Intérpretes",              credits: 3 },
                    { id: "s30", name: "Gestión Organizacional",                  credits: 2 }
                ]
            },
            {
                id: 6, name: "VI SEMESTRE",
                courses: [
                    { id: "s31", name: "Redes de Computadoras II",                credits: 3 },
                    { id: "s32", name: "Ingeniería de Software II",               credits: 4 },
                    { id: "s33", name: "Inteligencia Artificial",                 credits: 4 },
                    { id: "s34", name: "Seguridad Informática",                   credits: 3 },
                    { id: "s35", name: "Sistemas de Información",                 credits: 3 },
                    { id: "s36", name: "Derecho Informático",                     credits: 2 }
                ]
            },
            {
                id: 7, name: "VII SEMESTRE",
                courses: [
                    { id: "s37", name: "Computación Paralela y Distribuida",      credits: 4 },
                    { id: "s38", name: "Minería de Datos",                        credits: 4 },
                    { id: "s39", name: "Gestión de Proyectos TI",                 credits: 3 },
                    { id: "s40", name: "Arquitectura de Software",                credits: 3 },
                    { id: "s41", name: "Auditoría de Sistemas",                   credits: 3 }
                ]
            },
            {
                id: 8, name: "VIII SEMESTRE",
                courses: [
                    { id: "s42", name: "Cloud Computing",                         credits: 3 },
                    { id: "s43", name: "Desarrollo Web Avanzado",                 credits: 4 },
                    { id: "s44", name: "Análisis de Datos e IA Aplicada",         credits: 4 },
                    { id: "s45", name: "Calidad de Software",                     credits: 3 },
                    { id: "s46", name: "Administración de Proyectos",             credits: 3 }
                ]
            },
            {
                id: 9, name: "IX SEMESTRE",
                courses: [
                    { id: "s47", name: "Práctica Profesional I",                  credits: 4 },
                    { id: "s48", name: "Electiva I (Especialización)",            credits: 3 },
                    { id: "s49", name: "Electiva II (Especialización)",           credits: 3 },
                    { id: "s50", name: "Seminario de Investigación",              credits: 2 },
                    { id: "s51", name: "Electiva III (Especialización)",          credits: 3 }
                ]
            },
            {
                id: 10, name: "X SEMESTRE",
                courses: [
                    { id: "s52", name: "Práctica Profesional II",                         credits: 4 },
                    { id: "s53", name: "Proyecto de Grado",                               credits: 6 },
                    { id: "s54", name: "Ética y Responsabilidad Profesional",             credits: 2 },
                    { id: "s55", name: "Electiva IV (Especialización)",                   credits: 3 }
                ]
            }
        ],
        prerequisites: {
            "s7":  ["s1"],          "s8":  ["s2"],          "s9":  ["s3"],
            "s10": ["s4"],          "s11": ["s1"],          "s13": ["s7"],
            "s14": ["s7"],          "s15": ["s9", "s10"],   "s16": ["s9"],
            "s17": ["s11"],         "s19": ["s15"],         "s20": ["s15"],
            "s21": ["s16"],         "s22": ["s13"],         "s25": ["s20"],
            "s26": ["s20"],         "s27": ["s21"],         "s28": ["s19"],
            "s29": ["s15"],         "s31": ["s26"],         "s32": ["s28"],
            "s33": ["s19"],         "s34": ["s26"],         "s35": ["s27"],
            "s37": ["s25"],         "s38": ["s33", "s27"],  "s39": ["s32"],
            "s40": ["s32"],         "s41": ["s35"],         "s42": ["s31"],
            "s43": ["s32"],         "s44": ["s38"],         "s45": ["s32"],
            "s46": ["s39"],         "s47": ["s45"],         "s50": ["s46"],
            "s52": ["s47"],         "s53": ["s47"]
        }
    }

];
