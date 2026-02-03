// Aplicación principal
class CurriculumApp {
    constructor() {
        this.selectedCourses = new Set();
        this.completedCourses = new Set();
        this.courseElements = new Map();
        this.init();
    }

    init() {
        this.renderCurriculum();
        this.loadProgress();
        this.updateStats();
        this.setupCanvas();
        this.setupCanvas();
        // ResizeObserver ya se configura en setupCanvas
    }

    renderCurriculum() {
        const grid = document.getElementById('curriculumGrid');
        grid.innerHTML = '';

        curriculumData.semesters.forEach(semester => {
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester';

            const header = document.createElement('div');
            header.className = 'semester-header';
            header.textContent = semester.name;

            // Agregar evento click al header para marcar/desmarcar todo el semestre
            header.addEventListener('click', () => {
                this.toggleSemesterCompletion(semester);
            });
            header.style.cursor = 'pointer';
            header.title = 'Click para marcar este semestre y todos los anteriores como completados. Click nuevamente para desmarcar solo este semestre.';

            semesterDiv.appendChild(header);

            const coursesContainer = document.createElement('div');
            coursesContainer.className = 'courses-container';

            semester.courses.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course';
                courseDiv.dataset.courseId = course.id;
                courseDiv.id = `course-${course.id}`;

                const courseName = document.createElement('div');
                courseName.className = 'course-name';
                courseName.textContent = course.name;

                const courseCredits = document.createElement('div');
                courseCredits.className = 'course-credits';
                courseCredits.textContent = `${course.credits} créditos`;

                courseDiv.appendChild(courseName);
                courseDiv.appendChild(courseCredits);

                // Botones de acción (visibles en hover o siempre en móvil)
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'course-actions';

                const btnSelect = document.createElement('button');
                btnSelect.className = 'action-btn btn-select';
                btnSelect.innerHTML = '📅'; // Icono de calendario/plan
                btnSelect.title = 'Planificar (Seleccionar)';
                btnSelect.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleSelection(course.id);
                };

                const btnComplete = document.createElement('button');
                btnComplete.className = 'action-btn btn-complete';
                btnComplete.innerHTML = '✓';
                btnComplete.title = 'Marcar como Completado';
                btnComplete.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleCompleted(course.id);
                };

                actionsDiv.appendChild(btnSelect);
                actionsDiv.appendChild(btnComplete);
                courseDiv.appendChild(actionsDiv);

                // Event listeners
                courseDiv.addEventListener('click', (e) => {
                    if (e.shiftKey) {
                        this.toggleCompleted(course.id);
                    } else {
                        this.toggleSelection(course.id);
                    }
                });

                courseDiv.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.toggleCompleted(course.id);
                });

                courseDiv.addEventListener('mouseenter', () => {
                    this.highlightPrerequisites(course.id);
                });

                courseDiv.addEventListener('mouseleave', () => {
                    this.clearHighlights();
                });

                this.courseElements.set(course.id, courseDiv);
                coursesContainer.appendChild(courseDiv);
            });

            semesterDiv.appendChild(coursesContainer);
            grid.appendChild(semesterDiv);
        });

        this.updateCourseStates();
    }

    toggleSelection(courseId) {
        if (this.completedCourses.has(courseId)) {
            return; // No se puede seleccionar un curso completado
        }

        if (this.selectedCourses.has(courseId)) {
            this.selectedCourses.delete(courseId);
        } else {
            this.selectedCourses.add(courseId);
        }

        this.updateCourseStates();
        this.updateStats();
        this.drawConnections();
    }

    toggleCompleted(courseId) {
        if (this.completedCourses.has(courseId)) {
            // Al desmarcar, también desmarcar todos los cursos que dependen de este
            this.completedCourses.delete(courseId);
            this.selectedCourses.delete(courseId);

            // Bloqueo en cascada: desmarcar cursos dependientes
            const dependents = this.getDependentCourses(courseId);
            dependents.forEach(depId => {
                this.completedCourses.delete(depId);
                this.selectedCourses.delete(depId);
            });
        } else {
            // Verificar si el curso está bloqueado
            if (this.isLocked(courseId)) {
                const element = this.courseElements.get(courseId);
                if (element) {
                    // Reiniciar animación si ya estaba activa
                    element.classList.remove('shake');
                    void element.offsetWidth; // Trigger reflow
                    element.classList.add('shake');

                    // Remover clase después de la animación
                    setTimeout(() => element.classList.remove('shake'), 500);
                }
                console.log(`Curso ${courseId} bloqueado por prerequisitos`);
                return;
            }

            this.completedCourses.add(courseId);
            this.selectedCourses.delete(courseId);
        }

        this.updateCourseStates();
        this.updateStats();
        this.drawConnections();
    }

    updateCourseStates() {
        this.courseElements.forEach((element, courseId) => {
            element.classList.remove('selected', 'completed', 'locked', 'available');

            if (this.completedCourses.has(courseId)) {
                element.classList.add('completed');
            } else if (this.selectedCourses.has(courseId)) {
                element.classList.add('selected');
            } else if (this.isLocked(courseId)) {
                element.classList.add('locked');
            } else {
                element.classList.add('available');
            }
        });
    }

    isLocked(courseId) {
        const prerequisites = curriculumData.prerequisites[courseId];
        if (!prerequisites) return false;

        return prerequisites.some(prereq => !this.completedCourses.has(prereq));
    }

    highlightPrerequisites(courseId) {
        const prerequisites = curriculumData.prerequisites[courseId];
        if (prerequisites) {
            prerequisites.forEach(prereqId => {
                const element = this.courseElements.get(prereqId);
                if (element) {
                    element.classList.add('prerequisite-highlight');
                }
            });
        }

        // También resaltar cursos que dependen de este
        Object.entries(curriculumData.prerequisites).forEach(([id, prereqs]) => {
            if (prereqs.includes(courseId)) {
                const element = this.courseElements.get(id);
                if (element) {
                    element.classList.add('dependent-highlight');
                }
            }
        });
    }

    clearHighlights() {
        this.courseElements.forEach(element => {
            element.classList.remove('prerequisite-highlight', 'dependent-highlight');
        });
    }

    getCourseById(courseId) {
        for (const semester of curriculumData.semesters) {
            const course = semester.courses.find(c => c.id === courseId);
            if (course) return course;
        }
        return null;
    }

    // Obtener todos los cursos que dependen de un curso dado (recursivamente)
    getDependentCourses(courseId) {
        const dependents = new Set();

        const findDependents = (id) => {
            Object.entries(curriculumData.prerequisites).forEach(([depId, prereqs]) => {
                if (prereqs.includes(id) && !dependents.has(depId)) {
                    dependents.add(depId);
                    // Recursivamente encontrar dependientes de este curso
                    findDependents(depId);
                }
            });
        };

        findDependents(courseId);
        return Array.from(dependents);
    }

    // Marcar/desmarcar todos los cursos de un semestre como completados
    toggleSemesterCompletion(semester) {
        const semesterCourseIds = semester.courses.map(c => c.id);

        // Verificar si todos los cursos del semestre están completados
        const allCompleted = semesterCourseIds.every(id => this.completedCourses.has(id));

        if (allCompleted) {
            // DESMARCAR: Solo desmarcar este semestre específico
            semesterCourseIds.forEach(courseId => {
                this.completedCourses.delete(courseId);
                this.selectedCourses.delete(courseId);
            });

            // Desmarcar todos los semestres POSTERIORES (que dependen de este)
            const currentSemesterIndex = curriculumData.semesters.findIndex(s => s.id === semester.id);
            for (let i = currentSemesterIndex + 1; i < curriculumData.semesters.length; i++) {
                curriculumData.semesters[i].courses.forEach(course => {
                    this.completedCourses.delete(course.id);
                    this.selectedCourses.delete(course.id);
                });
            }
        } else {
            // MARCAR: Marcar este semestre Y todos los anteriores
            const currentSemesterIndex = curriculumData.semesters.findIndex(s => s.id === semester.id);

            // Marcar todos los semestres desde el primero hasta el actual (inclusive)
            for (let i = 0; i <= currentSemesterIndex; i++) {
                curriculumData.semesters[i].courses.forEach(course => {
                    this.completedCourses.add(course.id);
                    this.selectedCourses.delete(course.id);
                });
            }
        }

        this.updateCourseStates();
        this.updateStats();
        this.drawConnections();
    }

    updateStats() {
        let totalCredits = 0;
        let completedCredits = 0;
        let selectedCredits = 0;

        curriculumData.semesters.forEach(semester => {
            semester.courses.forEach(course => {
                totalCredits += course.credits;

                if (this.completedCourses.has(course.id)) {
                    completedCredits += course.credits;
                } else if (this.selectedCourses.has(course.id)) {
                    selectedCredits += course.credits;
                }
            });
        });

        document.getElementById('totalCredits').textContent = totalCredits;
        document.getElementById('completedCredits').textContent = completedCredits;
        document.getElementById('selectedCredits').textContent = selectedCredits;

        const progress = ((completedCredits / totalCredits) * 100).toFixed(1);
        document.getElementById('progress').textContent = `${progress}%`;
    }

    setupCanvas() {
        const canvas = document.getElementById('connectionsCanvas');
        const container = document.querySelector('.container');

        const resizeCanvas = () => {
            canvas.width = container.scrollWidth;
            canvas.height = container.scrollHeight;
            this.drawConnections();
        };

        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(container);

        resizeCanvas();
    }

    drawConnections() {
        const canvas = document.getElementById('connectionsCanvas');
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.container');

        // Ajustar tamaño del canvas
        canvas.width = container.scrollWidth;
        canvas.height = container.scrollHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Estilos de conexión
        const styles = {
            default: { color: 'rgba(120, 144, 156, 0.3)', width: 1.5 },
            active: { color: 'rgba(33, 150, 243, 0.6)', width: 2.5 },
            completed: { color: 'rgba(76, 175, 80, 0.8)', width: 2.5 },
            locked: { color: 'rgba(244, 67, 54, 0.5)', width: 2 }
        };

        Object.entries(curriculumData.prerequisites).forEach(([courseId, prerequisites]) => {
            const courseElement = this.courseElements.get(courseId);
            if (!courseElement) return;

            prerequisites.forEach(prereqId => {
                const prereqElement = this.courseElements.get(prereqId);
                if (!prereqElement) return;

                const fromRect = prereqElement.getBoundingClientRect();
                const toRect = courseElement.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const fromX = fromRect.right - containerRect.left;
                const fromY = fromRect.top + fromRect.height / 2 - containerRect.top + window.scrollY;
                const toX = toRect.left - containerRect.left;
                const toY = toRect.top + toRect.height / 2 - containerRect.top + window.scrollY;

                // Determinar estilo
                let style = styles.default;

                if (this.completedCourses.has(prereqId) && this.completedCourses.has(courseId)) {
                    style = styles.completed;
                } else if (this.completedCourses.has(prereqId)) {
                    style = styles.active;
                } else if (this.isLocked(courseId)) {
                    style = styles.locked;
                }

                // Dibujar línea curva
                ctx.beginPath();
                ctx.strokeStyle = style.color;
                ctx.lineWidth = style.width;

                const controlPointX = fromX + (toX - fromX) * 0.5;

                ctx.moveTo(fromX, fromY);
                ctx.bezierCurveTo(
                    controlPointX, fromY,
                    controlPointX, toY,
                    toX, toY
                );
                ctx.stroke();

                // Dibujar flecha (apuntando al curso destino)
                const arrowSize = 8;

                ctx.beginPath();
                ctx.fillStyle = style.color;

                ctx.moveTo(toX, toY);
                ctx.lineTo(
                    toX - arrowSize,
                    toY - arrowSize / 2
                );
                ctx.lineTo(
                    toX - arrowSize,
                    toY + arrowSize / 2
                );
                ctx.closePath();
                ctx.fill();
            });
        });
    }

    clearSelection() {
        this.selectedCourses.clear();
        this.updateCourseStates();
        this.updateStats();
        this.drawConnections();
    }

    clearCompleted() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los cursos completados?')) {
            this.completedCourses.clear();
            this.updateCourseStates();
            this.updateStats();
            this.drawConnections();
        }
    }

    saveProgress() {
        const data = {
            completed: Array.from(this.completedCourses),
            selected: Array.from(this.selectedCourses),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('curriculumProgress', JSON.stringify(data));

        // También guardar como archivo descargable
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `progreso_malla_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        alert('Progreso guardado exitosamente');
    }

    loadProgress() {
        const saved = localStorage.getItem('curriculumProgress');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.completedCourses = new Set(data.completed || []);
                this.selectedCourses = new Set(data.selected || []);
                this.updateCourseStates();
                this.updateStats();
                this.drawConnections();
            } catch (e) {
                console.error('Error al cargar progreso:', e);
            }
        }
    }
}

// Inicializar la aplicación
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CurriculumApp();
});
