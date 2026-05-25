/* ============================================
   CURSOS JS - MI UNIVERSIDAD (VISTA MAESTRO)
   ============================================ */

// Obtener datos del usuario
const userNombre = localStorage.getItem('userNombre') || 'Maestro';
const userMatricula = localStorage.getItem('userMatricula') || '000000';
const userRol = localStorage.getItem('userRol') || 'maestro';

// Variables globales
let cursos = [];
let alumnosPorCurso = {};
let tareasPorCurso = {};
let charts = {};

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    
    if (userRol === 'maestro') {
        mostrarInfoMaestro();
        cargarCursos();
    } else {
        window.location.href = 'dashboard.html';
    }
}

// ============================================
// MOSTRAR INFORMACIÓN DEL MAESTRO
// ============================================
function mostrarInfoMaestro() {
    document.getElementById('maestroNombre').textContent = userNombre;
    document.getElementById('maestroMatricula').textContent = userMatricula;
}

// ============================================
// CARGAR CURSOS (SIMULADO)
// ============================================
function cargarCursos() {
    cursos = [
        {
            id: 1,
            nombre: 'Matemáticas IV',
            codigo: 'MAT-304',
            horario: 'Lunes 08:00 - 10:00',
            salon: 'A-101',
            semestre: '6to Semestre',
            alumnos: 28,
            alumnosList: generarAlumnos(28),
            tareas: generarTareas(),
            promedio: 82,
            progreso: 75
        },
        {
            id: 2,
            nombre: 'Desarrollo Web Avanzado',
            codigo: 'WEB-401',
            horario: 'Martes 10:00 - 12:00',
            salon: 'LAB-2',
            semestre: '6to Semestre',
            alumnos: 25,
            alumnosList: generarAlumnos(25),
            tareas: generarTareas(),
            promedio: 88,
            progreso: 80
        },
        {
            id: 3,
            nombre: 'Bases de Datos Avanzadas',
            codigo: 'BD-401',
            horario: 'Miércoles 08:00 - 10:00',
            salon: 'A-205',
            semestre: '6to Semestre',
            alumnos: 30,
            alumnosList: generarAlumnos(30),
            tareas: generarTareas(),
            promedio: 79,
            progreso: 70
        },
        {
            id: 4,
            nombre: 'Programación Móvil',
            codigo: 'MOV-402',
            horario: 'Jueves 10:00 - 12:00',
            salon: 'LAB-3',
            semestre: '6to Semestre',
            alumnos: 22,
            alumnosList: generarAlumnos(22),
            tareas: generarTareas(),
            promedio: 91,
            progreso: 85
        }
    ];
    
    actualizarEstadisticas();
    renderCursos();
}

// ============================================
// GENERAR ALUMNOS SIMULADOS
// ============================================
function generarAlumnos(cantidad) {
    const nombres = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Torres', 
                     'Laura Fernández', 'Javier Gómez', 'Sofia Rodríguez', 'Diego Sánchez', 'Valentina Castro',
                     'Andrés Mora', 'Isabel Reyes', 'Fernando Ortiz', 'Carolina Ruiz', 'Ricardo Mendoza'];
    const alumnos = [];
    
    for (let i = 1; i <= cantidad; i++) {
        const nombre = nombres[(i - 1) % nombres.length] + ` ${i}`;
        const calificacion = Math.floor(Math.random() * (100 - 50 + 1) + 50);
        const asistencia = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        
        alumnos.push({
            matricula: `2023${String(i).padStart(3, '0')}`,
            nombre: nombre,
            email: `${nombre.toLowerCase().replace(/ /g, '.')}@alumno.edu.mx`,
            calificacion: calificacion,
            asistencia: asistencia,
            estado: calificacion >= 60 ? 'Aprobado' : 'Reprobado'
        });
    }
    
    return alumnos;
}

// ============================================
// GENERAR TAREAS SIMULADAS
// ============================================
function generarTareas() {
    return [
        { titulo: 'Examen Parcial 1', fechaEntrega: '2024-09-15', entregas: 28, promedio: 78 },
        { titulo: 'Proyecto Integrador', fechaEntrega: '2024-10-20', entregas: 25, promedio: 85 },
        { titulo: 'Examen Parcial 2', fechaEntrega: '2024-11-10', entregas: 27, promedio: 82 },
        { titulo: 'Tarea Investigación', fechaEntrega: '2024-11-25', entregas: 30, promedio: 88 }
    ];
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    const totalCursos = cursos.length;
    const totalAlumnos = cursos.reduce((sum, c) => sum + c.alumnos, 0);
    const totalTareas = cursos.reduce((sum, c) => sum + c.tareas.length, 0);
    const promedioGeneral = cursos.reduce((sum, c) => sum + c.promedio, 0) / totalCursos;
    
    document.getElementById('totalCursos').textContent = totalCursos;
    document.getElementById('totalAlumnos').textContent = totalAlumnos;
    document.getElementById('totalTareas').textContent = totalTareas;
    document.getElementById('promedioGeneral').textContent = promedioGeneral.toFixed(1);
}

