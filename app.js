class CurriculumApp {
    constructor() {
        this.currentMalla   = null;
        this.selectedCourses  = new Set();
        this.completedCourses = new Set();
        this.courseElements   = new Map();
        this.semesterHeaders  = new Map();
        this._canvasObserver  = null;
        this.init();
    }

    // ── Inicialización ─────────────────────────────────────────────────
    init() {
        this._setupFileInput();
        this._setupCanvas();

        const lastId = localStorage.getItem('lastMallaId');
        const found  = lastId && mallasData.find(m => m.id === lastId);

        if (found) {
            this.selectMalla(lastId);
        } else {
            this.showMallaSelector();
        }
    }

    // ── Selector de malla ──────────────────────────────────────────────
    showMallaSelector() {
        this._renderMallaCards();
        const overlay = document.getElementById('mallaOverlay');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    hideMallaSelector() {
        const overlay = document.getElementById('mallaOverlay');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    _renderMallaCards() {
        const grid = document.getElementById('mallaCardsGrid');
        grid.innerHTML = '';

        mallasData.forEach(malla => {
            const progress = this._getMallaProgress(malla.id);
            const totalCourses  = malla.semesters.reduce((a, s) => a + s.courses.length, 0);
            const totalCredits  = malla.semesters.reduce((a, s) =>
                a + s.courses.reduce((b, c) => b + c.credits, 0), 0);

            const card = document.createElement('div');
            card.className = 'malla-card' + (this.currentMalla?.id === malla.id ? ' active' : '');
            card.style.setProperty('--card-accent', malla.accentPrimary);

            card.innerHTML = `
                <div class="malla-card-icon">${malla.icon}</div>
                <div class="malla-card-name">${malla.label}</div>
                <div class="malla-card-desc">${malla.description}</div>
                <div class="malla-card-meta">
                    <span class="malla-meta-chip">${malla.semesters.length} semestres</span>
                    <span class="malla-meta-chip">${totalCourses} cursos</span>
                    <span class="malla-meta-chip">${totalCredits} créditos</span>
                </div>
                ${progress ? `
                <div class="malla-card-progress">
                    <div class="malla-progress-label">
                        <span>Progreso guardado</span>
                        <span>${progress.pct}%</span>
                    </div>
                    <div class="malla-progress-track">
                        <div class="malla-progress-fill" style="width:${progress.pct}%; background:${malla.accentPrimary}"></div>
                    </div>
                </div>` : ''}
            `;

            card.addEventListener('click', () => this.selectMalla(malla.id));
            grid.appendChild(card);
        });
    }

    selectMalla(mallaId) {
        const malla = mallasData.find(m => m.id === mallaId);
        if (!malla) return;

        this.currentMalla = malla;
        this.selectedCourses.clear();
        this.completedCourses.clear();
        this.courseElements.clear();
        this.semesterHeaders.clear();

        localStorage.setItem('lastMallaId', mallaId);

        // Actualizar barra de malla activa
        document.getElementById('currentMallaIcon').textContent = malla.icon;
        document.getElementById('currentMallaName').textContent = malla.label;
        document.documentElement.style.setProperty('--primary',        malla.accentPrimary);
        document.documentElement.style.setProperty('--primary-dark',   this._darken(malla.accentPrimary));
        document.documentElement.style.setProperty('--primary-glow',   malla.accentPrimary + '40');
        document.documentElement.style.setProperty('--secondary',      malla.accentSecondary);
        document.documentElement.style.setProperty('--secondary-dark', this._darken(malla.accentSecondary));
        document.documentElement.style.setProperty('--secondary-glow', malla.accentSecondary + '40');

        this.hideMallaSelector();
        this.renderCurriculum();
        this._autoLoad();
        this.updateStats();
        this.drawConnections();
    }

    _getMallaProgress(mallaId) {
        const raw = localStorage.getItem(`progress_${mallaId}`);
        if (!raw) return null;
        try {
            const data    = JSON.parse(raw);
            const done    = new Set(data.completed || []);
            const malla   = mallasData.find(m => m.id === mallaId);
            if (!malla) return null;
            let total = 0, completedCredits = 0;
            malla.semesters.forEach(s => s.courses.forEach(c => {
                total += c.credits;
                if (done.has(c.id)) completedCredits += c.credits;
            }));
            return { pct: total ? Math.round((completedCredits / total) * 100) : 0 };
        } catch { return null; }
    }

    // Convierte un color hex a una versión más oscura (simplificado)
    _darken(hex) {
        const n = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, (n >> 16) - 30);
        const g = Math.max(0, ((n >> 8) & 0xff) - 30);
        const b = Math.max(0, (n & 0xff) - 30);
        return `#${[r,g,b].map(x => x.toString(16).padStart(2,'0')).join('')}`;
    }

    // ── Renderizado ────────────────────────────────────────────────────
    renderCurriculum() {
        const grid = document.getElementById('curriculumGrid');
        grid.innerHTML = '';

        this.currentMalla.semesters.forEach(semester => {
            const semDiv = document.createElement('div');
            semDiv.className = 'semester';

            const header = document.createElement('div');
            header.className = 'semester-header';
            header.title = 'Click: marcar semestre y anteriores. Doble click: desmarcar.';
            header.style.cursor = 'pointer';

            const title = document.createElement('span');
            title.textContent = semester.name;

            const badge = document.createElement('span');
            badge.className = 'semester-badge';
            badge.textContent = `0 / ${semester.courses.length} completados`;

            header.appendChild(title);
            header.appendChild(badge);
            header.addEventListener('click', () => this.toggleSemesterCompletion(semester));
            this.semesterHeaders.set(semester.id, badge);
            semDiv.appendChild(header);

            const coursesContainer = document.createElement('div');
            coursesContainer.className = 'courses-container';

            semester.courses.forEach((course, courseIndex) => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course';
                courseDiv.id = `course-${course.id}`;
                courseDiv.dataset.courseId = course.id;

                const nameEl    = document.createElement('div');
                nameEl.className = 'course-name';
                nameEl.textContent = course.name;

                const credEl   = document.createElement('div');
                credEl.className = 'course-credits';
                credEl.textContent = `${course.credits} crédito${course.credits !== 1 ? 's' : ''}`;

                const actions  = document.createElement('div');
                actions.className = 'course-actions';

                const btnSel   = document.createElement('button');
                btnSel.className = 'action-btn btn-select';
                btnSel.innerHTML = '📅';
                btnSel.title = 'Planificar';
                btnSel.onclick = e => { e.stopPropagation(); this.toggleSelection(course.id); };

                const btnDone  = document.createElement('button');
                btnDone.className = 'action-btn btn-complete';
                btnDone.innerHTML = '✓';
                btnDone.title = 'Marcar completado';
                btnDone.onclick = e => { e.stopPropagation(); this.toggleCompleted(course.id); };

                actions.appendChild(btnSel);
                actions.appendChild(btnDone);
                courseDiv.append(nameEl, credEl, actions);

                courseDiv.addEventListener('click', e => {
                    if (e.shiftKey) this.toggleCompleted(course.id);
                    else            this.toggleSelection(course.id);
                });
                courseDiv.addEventListener('contextmenu', e => {
                    e.preventDefault(); this.toggleCompleted(course.id);
                });
                courseDiv.addEventListener('mouseenter', () => this.highlightPrerequisites(course.id));
                courseDiv.addEventListener('mouseleave', () => this.clearHighlights());

                courseDiv.style.animationDelay = `${courseIndex * 25}ms`;
                this.courseElements.set(course.id, courseDiv);
                coursesContainer.appendChild(courseDiv);
            });

            semDiv.appendChild(coursesContainer);
            grid.appendChild(semDiv);
        });

        this.updateCourseStates();
    }

    // ── Estado de cursos ───────────────────────────────────────────────
    toggleSelection(courseId) {
        if (this.completedCourses.has(courseId)) return;
        if (this.isLocked(courseId)) { this._shake(courseId); return; }

        this.selectedCourses[this.selectedCourses.has(courseId) ? 'delete' : 'add'](courseId);
        this._commit();
    }

    toggleCompleted(courseId) {
        if (this.completedCourses.has(courseId)) {
            this.completedCourses.delete(courseId);
            this.selectedCourses.delete(courseId);
            this.getDependentCourses(courseId).forEach(id => {
                this.completedCourses.delete(id);
                this.selectedCourses.delete(id);
            });
        } else {
            if (this.isLocked(courseId)) { this._shake(courseId); return; }
            this.completedCourses.add(courseId);
            this.selectedCourses.delete(courseId);
        }
        this._commit();
    }

    toggleSemesterCompletion(semester) {
        const ids = semester.courses.map(c => c.id);
        const allDone = ids.every(id => this.completedCourses.has(id));
        const idx = this.currentMalla.semesters.findIndex(s => s.id === semester.id);

        if (allDone) {
            ids.forEach(id => { this.completedCourses.delete(id); this.selectedCourses.delete(id); });
            for (let i = idx + 1; i < this.currentMalla.semesters.length; i++) {
                this.currentMalla.semesters[i].courses.forEach(c => {
                    this.completedCourses.delete(c.id); this.selectedCourses.delete(c.id);
                });
            }
        } else {
            for (let i = 0; i <= idx; i++) {
                this.currentMalla.semesters[i].courses.forEach(c => {
                    if (!this.isLocked(c.id)) {
                        this.completedCourses.add(c.id); this.selectedCourses.delete(c.id);
                    }
                });
            }
        }
        this._commit();
    }

    _commit() {
        this.updateCourseStates();
        this.updateStats();
        this.drawConnections();
        this._autoSave();
    }

    updateCourseStates() {
        this.courseElements.forEach((el, id) => {
            el.classList.remove('selected', 'completed', 'locked', 'available');
            if      (this.completedCourses.has(id)) el.classList.add('completed');
            else if (this.selectedCourses.has(id))  el.classList.add('selected');
            else if (this.isLocked(id))             el.classList.add('locked');
            else                                     el.classList.add('available');
        });
        this._updateSemesterBadges();
    }

    _updateSemesterBadges() {
        this.currentMalla.semesters.forEach(sem => {
            const badge = this.semesterHeaders.get(sem.id);
            if (!badge) return;
            const done  = sem.courses.filter(c => this.completedCourses.has(c.id)).length;
            const total = sem.courses.length;
            badge.textContent = `${done} / ${total} completado${done !== 1 ? 's' : ''}`;
            badge.classList.toggle('all-done', done === total);
        });
    }

    isLocked(courseId) {
        const prereqs = this.currentMalla.prerequisites[courseId];
        return prereqs ? prereqs.some(p => !this.completedCourses.has(p)) : false;
    }

    getDependentCourses(courseId) {
        const deps = new Set();
        const walk = id => {
            Object.entries(this.currentMalla.prerequisites).forEach(([dep, prereqs]) => {
                if (prereqs.includes(id) && !deps.has(dep)) {
                    deps.add(dep); walk(dep);
                }
            });
        };
        walk(courseId);
        return Array.from(deps);
    }

    highlightPrerequisites(courseId) {
        (this.currentMalla.prerequisites[courseId] || []).forEach(pid => {
            this.courseElements.get(pid)?.classList.add('prerequisite-highlight');
        });
        Object.entries(this.currentMalla.prerequisites).forEach(([id, prereqs]) => {
            if (prereqs.includes(courseId))
                this.courseElements.get(id)?.classList.add('dependent-highlight');
        });
    }

    clearHighlights() {
        this.courseElements.forEach(el =>
            el.classList.remove('prerequisite-highlight', 'dependent-highlight'));
    }

    // ── Estadísticas ───────────────────────────────────────────────────
    updateStats() {
        let total = 0, done = 0, sel = 0;
        this.currentMalla.semesters.forEach(s => s.courses.forEach(c => {
            total += c.credits;
            if (this.completedCourses.has(c.id))     done += c.credits;
            else if (this.selectedCourses.has(c.id)) sel  += c.credits;
        }));

        document.getElementById('totalCredits').textContent     = total;
        document.getElementById('completedCredits').textContent = done;
        document.getElementById('selectedCredits').textContent  = sel;

        const pct = total ? ((done / total) * 100).toFixed(1) : '0.0';
        document.getElementById('progress').textContent = `${pct}%`;
        const bar = document.getElementById('progressBarFill');
        if (bar) bar.style.width = `${pct}%`;
    }

    // ── Canvas ─────────────────────────────────────────────────────────
    _setupCanvas() {
        const canvas    = document.getElementById('connectionsCanvas');
        const container = document.querySelector('.container');

        this._canvasObserver = new ResizeObserver(() => {
            canvas.width  = container.scrollWidth;
            canvas.height = container.scrollHeight;
            this.drawConnections();
        });
        this._canvasObserver.observe(container);
    }

    drawConnections() {
        if (!this.currentMalla) return;
        const canvas    = document.getElementById('connectionsCanvas');
        if (!canvas || canvas.style.display === 'none') return;

        const ctx       = canvas.getContext('2d');
        const container = document.querySelector('.container');
        canvas.width    = container.scrollWidth;
        canvas.height   = container.scrollHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const styles = {
            default:   { color: 'rgba(120,144,156,0.3)', width: 1.5, dash: [] },
            active:    { color: 'rgba(74,144,232,0.6)',  width: 2.5, dash: [] },
            completed: { color: 'rgba(26,201,122,0.8)',  width: 2.5, dash: [] },
            locked:    { color: 'rgba(255,92,92,0.5)',   width: 2,   dash: [] },
            planning:  { color: 'rgba(74,144,232,1)',    width: 2.5, dash: [6,4] }
        };

        const cr  = container.getBoundingClientRect();
        const sx  = window.scrollX;
        const sy  = window.scrollY;

        Object.entries(this.currentMalla.prerequisites).forEach(([courseId, prereqs]) => {
            const toEl = this.courseElements.get(courseId);
            if (!toEl) return;
            prereqs.forEach(pid => {
                const fromEl = this.courseElements.get(pid);
                if (!fromEl) return;

                const fr   = fromEl.getBoundingClientRect();
                const tr   = toEl.getBoundingClientRect();
                const fromX = fr.right  - cr.left + sx;
                const fromY = fr.top + fr.height / 2 - cr.top + sy;
                const toX   = tr.left   - cr.left + sx;
                const toY   = tr.top + tr.height / 2 - cr.top + sy;

                let style = styles.default;
                if (this.completedCourses.has(pid) && this.completedCourses.has(courseId)) style = styles.completed;
                else if (this.completedCourses.has(pid))   style = styles.active;
                else if (this.selectedCourses.has(pid))    style = styles.planning;
                else if (this.isLocked(courseId))          style = styles.locked;

                const cpX = fromX + (toX - fromX) * 0.5;
                ctx.beginPath();
                ctx.strokeStyle = style.color;
                ctx.lineWidth   = style.width;
                ctx.setLineDash(style.dash);
                ctx.moveTo(fromX, fromY);
                ctx.bezierCurveTo(cpX, fromY, cpX, toY, toX, toY);
                ctx.stroke();

                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.fillStyle = style.color;
                ctx.moveTo(toX, toY);
                ctx.lineTo(toX - 8, toY - 4);
                ctx.lineTo(toX - 8, toY + 4);
                ctx.closePath();
                ctx.fill();
            });
        });
    }

    // ── Persistencia ───────────────────────────────────────────────────
    _storageKey() {
        return `progress_${this.currentMalla.id}`;
    }

    _autoSave() {
        localStorage.setItem(this._storageKey(), JSON.stringify({
            completed: Array.from(this.completedCourses),
            selected:  Array.from(this.selectedCourses),
            mallaId:   this.currentMalla.id,
            timestamp: new Date().toISOString()
        }));
    }

    _autoLoad() {
        const raw = localStorage.getItem(this._storageKey());
        if (!raw) return;
        try {
            const data = JSON.parse(raw);
            this.completedCourses = new Set(data.completed || []);
            this.selectedCourses  = new Set(data.selected  || []);
            this.updateCourseStates();
        } catch (e) {
            console.error('Error cargando progreso:', e);
        }
    }

    saveProgress() {
        this._autoSave();
        const data = {
            completed: Array.from(this.completedCourses),
            selected:  Array.from(this.selectedCourses),
            mallaId:   this.currentMalla.id,
            mallaLabel: this.currentMalla.label,
            timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `malla_${this.currentMalla.id}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Progreso guardado y descargado', 'success');
    }

    loadFromFile() {
        document.getElementById('fileInput').click();
    }

    _setupFileInput() {
        document.getElementById('fileInput').addEventListener('change', e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (data.mallaId && data.mallaId !== this.currentMalla?.id) {
                        const malla = mallasData.find(m => m.id === data.mallaId);
                        if (malla) this.selectMalla(data.mallaId);
                    }
                    this.completedCourses = new Set(data.completed || []);
                    this.selectedCourses  = new Set(data.selected  || []);
                    this._commit();
                    this.showToast('Progreso cargado desde archivo', 'success');
                } catch {
                    this.showToast('Error al leer el archivo JSON', 'error');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });
    }

    clearSelection() {
        this.selectedCourses.clear();
        this._commit();
        this.showToast('Selección limpiada', 'info');
    }

    clearCompleted() {
        if (this.completedCourses.size === 0) {
            this.showToast('No hay cursos completados', 'warning');
            return;
        }
        if (confirm('¿Limpiar todos los cursos completados?')) {
            this.completedCourses.clear();
            this._commit();
            this.showToast('Completados limpiados', 'info');
        }
    }

    // ── Utilidades ─────────────────────────────────────────────────────
    _shake(courseId) {
        const el = this.courseElements.get(courseId);
        if (!el) return;
        el.classList.remove('shake');
        void el.offsetWidth;
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 450);
    }

    showToast(msg, type = 'info', ms = 3000) {
        const ct    = document.getElementById('toastContainer');
        if (!ct) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = msg;
        ct.appendChild(toast);
        requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, ms);
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => { app = new CurriculumApp(); });
