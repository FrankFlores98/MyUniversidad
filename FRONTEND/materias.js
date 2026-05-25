/* ============================================
   MATERIAS JS - MI UNIVERSIDAD
   ============================================ */

// Obtener datos del usuario
const userRol = localStorage.getItem('userRol') || 'alumno';
const userNombre = localStorage.getItem('userNombre') || 'Usuario';
const userMatricula = localStorage.getItem('userMatricula') || '000000';

// Variables globales
let materias = [];
let materiasDisponibles = [];
let selectedMaterias = [];

// ============================================
// INICIALIZAR SEGÚN ROL
// ============================================
function init() {
    checkAuth();
    
    if (userRol === 'alumno') {
        initAlumno();
    } else if (userRol === 'maestro') {
        initMaestro();
    } else {
        // Para administrativo/directivo, mostrar mensaje
        document.getElementById('alumnoContent').style.display = 'block';
        document.getElementById('maestroContent').style.display = 'none';
        document.getElementById('btnInscribirContainer').style.display = 'none';
        document.getElementById('pageTitle').innerHTML = '<i class="fas fa-book"></i> Catálogo de Materias';
        document.getElementById('pageSubtitle').innerHTML = 'Vista administrativa de materias';
        cargarMateriasAdmin();
    }
}

// ============================================
// INICIALIZAR PARA ALUMNO
// ============================================
function initAlumno() {
    document.getElementById('pageTitle').innerHTML = '<i class="fas fa-book"></i> Mis Materias';
    document.getElementById('pageSubtitle').innerHTML = 'Materias en las que estás inscrito';
    document.getElementById('maestroContent').style.display = 'none';
    document.getElementById('alumnoContent').style.display = 'block';
    
    cargarMateriasAlumno();
}

// ============================================
// CARGAR MATERIAS DEL ALUMNO (SIMULADO)
// ============================================
function cargarMateriasAlumno() {
    // Datos simulados de materias
    materias = [
        {
            id: 1,
            nombre: 'Matemáticas I',
            codigo: 'MAT-101',
            maestro: 'Dr. Juan Pérez',
            horario: 'Lunes 8:00 - 10:00',
            salon: 'A-101',
            semestre: 1,
            creditos: 5,
            calificacion: 85,
            estado: 'cursando',
            progreso: 75
        },
        {
            id: 2,
            nombre: 'Programación Web',
            codigo: 'PRO-202',
            maestro: 'Mtra. Ana García',
            horario: 'Martes 10:00 - 12:00',
            salon: 'LAB-2',
            semestre: 2,
            creditos: 6,
            calificacion: 90,
            estado: 'cursando',
            progreso: 60
        },
        {
            id: 3,
            nombre: 'Bases de Datos',
            codigo: 'BD-303',
            maestro: 'Ing. Carlos López',
            horario: 'Miércoles 14:00 - 16:00',
            salon: 'A-205',
            semestre: 3,
            creditos: 5,
            calificacion: 78,
            estado: 'cursando',
            progreso: 45
        },
        {
            id: 4,
            nombre: 'Inglés I',
            codigo: 'ING-101',
            maestro: 'Lic. María Fernández',
            horario: 'Jueves 9:00 - 11:00',
            salon: 'B-102',
            semestre: 1,
            creditos: 4,
            calificacion: 92,
            estado: 'aprobado',
            progreso: 100
        }
    ];
    
    actualizarEstadisticas();
    renderMaterias();
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    const total = materias.length;
    const aprobadas = materias.filter(m => m.estado === 'aprobado').length;
    const promedio = materias.reduce((sum, m) => sum + m.calificacion, 0) / total;
    
    document.getElementById('totalMaterias').textContent = total;
    document.getElementById('totalAprobadas').textContent = aprobadas;
    document.getElementById('promedioGeneral').textContent = promedio.toFixed(1);
}