// ============================================
// RENDERIZAR CURSOS
// ============================================
function renderCursos() {
    const container = document.getElementById('cursosContainer');
    
    container.innerHTML = cursos.map(curso => `
        <div class="col-md-6 col-lg-4">
            <div class="curso-card">
                <div class="curso-header">
                    <h4>${curso.nombre}</h4>
                    <span class="curso-codigo">${curso.codigo}</span>
                </div>
                <div class="curso-body">
                    <div class="curso-info">
                        <p><i class="fas fa-clock"></i> ${curso.horario}</p>
                        <p><i class="fas fa-door-open"></i> Salón: ${curso.salon}</p>
                        <p><i class="fas fa-graduation-cap"></i> ${curso.semestre}</p>
                        <p><i class="fas fa-users"></i> Alumnos: ${curso.alumnos}</p>
                        <p><i class="fas fa-chart-line"></i> Promedio: <strong>${curso.promedio}</strong></p>
                    </div>
                    <div class="progress-section">
                        <div class="progress-label">
                            <span>Progreso del curso</span>
                            <span>${curso.progreso}%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${curso.progreso}%"></div>
                        </div>
                    </div>
                    <div class="curso-actions">
                        <button class="btn-ver-alumnos" onclick="verAlumnos(${curso.id})">
                            <i class="fas fa-users"></i> Ver Alumnos
                        </button>
                        <button class="btn-ver-tareas" onclick="verTareas(${curso.id})">
                            <i class="fas fa-tasks"></i> Ver Tareas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// VER ALUMNOS DEL CURSO
// ============================================
function verAlumnos(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) return;
    
    document.getElementById('cursoNombreModal').innerHTML = `<strong>${curso.nombre}</strong> (${curso.codigo})`;
    
    const tbody = document.getElementById('alumnosTableBody');
    tbody.innerHTML = curso.alumnosList.map(alumno => `
        <tr>
            <td>${alumno.matricula}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.email}</td>
            <td class="${alumno.calificacion >= 60 ? 'text-success fw-bold' : 'text-danger fw-bold'}">${alumno.calificacion}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <div class="progress" style="width: 60px; height: 5px;">
                        <div class="progress-bar bg-success" style="width: ${alumno.asistencia}%"></div>
                    </div>
                    <span>${alumno.asistencia}%</span>
                </div>
            </td>
            <td><span class="badge ${alumno.estado === 'Aprobado' ? 'bg-success' : 'bg-danger'}">${alumno.estado}</span></td>
        </tr>
    `).join('');
    
    // Guardar alumnos actuales para exportar
    window.alumnosActuales = curso.alumnosList;
    window.cursoNombreActual = curso.nombre;
    
    const modal = new bootstrap.Modal(document.getElementById('alumnosModal'));
    modal.show();
}

// ============================================
// VER TAREAS DEL CURSO
// ============================================
function verTareas(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) return;
    
    document.getElementById('cursoTareasNombre').innerHTML = `<strong>${curso.nombre}</strong> (${curso.codigo})`;
    
    const tbody = document.getElementById('tareasTableBody');
    tbody.innerHTML = curso.tareas.map(tarea => `
        <tr>
            <td>${tarea.titulo}</td>
            <td>${tarea.fechaEntrega}</td>
            <td>${tarea.entregas}/${curso.alumnos}</td>
            <td>${tarea.promedio}</td>
            <td><span class="badge bg-warning">Pendiente</span></td>
        </tr>
    `).join('');
    
    const modal = new bootstrap.Modal(document.getElementById('tareasModal'));
    modal.show();
}

// ============================================
// EXPORTAR ALUMNOS A EXCEL
// ============================================
function exportarAlumnosExcel() {
    if (!window.alumnosActuales) return;
    
    const excelData = window.alumnosActuales.map(alumno => ({
        'Matrícula': alumno.matricula,
        'Nombre': alumno.nombre,
        'Correo': alumno.email,
        'Calificación': alumno.calificacion,
        'Asistencia': `${alumno.asistencia}%`,
        'Estado': alumno.estado
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alumnos');
    XLSX.writeFile(wb, `Alumnos_${window.cursoNombreActual}.xlsx`);
    
    showModal('Éxito', 'Archivo Excel exportado correctamente', 'success');
}

// ============================================
// EXPORTAR TODOS LOS CURSOS A EXCEL
// ============================================
function exportarExcel() {
    const excelData = cursos.map(curso => ({
        'Curso': curso.nombre,
        'Código': curso.codigo,
        'Horario': curso.horario,
        'Salón': curso.salon,
        'Semestre': curso.semestre,
        'Alumnos': curso.alumnos,
        'Promedio': curso.promedio,
        'Progreso': `${curso.progreso}%`
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mis Cursos');
    XLSX.writeFile(wb, `Mis_Cursos_${userMatricula}.xlsx`);
    
    showModal('Éxito', 'Archivo Excel exportado correctamente', 'success');
}

// ============================================
// IMPRIMIR CURSOS
// ============================================
function imprimirCursos() {
    window.print();
}

// ============================================
// CAMBIAR PESTAÑA Y CREAR GRÁFICAS
// ============================================
function switchTab(tab) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    document.getElementById('cursosContent').style.display = tab === 'cursos' ? 'block' : 'none';
    document.getElementById('estadisticasContent').style.display = tab === 'estadisticas' ? 'block' : 'none';
    
    if (tab === 'estadisticas') {
        crearGraficas();
    }
}

// ============================================
// CREAR GRÁFICAS
// ============================================
function crearGraficas() {
    // Gráfica de rendimiento por curso
    const ctxRendimiento = document.getElementById('rendimientoCursoChart')?.getContext('2d');
    if (ctxRendimiento) {
        if (charts.rendimiento) charts.rendimiento.destroy();
        charts.rendimiento = new Chart(ctxRendimiento, {
            type: 'bar',
            data: {
                labels: cursos.map(c => c.nombre),
                datasets: [{
                    label: 'Promedio',
                    data: cursos.map(c => c.promedio),
                    backgroundColor: 'rgba(30, 60, 114, 0.7)',
                    borderColor: '#1e3c72',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }
    
    // Gráfica de distribución de calificaciones (todos los alumnos)
    const todasCalificaciones = cursos.flatMap(c => c.alumnosList.map(a => a.calificacion));
    const distribucion = {
        excelente: todasCalificaciones.filter(c => c >= 90).length,
        notable: todasCalificaciones.filter(c => c >= 80 && c < 90).length,
        bueno: todasCalificaciones.filter(c => c >= 70 && c < 80).length,
        suficiente: todasCalificaciones.filter(c => c >= 60 && c < 70).length,
        insuficiente: todasCalificaciones.filter(c => c < 60).length
    };
    
    const ctxDistribucion = document.getElementById('distribucionChart')?.getContext('2d');
    if (ctxDistribucion) {
        if (charts.distribucion) charts.distribucion.destroy();
        charts.distribucion = new Chart(ctxDistribucion, {
            type: 'doughnut',
            data: {
                labels: ['Excelente (90-100)', 'Notable (80-89)', 'Bueno (70-79)', 'Suficiente (60-69)', 'Insuficiente (0-59)'],
                datasets: [{
                    data: [distribucion.excelente, distribucion.notable, distribucion.bueno, distribucion.suficiente, distribucion.insuficiente],
                    backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#fd7e14', '#dc3545']
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Gráfica comparativa de cursos
    const ctxComparativa = document.getElementById('comparativaChart')?.getContext('2d');
    if (ctxComparativa) {
        if (charts.comparativa) charts.comparativa.destroy();
        charts.comparativa = new Chart(ctxComparativa, {
            type: 'line',
            data: {
                labels: cursos.map(c => c.nombre),
                datasets: [
                    { label: 'Promedio', data: cursos.map(c => c.promedio), borderColor: '#1e3c72', backgroundColor: 'rgba(30, 60, 114, 0.1)', fill: true, tension: 0.4 },
                    { label: 'Asistencia', data: cursos.map(c => Math.floor(Math.random() * 20 + 75)), borderColor: '#28a745', backgroundColor: 'rgba(40, 167, 69, 0.1)', fill: true, tension: 0.4 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, max: 100 } } }
        });
    }
}

// ============================================
// MOSTRAR MODAL
// ============================================
function showModal(title, message, type = 'success') {
    const modalHeader = document.getElementById('confirmModalHeader');
    const modalTitle = document.querySelector('#confirmModal .modal-title');
    const modalBody = document.getElementById('confirmModalMessage');
    
    if (type === 'error') {
        modalHeader.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
        modalTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    } else {
        modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        modalTitle.innerHTML = '<i class="fas fa-check-circle"></i> Éxito';
    }
    
    modalBody.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
    
    setTimeout(() => {
        modalHeader.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }, 2000);
}

// ============================================
// VERIFICAR AUTENTICACIÓN
// ============================================
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
}

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);