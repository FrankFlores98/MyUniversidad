/* ============================================
   ADMINISTRACIÓN TOTAL JS - MI UNIVERSIDAD
   PANEL DE DIRECTIVO
   ============================================ */

// Variables globales
let charts = {};

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    cargarEstadisticas();
    cargarGraficas();
    cargarTablas();
    cargarActividadReciente();
}

// ============================================
// VERIFICAR AUTENTICACIÓN Y ROL
// ============================================
function checkAuth() {
    const token = localStorage.getItem('token');
    const userRol = localStorage.getItem('userRol');
    
    if (!token) {
        window.location.href = 'index.html';
    }
    
    // Solo directivo puede acceder
    if (userRol !== 'directivo') {
        window.location.href = 'dashboard.html';
    }
}

// ============================================
// CARGAR ESTADÍSTICAS
// ============================================
function cargarEstadisticas() {
    // Datos simulados
    document.getElementById('totalAlumnos').textContent = '1,284';
    document.getElementById('totalMaestros').textContent = '156';
    document.getElementById('totalMaterias').textContent = '89';
    document.getElementById('totalCursos').textContent = '234';
    document.getElementById('totalUsuarios').textContent = '1,489';
}

// ============================================
// CARGAR GRÁFICAS
// ============================================
function cargarGraficas() {
    // Gráfica de evolución de usuarios
    const evolucionCtx = document.getElementById('evolucionUsuariosChart').getContext('2d');
    charts.evolucion = new Chart(evolucionCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Alumnos',
                    data: [850, 870, 890, 920, 950, 980, 1010, 1050, 1100, 1150, 1200, 1284],
                    borderColor: '#1e3c72',
                    backgroundColor: 'rgba(30, 60, 114, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Maestros',
                    data: [120, 122, 125, 128, 130, 133, 135, 138, 140, 145, 150, 156],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'top' } }
        }
    });
    
    // Gráfica de distribución por rol
    const distribucionCtx = document.getElementById('distribucionRolesChart').getContext('2d');
    charts.distribucion = new Chart(distribucionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Alumnos', 'Maestros', 'Administrativos', 'Directivos'],
            datasets: [{
                data: [1284, 156, 42, 7],
                backgroundColor: ['#4facfe', '#43e97b', '#fa709a', '#f6d365'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
    
    // Gráfica de rendimiento por carrera
    const rendimientoCtx = document.getElementById('rendimientoCarrerasChart').getContext('2d');
    charts.rendimiento = new Chart(rendimientoCtx, {
        type: 'bar',
        data: {
            labels: ['Ing. Sistemas', 'Administración', 'Derecho', 'Psicología', 'Arquitectura'],
            datasets: [{
                label: 'Promedio General',
                data: [88, 79, 85, 82, 76],
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
    
    // Gráfica de distribución por semestre
    const semestresCtx = document.getElementById('distribucionSemestresChart').getContext('2d');
    charts.semestres = new Chart(semestresCtx, {
        type: 'bar',
        data: {
            labels: ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°'],
            datasets: [{
                label: 'Cantidad de Alumnos',
                data: [145, 138, 142, 140, 135, 130, 125, 120, 209],
                backgroundColor: 'rgba(40, 167, 69, 0.7)',
                borderColor: '#28a745',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

// ============================================
// CARGAR TABLAS
// ============================================
function cargarTablas() {
    const mejoresMaterias = [
        { nombre: 'Programación Avanzada', promedio: 92, aprobados: 94 },
        { nombre: 'Bases de Datos', promedio: 89, aprobados: 91 },
        { nombre: 'Ingeniería de Software', promedio: 88, aprobados: 89 },
        { nombre: 'Redes de Computadoras', promedio: 87, aprobados: 88 },
        { nombre: 'Desarrollo Web', promedio: 86, aprobados: 87 }
    ];
    
    const peoresMaterias = [
        { nombre: 'Matemáticas Avanzadas', promedio: 62, reprobados: 38 },
        { nombre: 'Física Cuántica', promedio: 58, reprobados: 45 },
        { nombre: 'Economía', promedio: 65, reprobados: 32 },
        { nombre: 'Estadística', promedio: 68, reprobados: 28 },
        { nombre: 'Química', promedio: 70, reprobados: 25 }
    ];
    
    const mejoresBody = document.getElementById('mejoresMateriasBody');
    mejoresBody.innerHTML = mejoresMaterias.map(m => `
        <tr>
            <td>${m.nombre}</td>
            <td class="text-success fw-bold">${m.promedio}</td>
            <td>${m.aprobados}%</td>
        </tr>
    `).join('');
    
    const peoresBody = document.getElementById('peoresMateriasBody');
    peoresBody.innerHTML = peoresMaterias.map(m => `
        <tr>
            <td>${m.nombre}</td>
            <td class="text-danger fw-bold">${m.promedio}</td>
            <td>${m.reprobados}%</td>
        </tr>
    `).join('');
}

// ============================================
// CARGAR ACTIVIDAD RECIENTE
// ============================================
function cargarActividadReciente() {
    const actividades = [
        { fecha: '2024-01-15 10:30', usuario: 'admin@universidad.edu', accion: 'Creación de usuario', detalle: 'Nuevo alumno registrado' },
        { fecha: '2024-01-15 09:15', usuario: 'directivo@universidad.edu', accion: 'Edición de materia', detalle: 'Se actualizó Programación Avanzada' },
        { fecha: '2024-01-14 16:45', usuario: 'admin@universidad.edu', accion: 'Eliminación de usuario', detalle: 'Usuario inactivo eliminado' },
        { fecha: '2024-01-14 14:20', usuario: 'maestro@universidad.edu', accion: 'Calificación', detalle: 'Calificaciones del parcial 1' },
        { fecha: '2024-01-14 11:00', usuario: 'alumno@universidad.edu', accion: 'Entrega de tarea', detalle: 'Tarea de Programación' },
        { fecha: '2024-01-13 15:30', usuario: 'admin@universidad.edu', accion: 'Exportación de datos', detalle: 'Reporte de calificaciones' }
    ];
    
    const body = document.getElementById('actividadRecienteBody');
    body.innerHTML = actividades.map(act => `
        <tr>
            <td>${act.fecha}</td>
            <td>${act.usuario}</td>
            <td><span class="badge bg-info">${act.accion}</span></td>
            <td>${act.detalle}</td>
        </tr>
    `).join('');
}

// ============================================
// REDIRIGIR A OTRAS PÁGINAS
// ============================================
function irA(pagina) {
    window.location.href = `${pagina}.html`;
}

// ============================================
// EXPORTAR A EXCEL
// ============================================
function exportarExcelGeneral() {
    const data = [
        ['ADMINISTRACIÓN TOTAL - MI UNIVERSIDAD'],
        [''],
        ['ESTADÍSTICAS GENERALES'],
        ['Total Alumnos', '1,284'],
        ['Total Maestros', '156'],
        ['Total Materias', '89'],
        ['Total Cursos Activos', '234'],
        ['Total Usuarios', '1,489'],
        [''],
        ['MEJORES MATERIAS'],
        ['Materia', 'Promedio', 'Aprobados'],
        ['Programación Avanzada', '92', '94%'],
        ['Bases de Datos', '89', '91%'],
        ['Ingeniería de Software', '88', '89%'],
        ['Redes de Computadoras', '87', '88%'],
        ['Desarrollo Web', '86', '87%'],
        [''],
        ['MATERIAS CON MAYOR REPROBACIÓN'],
        ['Materia', 'Promedio', 'Reprobados'],
        ['Matemáticas Avanzadas', '62', '38%'],
        ['Física Cuántica', '58', '45%'],
        ['Economía', '65', '32%'],
        ['Estadística', '68', '28%'],
        ['Química', '70', '25%']
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AdministracionTotal');
    XLSX.writeFile(wb, `AdministracionTotal_${new Date().toISOString().slice(0, 10)}.xlsx`);
    
    mostrarMensaje('✅ Datos exportados correctamente');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.querySelector('.admin-total-container');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `AdministracionTotal_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
    mostrarMensaje('✅ PDF exportado correctamente');
}

// ============================================
// IMPRIMIR DASHBOARD
// ============================================
function imprimirDashboard() {
    window.print();
}

// ============================================
// MOSTRAR MENSAJE
// ============================================
function mostrarMensaje(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.textContent = mensaje;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 9999;
        font-weight: 500;
        animation: fadeInOut 2s ease forwards;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);