// ============================================
// RENDERIZAR MATERIAS
// ============================================
function renderMaterias() {
    const container = document.getElementById('materiasContainer');
    const searchTerm = document.getElementById('searchMateria')?.value.toLowerCase() || '';
    const semestreFilter = document.getElementById('filterSemestre')?.value || 'todos';
    const estadoFilter = document.getElementById('filterEstado')?.value || 'todos';
    
    let filteredMaterias = materias.filter(materia => {
        const matchesSearch = materia.nombre.toLowerCase().includes(searchTerm) ||
                             materia.codigo.toLowerCase().includes(searchTerm) ||
                             materia.maestro.toLowerCase().includes(searchTerm);
        const matchesSemestre = semestreFilter === 'todos' || materia.semestre == semestreFilter;
        const matchesEstado = estadoFilter === 'todos' || materia.estado === estadoFilter;
        return matchesSearch && matchesSemestre && matchesEstado;
    });
    
    if (filteredMaterias.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-book-open" style="font-size: 3rem; color: #ccc;"></i>
                <h5 class="mt-3 text-muted">No hay materias que coincidan con tu búsqueda</h5>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredMaterias.map(materia => `
        <div class="col-md-6 col-lg-4">
            <div class="materia-card">
                <div class="materia-header">
                    <h5>${materia.nombre}</h5>
                    <span class="badge badge-semestre">${materia.semestre}° Semestre</span>
                </div>
                <div class="materia-info">
                    <p><i class="fas fa-code"></i> <strong>Código:</strong> ${materia.codigo}</p>
                    <p><i class="fas fa-chalkboard-teacher"></i> <strong>Maestro:</strong> ${materia.maestro}</p>
                    <p><i class="fas fa-clock"></i> <strong>Horario:</strong> ${materia.horario}</p>
                    <p><i class="fas fa-door-open"></i> <strong>Salón:</strong> ${materia.salon}</p>
                    <p><i class="fas fa-star"></i> <strong>Créditos:</strong> ${materia.creditos}</p>
                    <p><i class="fas fa-chart-line"></i> <strong>Calificación:</strong> 
                        <span class="fw-bold ${materia.calificacion >= 70 ? 'text-success' : 'text-danger'}">
                            ${materia.calificacion}
                        </span>
                    </p>
                </div>
                <div class="progreso-container">
                    <div class="progreso-label">
                        <span>Progreso del curso</span>
                        <span>${materia.progreso}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${materia.progreso}%"></div>
                    </div>
                </div>
                <div class="text-end mt-3">
                    <span class="badge ${materia.estado === 'cursando' ? 'badge-cursando' : materia.estado === 'aprobado' ? 'badge-aprobado' : 'badge-reprobado'}">
                        ${materia.estado === 'cursando' ? 'Cursando' : materia.estado === 'aprobado' ? 'Aprobado' : 'Reprobado'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTRAR MATERIAS
// ============================================
function filterMaterias() {
    renderMaterias();
}

// ============================================
// INICIALIZAR PARA MAESTRO
// ============================================
function initMaestro() {
    document.getElementById('pageTitle').innerHTML = '<i class="fas fa-chalkboard"></i> Mis Cursos';
    document.getElementById('pageSubtitle').innerHTML = 'Cursos que impartes';
    document.getElementById('materiasTabs').style.display = 'flex';
    document.getElementById('alumnoContent').style.display = 'none';
    document.getElementById('maestroContent').style.display = 'block';
    
    cargarCursosMaestro();
}

// ============================================
// CARGAR CURSOS DEL MAESTRO (SIMULADO)
// ============================================
function cargarCursosMaestro() {
    const cursos = [
        {
            id: 1,
            nombre: 'Matemáticas I',
            codigo: 'MAT-101',
            horario: 'Lunes 8:00 - 10:00',
            salon: 'A-101',
            semestre: 1,
            alumnos: 25,
            alumnosList: [
                { matricula: '2023001', nombre: 'Juan Pérez', email: 'juan@email.com', calificacion: 85 },
                { matricula: '2023002', nombre: 'María García', email: 'maria@email.com', calificacion: 90 }
            ]
        },
        {
            id: 2,
            nombre: 'Programación Web',
            codigo: 'PRO-202',
            horario: 'Martes 10:00 - 12:00',
            salon: 'LAB-2',
            semestre: 2,
            alumnos: 20,
            alumnosList: []
        }
    ];
    
    renderCursos(cursos);
}

// ============================================
// RENDERIZAR CURSOS (MAESTRO)
// ============================================
function renderCursos(cursos) {
    const container = document.getElementById('cursosContainer');
    
    container.innerHTML = cursos.map(curso => `
        <div class="col-md-6 col-lg-4">
            <div class="materia-card">
                <div class="materia-header">
                    <h5>${curso.nombre}</h5>
                    <span class="badge badge-semestre">${curso.semestre}° Semestre</span>
                </div>
                <div class="materia-info">
                    <p><i class="fas fa-code"></i> <strong>Código:</strong> ${curso.codigo}</p>
                    <p><i class="fas fa-clock"></i> <strong>Horario:</strong> ${curso.horario}</p>
                    <p><i class="fas fa-door-open"></i> <strong>Salón:</strong> ${curso.salon}</p>
                    <p><i class="fas fa-users"></i> <strong>Alumnos:</strong> ${curso.alumnos}</p>
                </div>
                <div class="btn-accion">
                    <button class="btn-ver-alumnos" onclick="verAlumnos(${curso.id})">
                        <i class="fas fa-users"></i> Ver Alumnos
                    </button>
                    <button class="btn-calificar" onclick="calificarCurso(${curso.id})">
                        <i class="fas fa-star"></i> Calificar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// VER ALUMNOS (MAESTRO)
// ============================================
function verAlumnos(cursoId) {
    // Simular alumnos
    const alumnos = [
        { matricula: '2023001', nombre: 'Juan Pérez', email: 'juan@email.com', calificacion: 85, estado: 'Aprobado' },
        { matricula: '2023002', nombre: 'María García', email: 'maria@email.com', calificacion: 90, estado: 'Aprobado' },
        { matricula: '2023003', nombre: 'Carlos López', email: 'carlos@email.com', calificacion: 65, estado: 'Reprobado' }
    ];
    
    const tbody = document.getElementById('alumnosTableBody');
    tbody.innerHTML = alumnos.map(alumno => `
        <tr>
            <td>${alumno.matricula}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.email}</td>
            <td>${alumno.calificacion}</td>
            <td>
                <span class="badge ${alumno.estado === 'Aprobado' ? 'badge-aprobado' : 'badge-reprobado'}">
                    ${alumno.estado}
                </span>
            </td>
        </tr>
    `).join('');
    
    const modal = new bootstrap.Modal(document.getElementById('alumnosModal'));
    modal.show();
}

// ============================================
// CALIFICAR CURSO (MAESTRO)
// ============================================
function calificarCurso(cursoId) {
    showModal('Calificaciones', 'Función en desarrollo', 'info');
}

// ============================================
// CAMBIAR PESTAÑA (MAESTRO)
// ============================================
function switchTab(tab) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    if (tab === 'mis-cursos') {
        cargarCursosMaestro();
    } else if (tab === 'alumnos') {
        showModal('Alumnos', 'Selecciona un curso para ver sus alumnos', 'info');
    } else if (tab === 'asignar') {
        showModal('Asignar Curso', 'Función en desarrollo', 'info');
    }
}

// ============================================
// CARGAR MATERIAS PARA ADMIN
// ============================================
function cargarMateriasAdmin() {
    const materiasAdmin = [
        { id: 1, nombre: 'Matemáticas I', codigo: 'MAT-101', creditos: 5, semestre: 1, carrera: 'Ingeniería' },
        { id: 2, nombre: 'Programación Web', codigo: 'PRO-202', creditos: 6, semestre: 2, carrera: 'Ingeniería' }
    ];
    
    const container = document.getElementById('materiasContainer');
    container.innerHTML = materiasAdmin.map(m => `
        <div class="col-md-6 col-lg-4">
            <div class="materia-card">
                <h5>${m.nombre}</h5>
                <p><strong>Código:</strong> ${m.codigo}</p>
                <p><strong>Créditos:</strong> ${m.creditos}</p>
                <p><strong>Semestre:</strong> ${m.semestre}</p>
                <p><strong>Carrera:</strong> ${m.carrera}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// MOSTRAR MODAL DE INSCRIPCIÓN
// ============================================
function showInscribirModal() {
    // Materias disponibles simuladas
    materiasDisponibles = [
        { id: 5, nombre: 'Estructura de Datos', codigo: 'ED-301', maestro: 'Dr. Roberto Gómez', horario: 'Viernes 8:00 - 10:00', creditos: 5, semestre: 3 },
        { id: 6, nombre: 'Redes de Computadoras', codigo: 'RED-401', maestro: 'Ing. Luis Torres', horario: 'Lunes 14:00 - 16:00', creditos: 5, semestre: 4 }
    ];
    
    const container = document.getElementById('materiasDisponiblesContainer');
    container.innerHTML = materiasDisponibles.map(m => `
        <div class="materia-disponible" onclick="toggleSelectMateria(${m.id})" data-id="${m.id}">
            <div class="materia-info">
                <h6>${m.nombre}</h6>
                <small>${m.codigo} - ${m.maestro} - ${m.creditos} créditos</small>
            </div>
            <i class="fas fa-check-circle" style="color: #28a745; display: none;"></i>
        </div>
    `).join('');
    
    selectedMaterias = [];
    const modal = new bootstrap.Modal(document.getElementById('inscribirModal'));
    modal.show();
}

// ============================================
// SELECCIONAR MATERIA PARA INSCRIBIR
// ============================================
function toggleSelectMateria(id) {
    const element = document.querySelector(`.materia-disponible[data-id="${id}"]`);
    const index = selectedMaterias.indexOf(id);
    
    if (index === -1) {
        selectedMaterias.push(id);
        element.classList.add('selected');
        element.querySelector('.fa-check-circle').style.display = 'inline-block';
    } else {
        selectedMaterias.splice(index, 1);
        element.classList.remove('selected');
        element.querySelector('.fa-check-circle').style.display = 'none';
    }
}

// ============================================
// FILTRAR MATERIAS DISPONIBLES
// ============================================
function filterDisponibles() {
    const searchTerm = document.getElementById('searchDisponible').value.toLowerCase();
    const filtered = materiasDisponibles.filter(m => 
        m.nombre.toLowerCase().includes(searchTerm) || 
        m.codigo.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('materiasDisponiblesContainer');
    container.innerHTML = filtered.map(m => `
        <div class="materia-disponible" onclick="toggleSelectMateria(${m.id})" data-id="${m.id}">
            <div class="materia-info">
                <h6>${m.nombre}</h6>
                <small>${m.codigo} - ${m.maestro} - ${m.creditos} créditos</small>
            </div>
            <i class="fas fa-check-circle" style="color: #28a745; display: none;"></i>
        </div>
    `).join('');
}

// ============================================
// CONFIRMAR INSCRIPCIÓN
// ============================================
function confirmarInscripcion() {
    if (selectedMaterias.length === 0) {
        showModal('Error', 'Selecciona al menos una materia', 'error');
        return;
    }
    
    showModal('Éxito', `Te has inscrito a ${selectedMaterias.length} materia(s)`, 'success');
    
    setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('inscribirModal')).hide();
        location.reload();
    }, 1500);
}

// ============================================
// MOSTRAR MODAL DE CONFIRMACIÓN
// ============================================
function showModal(title, message, type = 'success') {
    const modalTitle = document.querySelector('#confirmModal .modal-title');
    const modalBody = document.getElementById('confirmModalMessage');
    const modalHeader = document.querySelector('#confirmModal .modal-header');
    
    if (type === 'error') {
        modalTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        modalHeader.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    } else {
        modalTitle.innerHTML = '<i class="fas fa-check-circle"></i> ' + title;
        modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    }
    
    modalBody.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
    
    setTimeout(() => {
        modalHeader.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }, 2000);
}

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'login.html';
    }
}

// ============================================
// VERIFICAR AUTENTICACIÓN
// ============================================
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'dashboard.html';
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);