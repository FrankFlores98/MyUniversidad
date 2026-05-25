/* ============================================
   CALIFICACIONES JS - MI UNIVERSIDAD
   VERSIÓN COMPLETA
   ============================================ */

// Obtener datos del usuario
const userRol = localStorage.getItem('userRol') || 'alumno';
const userNombre = localStorage.getItem('userNombre') || 'Usuario';

// Variables globales
let calificaciones = [];
let chart = null;
let progressCircle = null;

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
        document.getElementById('maestroTab').style.display = 'none';
        cargarCalificaciones();
    }
}

// ============================================
// INICIALIZAR PARA ALUMNO
// ============================================
function initAlumno() {
    const maestroTab = document.getElementById('maestroTab');
    if (maestroTab) maestroTab.style.display = 'none';
    cargarCalificaciones();
}

// ============================================
// INICIALIZAR PARA MAESTRO
// ============================================
function initMaestro() {
    const maestroTab = document.getElementById('maestroTab');
    if (maestroTab) maestroTab.style.display = 'block';
    cargarCalificaciones();
}

// ============================================
// VERIFICAR AUTENTICACIÓN
// ============================================
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

// ============================================
// CARGAR CALIFICACIONES (SIMULADO)
// ============================================
function cargarCalificaciones() {
    calificaciones = [
        {
            id: 1,
            codigo: 'MAT-101',
            materia: 'Matemáticas I',
            maestro: 'Dr. Juan Pérez',
            parcial1: 85,
            parcial2: 88,
            parcial3: 90,
            final: 88,
            estado: 'aprobado'
        },
        {
            id: 2,
            codigo: 'PRO-202',
            materia: 'Programación Web',
            maestro: 'Mtra. Ana García',
            parcial1: 92,
            parcial2: 88,
            parcial3: 95,
            final: 92,
            estado: 'aprobado'
        },
        {
            id: 3,
            codigo: 'BD-303',
            materia: 'Bases de Datos',
            maestro: 'Ing. Carlos López',
            parcial1: 78,
            parcial2: 82,
            parcial3: 75,
            final: 78,
            estado: 'aprobado'
        },
        {
            id: 4,
            codigo: 'ING-101',
            materia: 'Inglés I',
            maestro: 'Lic. María Fernández',
            parcial1: 65,
            parcial2: 68,
            parcial3: 70,
            final: 68,
            estado: 'reprobado'
        },
        {
            id: 5,
            codigo: 'FIS-101',
            materia: 'Física I',
            maestro: 'Dr. Roberto Gómez',
            parcial1: 55,
            parcial2: 60,
            parcial3: 58,
            final: 58,
            estado: 'reprobado'
        },
        {
            id: 6,
            codigo: 'QUI-101',
            materia: 'Química General',
            maestro: 'Dra. Laura Torres',
            parcial1: 70,
            parcial2: 72,
            parcial3: 75,
            final: 72,
            estado: 'aprobado'
        }
    ];
    
    actualizarEstadisticas();
    renderTablaCalificaciones();
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    const totalMaterias = calificaciones.length;
    const aprobadas = calificaciones.filter(c => c.estado === 'aprobado').length;
    const reprobadas = calificaciones.filter(c => c.estado === 'reprobado').length;
    const sumaPromedios = calificaciones.reduce((sum, c) => sum + c.final, 0);
    const promedio = totalMaterias > 0 ? sumaPromedios / totalMaterias : 0;
    const mejorCalificacion = calificaciones.length > 0 ? Math.max(...calificaciones.map(c => c.final)) : 0;
    
    const promedioEl = document.getElementById('promedioGeneral');
    const aprobadasEl = document.getElementById('materiasAprobadas');
    const reprobadasEl = document.getElementById('materiasReprobadas');
    const mejorEl = document.getElementById('mejorCalificacion');
    
    if (promedioEl) promedioEl.textContent = promedio.toFixed(1);
    if (aprobadasEl) aprobadasEl.textContent = aprobadas;
    if (reprobadasEl) reprobadasEl.textContent = reprobadas;
    if (mejorEl) mejorEl.textContent = mejorCalificacion;
}

// ============================================
// RENDERIZAR TABLA DE CALIFICACIONES
// ============================================
function renderTablaCalificaciones() {
    const tbody = document.getElementById('calificacionesBody');
    if (!tbody) return;
    
    if (calificaciones.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center">No hay calificaciones registradas</td></tr>`;
        return;
    }
    
    tbody.innerHTML = calificaciones.map(cal => {
        let claseEstado = cal.estado === 'aprobado' ? 'estado-aprobado' : 'estado-reprobado';
        let textoEstado = cal.estado === 'aprobado' ? 'Aprobado' : 'Reprobado';
        
        let clasePromedio = '';
        if (cal.final >= 90) clasePromedio = 'calificacion-alta';
        else if (cal.final >= 70) clasePromedio = 'calificacion-media';
        else clasePromedio = 'calificacion-baja';
        
        return `
            <tr onclick="verDetalleCalificacion(${cal.id})" style="cursor: pointer;">
                <td><strong>${cal.codigo}</strong></td>
                <td><strong>${cal.materia}</strong></td>
                <td>${cal.maestro}</td>
                <td class="${cal.parcial1 >= 70 ? 'text-success' : 'text-danger'} fw-bold">${cal.parcial1}</td>
                <td class="${cal.parcial2 >= 70 ? 'text-success' : 'text-danger'} fw-bold">${cal.parcial2}</td>
                <td class="${cal.parcial3 >= 70 ? 'text-success' : 'text-danger'} fw-bold">${cal.parcial3}</td>
                <td class="${clasePromedio} fw-bold">${cal.final}</td>
                <td><span class="${claseEstado}">${textoEstado}</span></td>
            </tr>
        `;
    }).join('');
}

