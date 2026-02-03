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
        window.addEventListener('resize', () => this.drawConnections());
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
            this.completedCourses.delete(courseId);
            this.selectedCourses.delete(courseId);
        } else {
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
        canvas.width = container.scrollWidth;
        canvas.height = container.scrollHeight;

        this.drawConnections();
    }

    drawConnections() {
        const canvas = document.getElementById('connectionsCanvas');
        const ctx = canvas.getContext('2d');

        // Ajustar tamaño del canvas
        const container = document.querySelector('.container');
        canvas.width = container.scrollWidth;
        canvas.height = container.scrollHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

                // Determinar color de la línea
                let color = 'rgba(100, 100, 100, 0.3)';
                if (this.completedCourses.has(prereqId) && this.completedCourses.has(courseId)) {
                    color = 'rgba(76, 175, 80, 0.6)';
                } else if (this.completedCourses.has(prereqId)) {
                    color = 'rgba(33, 150, 243, 0.5)';
                }

                // Dibujar línea curva
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;

                const controlPointX = (fromX + toX) / 2;
                ctx.moveTo(fromX, fromY);
                ctx.bezierCurveTo(
                    controlPointX, fromY,
                    controlPointX, toY,
                    toX, toY
                );
                ctx.stroke();

                // Dibujar flecha
                const arrowSize = 8;
                const angle = Math.atan2(toY - fromY, toX - fromX);
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.moveTo(toX, toY);
                ctx.lineTo(
                    toX - arrowSize * Math.cos(angle - Math.PI / 6),
                    toY - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                    toX - arrowSize * Math.cos(angle + Math.PI / 6),
                    toY - arrowSize * Math.sin(angle + Math.PI / 6)
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
