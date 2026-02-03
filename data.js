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
    // Relaciones de prerequisitos basadas en el plan de estudios oficial 2013
    // Mapeo: c1=1301101, c2=1301102, c3=1301103, c4=1301104, c5=1301105, c6=1301106, c7=1301107
    // c8=1301201, c9=1301202, c10=1301203, c11=1301204, c12=1301205, c13=1301206
    // c14=1301207, c15=1301208, c16=1301209, c17=1301210, c18=1301211, c19=1301212, c20=1301213, c21=1301214
    // c22=1302215, c23=1302216, c24=1302217, c25=1302218, c26=1302219, c27=1302220, c28=1302221
    // c29=1303125, c30=1303126, c31=1303127, c32=1303128, c33=1303129, c34=1303130
    // c35=1303232, c36=1303233, c37=1303234, c38=1303235, c39=1303236, c40=1303237
    // c41=1304138, c42=1304239, c43=1304240, c44=1304241, c45=1304242, c46=1304243
    // c47=1304244, c48=1304245, c49=1304246, c50=1304247, c51=1304248, c52=1304249, c53=1304250, c54=1304251
    // c55=1305156, c56=1305257, c57=1305258, c58=1305259, c59=1305260, c60=1305261, c61=1305262, c62=1305263, c63=1305264
    // c64=1305160, c65=1305265, c66=1305266, c67=1305267, c68=1305268, c69=1305269, c70=1305159

    prerequisites: {
        // SEGUNDO SEMESTRE
        "c8": ["c2"],        // 1301201: Cálculo en una Variable → 1301102
        "c9": ["c4"],        // 1301202: Estructuras Discretas 2 → 1301104
        "c10": ["c5"],       // 1301203: Fundamentos de Programación 2 → 1301105
        "c11": ["c5"],       // 1301204: Programación Web 1 → 1301105

        // TERCER SEMESTRE
        "c14": ["c8"],       // 1301207: Cálculo en Varias Variables → 1301201
        "c16": ["c9", "c10"], // 1301209: Estructura de Datos y Algoritmos → 1301202, 1301203
        "c17": ["c11"],      // 1301210: Programación Web 2 → 1301204
        "c18": ["c12"],      // 1301211: Talleres de Psicología → 1301205
        "c20": ["c13"],      // 1301213: Ciudadanía e Interculturalidad → 1301206
        "c21": ["c13"],      // 1301214: Redacción de Artículos → 1301206

        // CUARTO SEMESTRE
        "c23": ["c16"],      // 1302216: Arquitectura de Computadoras → 1301209
        "c24": ["c16"],      // 1302217: Análisis y Diseño de Algoritmos → 1301209
        "c25": ["c17"],      // 1302218: Interacción Humano Computador → 1301210
        "c28": ["c21"],      // 1302221: Métodos de Investigación → 1301214

        // QUINTO SEMESTRE
        "c29": ["c22"],      // 1303125: Investigación de Operaciones → 1302215
        "c30": ["c23"],      // 1303126: Programación de Sistemas → 1302216
        "c31": ["c23"],      // 1303127: Teoría de la Computación → 1302216
        "c32": ["c23"],      // 1303128: Ingeniería y Procesos de Software → 1302216
        "c33": ["c24"],      // 1303129: Base de Datos → 1302217

        // SEXTO SEMESTRE
        "c36": ["c30"],      // 1303233: Sistemas Operativos → 1303126
        "c37": ["c30"],      // 1303234: Redes y Comunicación de Datos → 1303126
        "c38": ["c32"],      // 1303235: Construcción de Software → 1303128
        "c39": ["c33"],      // 1303236: Tecnología de Base de Datos → 1303129
        "c40": ["c33"],      // 1303237: Fundamentos de Sistemas de Información → 1303129

        // SÉPTIMO SEMESTRE
        "c41": ["c22"],      // 1304138: Inteligencia Artificial → 1302215
        "c43": ["c38"],      // 1304240: Sistemas Distribuidos → 1303235
        "c44": ["c38"],      // 1304241: Pruebas de Software → 1303235
        "c45": ["c38"],      // 1304242: Ingeniería de Requisitos → 1303235
        "c46": ["c40"],      // 1304243: Tecnología de Información → 1303237

        // OCTAVO SEMESTRE
        "c47": ["c26"],      // 1304244: Introducción al Desarrollo de Emprendimiento → 1302219
        "c48": ["c43"],      // 1304245: Introducción al Desarrollo de Plataformas → 1304240
        "c50": ["c44"],      // 1304247: Calidad de Software → 1304241
        "c51": ["c44"],      // 1304248: Arquitectura de Software → 1304241
        "c52": ["c44"],      // 1304249: Gestión de Proyectos de Software → 1304241
        "c53": ["c46"],      // 1304250: Auditoría de Sistemas y Negocios Electrónicos → 1304243
        "c54": ["c46"],      // 1304251: Auditoría de Sistemas → 1304243

        // NOVENO SEMESTRE
        "c55": ["c48"],      // 1305156: Computación Gráfica / Desarrollo de Multimedia → 1304245
        "c56": ["c48"],      // 1305257: Desarrollo Avanzado de Plataformas → 1304245
        "c59": ["c52"],      // 1305260: Proyecto de Ingeniería de Software → 1304249
        "c60": ["c47"],      // 1305261: Gestión de Emprendimiento de Software → 1304244
        "c61": ["c50"],      // 1305262: Ingeniería de Test → 1304247

        // DÉCIMO SEMESTRE
        "c64": ["c59"],      // 1305160: Desarrollo de Software Para Negocios → 1305260
        "c65": ["c56"],      // 1305265: Plataformas Emergentes → 1305257
        "c66": ["c59"],      // 1305266: Tópicos Avanzados en Ingeniería de Software → 1305260
        "c67": ["c59"],      // 1305267: Prácticas Pre Profesionales → 1305260
        "c68": ["c59"],      // 1305268: Seminario de Ingeniería de Software → 1305260
        "c69": ["c59"],      // 1305269: Seminario de Tesis I → 1305260
        "c70": ["c59"]       // 1305159: Gestión de Sistemas de Información → 1305260
    }
};
