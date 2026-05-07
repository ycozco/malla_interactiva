class CurriculumApp {
    constructor() {
        this.selectedCourses = new Set();
        this.completedCourses = new Set();
        this.courseElements = new Map();
        this.semesterHeaders = new Map();
        this.init();
    }

    init() {
        this.renderCurriculum();
        this.loadProgress();
        this.updateStats();
        this.setupCanvas();
    }

    renderCurriculum() {
        const grid = document.getElementById('curriculumGrid');
        grid.innerHTML = '';

        curriculumData.semesters.forEach(semester => {
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester';

            const header = document.createElement('div');
            header.className = 'semester-header';
            header.style.cursor = 'pointer';
            header.title = 'Click para marcar este semestre y todos los anteriores como completados. Click nuevamente para desmarcar.';

            const headerTitle = document.createElement('span');
            headerTitle.textContent = semester.name;

            const badge = document.createElement('span');
            badge.className = 'semester-badge';
            badge.textContent = `0 / ${semester.courses.length} completados`;

            header.appendChild(headerTitle);
            header.appendChild(badge);

            header.addEventListener('click', () => {
                this.toggleSemesterCompletion(semester);
            });

            this.semesterHeaders.set(semester.id, badge);
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
                courseCredits.textContent = `${course.credits} crédito${course.credits !== 1 ? 's' : ''}`;

                courseDiv.appendChild(courseName);
                courseDiv.appendChild(courseCredits);

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'course-actions';

                const btnSelect = document.createElement('button');
                btnSelect.className = 'action-btn btn-select';
                btnSelect.innerHTML = '📅';
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
        if (this.completedCourses.has(courseId)) return;

        if (this.isLocked(courseId)) {
            this._shake(courseId);
            return;
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

            const dependents = this.getDependentCourses(courseId);
            dependents.forEach(depId => {
                this.completedCourses.delete(depId);
                this.selectedCourses.delete(depId);
            });
        } else {
            if (this.isLocked(courseId)) {
                this._shake(courseId);
                return;
            }
            this.completedCourses.add(courseId);
            this.selectedCourses.delete(courseId);
        }

        this.updateCourseStates();
        this.updateStats();
        this.drawConnections();
    }

    _shake(courseId) {
        const element = this.courseElements.get(courseId);
        if (!element) return;
        element.classList.remove('shake');
        void element.offsetWidth;
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
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

        this.updateSemesterBadges();
    }

    updateSemesterBadges() {
        curriculumData.semesters.forEach(semester => {
            const badge = this.semesterHeaders.get(semester.id);
            if (!badge) return;

            const total = semester.courses.length;
            const done = semester.courses.filter(c => this.completedCourses.has(c.id)).length;

            badge.textContent = `${done} / ${total} completado${done !== 1 ? 's' : ''}`;
            badge.classList.toggle('all-done', done === total);
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
                if (element) element.classList.add('prerequisite-highlight');
            });
        }

        Object.entries(curriculumData.prerequisites).forEach(([id, prereqs]) => {
            if (prereqs.includes(courseId)) {
                const element = this.courseElements.get(id);
                if (element) element.classList.add('dependent-highlight');
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

    getDependentCourses(courseId) {
        const dependents = new Set();

        const findDependents = (id) => {
            Object.entries(curriculumData.prerequisites).forEach(([depId, prereqs]) => {
                if (prereqs.includes(id) && !dependents.has(depId)) {
                    dependents.add(depId);
                    findDependents(depId);
                }
            });
        };

        findDependents(courseId);
        return Array.from(dependents);
    }

    toggleSemesterCompletion(semester) {
        const semesterCourseIds = semester.courses.map(c => c.id);
        const allCompleted = semesterCourseIds.every(id => this.completedCourses.has(id));

        if (allCompleted) {
            semesterCourseIds.forEach(courseId => {
                this.completedCourses.delete(courseId);
                this.selectedCourses.delete(courseId);
            });

            const currentIndex = curriculumData.semesters.findIndex(s => s.id === semester.id);
            for (let i = currentIndex + 1; i < curriculumData.semesters.length; i++) {
                curriculumData.semesters[i].courses.forEach(course => {
                    this.completedCourses.delete(course.id);
                    this.selectedCourses.delete(course.id);
                });
            }
        } else {
            const currentIndex = curriculumData.semesters.findIndex(s => s.id === semester.id);

            for (let i = 0; i <= currentIndex; i++) {
                curriculumData.semesters[i].courses.forEach(course => {
                    if (!this.isLocked(course.id)) {
                        this.completedCourses.add(course.id);
                        this.selectedCourses.delete(course.id);
                    }
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

        const pct = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;
        document.getElementById('progress').textContent = `${pct.toFixed(1)}%`;

        const bar = document.getElementById('progressBarFill');
        if (bar) bar.style.width = `${pct}%`;
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
        if (!canvas || canvas.style.display === 'none') return;

        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.container');

        canvas.width = container.scrollWidth;
        canvas.height = container.scrollHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const styles = {
            default:  { color: 'rgba(120, 144, 156, 0.3)', width: 1.5, dash: [] },
            active:   { color: 'rgba(33, 150, 243, 0.6)',  width: 2.5, dash: [] },
            completed:{ color: 'rgba(76, 175, 80, 0.8)',   width: 2.5, dash: [] },
            locked:   { color: 'rgba(244, 67, 54, 0.5)',   width: 2,   dash: [] },
            planning: { color: 'rgba(33, 150, 243, 1)',     width: 2.5, dash: [6, 4] }
        };

        const containerRect = container.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        Object.entries(curriculumData.prerequisites).forEach(([courseId, prerequisites]) => {
            const courseElement = this.courseElements.get(courseId);
            if (!courseElement) return;

            prerequisites.forEach(prereqId => {
                const prereqElement = this.courseElements.get(prereqId);
                if (!prereqElement) return;

                const fromRect = prereqElement.getBoundingClientRect();
                const toRect = courseElement.getBoundingClientRect();

                const fromX = fromRect.right  - containerRect.left + scrollX;
                const fromY = fromRect.top + fromRect.height / 2 - containerRect.top + scrollY;
                const toX   = toRect.left    - containerRect.left + scrollX;
                const toY   = toRect.top   + toRect.height   / 2 - containerRect.top + scrollY;

                let style = styles.default;
                if (this.completedCourses.has(prereqId) && this.completedCourses.has(courseId)) {
                    style = styles.completed;
                } else if (this.completedCourses.has(prereqId)) {
                    style = styles.active;
                } else if (this.selectedCourses.has(prereqId)) {
                    style = styles.planning;
                } else if (this.isLocked(courseId)) {
                    style = styles.locked;
                }

                ctx.beginPath();
                ctx.strokeStyle = style.color;
                ctx.lineWidth = style.width;
                ctx.setLineDash(style.dash || []);

                const cpX = fromX + (toX - fromX) * 0.5;
                ctx.moveTo(fromX, fromY);
                ctx.bezierCurveTo(cpX, fromY, cpX, toY, toX, toY);
                ctx.stroke();

                ctx.setLineDash([]);
                const arrowSize = 8;
                ctx.beginPath();
                ctx.fillStyle = style.color;
                ctx.moveTo(toX, toY);
                ctx.lineTo(toX - arrowSize, toY - arrowSize / 2);
                ctx.lineTo(toX - arrowSize, toY + arrowSize / 2);
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
        this.showToast('Selección limpiada', 'info');
    }

    clearCompleted() {
        if (this.completedCourses.size === 0) {
            this.showToast('No hay cursos completados para limpiar', 'warning');
            return;
        }
        if (confirm('¿Estás seguro de que quieres limpiar todos los cursos completados?')) {
            this.completedCourses.clear();
            this.updateCourseStates();
            this.updateStats();
            this.drawConnections();
            this.showToast('Cursos completados limpiados', 'info');
        }
    }

    saveProgress() {
        const data = {
            completed: Array.from(this.completedCourses),
            selected: Array.from(this.selectedCourses),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('curriculumProgress', JSON.stringify(data));

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `progreso_malla_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showToast('Progreso guardado exitosamente', 'success');
    }

    loadProgress() {
        const saved = localStorage.getItem('curriculumProgress');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.completedCourses = new Set(data.completed || []);
                this.selectedCourses  = new Set(data.selected  || []);
                this.updateCourseStates();
                this.updateStats();
                this.drawConnections();
            } catch (e) {
                console.error('Error al cargar progreso:', e);
            }
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, duration);
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CurriculumApp();
});