// ============================================
// VER DETALLE DE CALIFICACIÓN
// ============================================
function verDetalleCalificacion(id) {
    const calificacion = calificaciones.find(c => c.id === id);
    if (!calificacion) return;
    
    const contenido = `
        <h6 class="mb-3">${calificacion.materia} (${calificacion.codigo})</h6>
        <div class="row mb-2"><div class="col-6"><strong>Maestro:</strong></div><div class="col-6">${calificacion.maestro}</div></div>
        <div class="row mb-2"><div class="col-6"><strong>Parcial 1:</strong></div><div class="col-6 ${calificacion.parcial1 >= 70 ? 'text-success' : 'text-danger'}">${calificacion.parcial1}</div></div>
        <div class="row mb-2"><div class="col-6"><strong>Parcial 2:</strong></div><div class="col-6 ${calificacion.parcial2 >= 70 ? 'text-success' : 'text-danger'}">${calificacion.parcial2}</div></div>
        <div class="row mb-2"><div class="col-6"><strong>Parcial 3:</strong></div><div class="col-6 ${calificacion.parcial3 >= 70 ? 'text-success' : 'text-danger'}">${calificacion.parcial3}</div></div>
        <div class="row mb-2"><div class="col-6"><strong>Calificación Final:</strong></div><div class="col-6 fw-bold">${calificacion.final}</div></div>
        <div class="row mb-2"><div class="col-6"><strong>Estado:</strong></div><div class="col-6">${calificacion.estado === 'aprobado' ? '✅ Aprobado' : '❌ Reprobado'}</div></div>
    `;
    
    const modalBody = document.getElementById('detalleContenido');
    if (modalBody) modalBody.innerHTML = contenido;
    
    const modal = new bootstrap.Modal(document.getElementById('detalleModal'));
    modal.show();
}

// ============================================
// CREAR GRÁFICA DE RENDIMIENTO
// ============================================
function crearGrafica() {
    const canvas = document.getElementById('rendimientoChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const materiasNombres = calificaciones.map(c => c.materia.substring(0, 15));
    const calificacionesFinales = calificaciones.map(c => c.final);
    
    const aprobadas = calificaciones.filter(c => c.estado === 'aprobado').length;
    const reprobadas = calificaciones.filter(c => c.estado === 'reprobado').length;
    const promedio = calificaciones.reduce((sum, c) => sum + c.final, 0) / calificaciones.length;
    const maxima = Math.max(...calificaciones.map(c => c.final));
    const minima = Math.min(...calificaciones.map(c => c.final));
    const porcentajeAprobacion = (aprobadas / calificaciones.length) * 100;
    
    const resumenPromedio = document.getElementById('resumenPromedio');
    const resumenMaxima = document.getElementById('resumenMaxima');
    const resumenMinima = document.getElementById('resumenMinima');
    const resumenAprobadas = document.getElementById('resumenAprobadas');
    const resumenReprobadas = document.getElementById('resumenReprobadas');
    const porcentajeSpan = document.getElementById('porcentajeAprobacion');
    
    if (resumenPromedio) resumenPromedio.textContent = promedio.toFixed(1);
    if (resumenMaxima) resumenMaxima.textContent = maxima;
    if (resumenMinima) resumenMinima.textContent = minima;
    if (resumenAprobadas) resumenAprobadas.textContent = aprobadas;
    if (resumenReprobadas) resumenReprobadas.textContent = reprobadas;
    if (porcentajeSpan) porcentajeSpan.textContent = Math.round(porcentajeAprobacion);
    
    if (chart) chart.destroy();
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: materiasNombres,
            datasets: [{
                label: 'Calificación Final',
                data: calificacionesFinales,
                backgroundColor: calificaciones.map(c => c.final >= 70 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)'),
                borderColor: calificaciones.map(c => c.final >= 70 ? '#28a745' : '#dc3545'),
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Calificación' },
                    grid: { color: '#e0e0e0' }
                },
                x: { title: { display: true, text: 'Materias' } }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { callbacks: { label: function(context) { return `Calificación: ${context.raw}`; } } }
            }
        }
    });
    
    crearProgressCircle(porcentajeAprobacion);
}

// ============================================
// CREAR CÍRCULO DE PROGRESO
// ============================================
function crearProgressCircle(porcentaje) {
    const canvas = document.getElementById('progressCircle');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    const startAngle = -0.5 * Math.PI;
    const endAngle = startAngle + (porcentaje / 100) * 2 * Math.PI;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = porcentaje >= 70 ? '#28a745' : '#dc3545';
    ctx.lineWidth = 10;
    ctx.stroke();
}

