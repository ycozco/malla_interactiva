# Malla Curricular Interactiva

Una aplicación web interactiva para visualizar y gestionar tu progreso en la malla curricular de Ingeniería de Software.

## 🎯 Características

- ✅ **Visualización completa** de los 10 semestres con todos los cursos
- 🎨 **Interfaz moderna** con tema oscuro y animaciones suaves
- 📊 **Seguimiento de créditos** en tiempo real
- 🔗 **Visualización de prerequisitos** con líneas conectoras
- 💾 **Guardado automático** del progreso en el navegador
- 📥 **Exportación** del progreso como archivo JSON
- 🔒 **Bloqueo automático** de cursos que requieren prerequisitos

## 🚀 Cómo usar

### Abrir la aplicación
Simplemente abre el archivo `index.html` en tu navegador web favorito.

### Interacciones con los cursos

1. **Seleccionar un curso (planificación)**
   - **Click izquierdo** en el curso
   - El curso se marcará en azul
   - Los créditos se sumarán a "Créditos Seleccionados"

2. **Marcar un curso como completado**
   - **Shift + Click izquierdo** en el curso
   - **O Click derecho** en el curso
   - El curso se marcará en verde con un ✓
   - Los créditos se sumarán a "Créditos Completados"
   - ⚠️ **Bloqueo en cascada**: Al desmarcar un curso, todos los cursos que dependen de él se desmarcarán automáticamente

3. **Marcar/desmarcar un semestre completo**
   - **Click en el header del semestre** (título del semestre)
   - Si todos los cursos están completados, se desmarcarán todos (incluyendo dependientes)
   - Si hay cursos sin completar, se marcarán todos los que tengan sus prerequisitos cumplidos
   - Útil para marcar semestres completos de una vez

4. **Ver prerequisitos**
   - **Pasa el mouse** sobre un curso
   - Los prerequisitos se resaltarán en naranja
   - Los cursos que dependen de este se resaltarán en morado

### Panel de estadísticas

En la parte superior verás:
- **Créditos Completados**: Total de créditos de cursos terminados
- **Créditos Seleccionados**: Total de créditos de cursos que planeas tomar
- **Total de Créditos**: Total de créditos de la carrera
- **Progreso**: Porcentaje de avance basado en créditos completados

### Botones de control

- **Limpiar Selección**: Quita todos los cursos seleccionados (azules)
- **Limpiar Completados**: Borra todos los cursos marcados como completados (requiere confirmación)
- **Guardar Progreso**: Guarda tu progreso y descarga un archivo JSON de respaldo
- **Cargar Progreso**: Carga automáticamente el último progreso guardado

### Estados de los cursos

- 🟦 **Azul (Seleccionado)**: Curso que planeas tomar
- 🟩 **Verde (Completado)**: Curso que ya terminaste
- ⬛ **Gris oscuro (Disponible)**: Curso que puedes tomar
- 🔴 **Borde rojo + 🔒 (Bloqueado)**: Curso que requiere completar prerequisitos primero

### Líneas de conexión

Las líneas que conectan los cursos muestran las relaciones de prerequisitos:
- **Gris**: Prerequisito no completado
- **Azul**: Prerequisito completado pero el curso dependiente no
- **Verde**: Ambos cursos completados

## 💡 Consejos

1. **Planifica tu semestre**: Usa la selección (click) para marcar los cursos que tomarás
2. **Actualiza tu progreso**: Marca como completados (shift+click) los cursos que vayas terminando
3. **Guarda regularmente**: Usa el botón "Guardar Progreso" para crear respaldos
4. **Explora prerequisitos**: Pasa el mouse sobre los cursos para ver sus dependencias

## 📱 Responsive

La aplicación es completamente responsive y funciona en:
- 💻 Computadoras de escritorio
- 📱 Tablets
- 📱 Teléfonos móviles

## 🔧 Tecnologías utilizadas

- HTML5
- CSS3 (con variables CSS y animaciones)
- JavaScript vanilla (sin dependencias)
- Canvas API (para dibujar las conexiones)
- LocalStorage API (para persistencia de datos)

## 📝 Notas

- El progreso se guarda automáticamente en el navegador (LocalStorage)
- Los prerequisitos están basados en la lógica típica de la carrera
- Puedes modificar el archivo `data.js` para ajustar cursos, créditos o prerequisitos
- Los cursos marcados con (E) son electivos

## 🎓 Estructura de la carrera

- **Total de semestres**: 10
- **Total de cursos**: 70
- **Total de créditos**: Calculado automáticamente
- **Cursos electivos**: Marcados con (E) en el nombre

---

¡Disfruta gestionando tu malla curricular! 🎉