// ============================================
// CARGAR ALUMNOS POR CURSO (MAESTRO)
// ============================================
function cargarAlumnosCurso() {
    const cursoId = document.getElementById('selectCurso')?.value;
    const parcial = document.getElementById('selectParcial')?.value;
    
    if (!cursoId) {
        const gestionarBody = document.getElementById('gestionarAlumnosBody');
        if (gestionarBody) {
            gestionarBody.innerHTML = `<tr><td colspan="5" class="text-center">Selecciona un curso</td></tr>`;
        }
        return;
    }
    
    const alumnos = [
        { matricula: '2023001', nombre: 'Juan Pérez', calificacion: 85 },
        { matricula: '2023002', nombre: 'María García', calificacion: 92 },
        { matricula: '2023003', nombre: 'Carlos López', calificacion: 78 },
        { matricula: '2023004', nombre: 'Ana Martínez', calificacion: 65 },
        { matricula: '2023005', nombre: 'Luis Torres', calificacion: 55 }
    ];
    
    const tbody = document.getElementById('gestionarAlumnosBody');
    if (tbody) {
        tbody.innerHTML = alumnos.map(alumno => `
            <tr>
                <td>${alumno.matricula}</td>
                <td>${alumno.nombre}</td>
                <td class="fw-bold ${alumno.calificacion >= 70 ? 'text-success' : 'text-danger'}">${alumno.calificacion}</td>
                <td>
                    <input type="number" class="form-control form-control-sm" id="calif_${alumno.matricula}" 
                           min="0" max="100" step="1" value="${alumno.calificacion}" style="width: 100px;">
                </td>
                <td>
                    <button class="btn-guardar" onclick="guardarCalificacionMaestro('${alumno.matricula}', '${parcial}')">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// ============================================
// GUARDAR CALIFICACIÓN (MAESTRO)
// ============================================
function guardarCalificacionMaestro(matricula, parcial) {
    const inputCalif = document.getElementById(`calif_${matricula}`);
    if (!inputCalif) return;
    
    const nuevaCalificacion = parseInt(inputCalif.value);
    
    if (isNaN(nuevaCalificacion) || nuevaCalificacion < 0 || nuevaCalificacion > 100) {
        alert('❌ Ingresa una calificación válida entre 0 y 100');
        return;
    }
    
    alert(`✅ Calificación ${nuevaCalificacion} guardada para ${matricula}`);
}

// ============================================
// CAMBIAR PESTAÑA
// ============================================
function switchTab(tab) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-tab="${tab}"]`);
    if (activeLink) activeLink.classList.add('active');
    
    const materiasContent = document.getElementById('materiasContent');
    const graficaContent = document.getElementById('graficaContent');
    const gestionarContent = document.getElementById('gestionarContent');
    
    if (materiasContent) materiasContent.style.display = tab === 'materias' ? 'block' : 'none';
    if (graficaContent) graficaContent.style.display = tab === 'grafica' ? 'block' : 'none';
    if (gestionarContent) gestionarContent.style.display = tab === 'gestionar' ? 'block' : 'none';
    
    if (tab === 'grafica') {
        crearGrafica();
    }
}

// ============================================
// MOSTRAR MENSAJE
// ============================================
function showModal(title, message, type = 'success') {
    const modalHeader = document.getElementById('confirmModalHeader');
    const modalTitle = document.querySelector('#confirmModal .modal-title');
    const modalBody = document.getElementById('confirmModalMessage');
    
    if (modalHeader) {
        if (type === 'error') {
            modalHeader.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
        } else {
            modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        }
    }
    
    if (modalTitle) {
        modalTitle.innerHTML = type === 'error' ? '<i class="fas fa-exclamation-triangle"></i> Error' : '<i class="fas fa-check-circle"></i> Éxito';
    }
    
    if (modalBody) modalBody.textContent = message;
    
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
    
    setTimeout(() => {
        if (modalHeader) modalHeader.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
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
// EXPORTAR A EXCEL (MAESTRO)
// ============================================
function exportarExcelCalificaciones() {
    const excelData = calificaciones.map(c => ({
        'Materia': c.materia,
        'Código': c.codigo,
        'Maestro': c.maestro,
        'Parcial 1': c.parcial1,
        'Parcial 2': c.parcial2,
        'Parcial 3': c.parcial3,
        'Final': c.final,
        'Estado': c.estado === 'aprobado' ? 'Aprobado' : 'Reprobado'
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Calificaciones');
    XLSX.writeFile(wb, `Calificaciones_${new Date().toISOString().slice(0, 10)}.xlsx`);
    
    alert('✅ Excel exportado correctamente');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDFCalificaciones() {
    const element = document.getElementById('calificacionesTable');
    if (!element) return;
    
    html2pdf().from(element).save();
    alert('✅ PDF exportado correctamente');
}

// ============================================
// IMPRIMIR
// ============================================
function imprimirCalificaciones() {
    window.print();
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);