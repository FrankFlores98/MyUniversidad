/* ============================================
   ESTADÍSTICAS JS - MI UNIVERSIDAD
   ============================================ */

// Variables globales
let charts = {};
let estadisticasData = {};

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    cargarEstadisticas();
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
// CARGAR ESTADÍSTICAS
// ============================================
function cargarEstadisticas() {
    const periodo = document.getElementById('selectPeriodo').value;
    const tipo = document.getElementById('selectTipo').value;
    
    // Datos simulados
    estadisticasData = {
        totalAlumnos: 2847,
        totalMaestros: 156,
        totalMaterias: 89,
        promedioGeneral: 82.4,
        variacionAlumnos: 5.2,
        variacionMaestros: 3.1,
        variacionMaterias: 2.5,
        variacionPromedio: 1.8,
        evolucion: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datos: [78, 79, 80, 81, 82, 83, 82, 84, 85, 86, 87, 88]
        },
        estado: {
            labels: ['Aprobados', 'Reprobados', 'En Curso'],
            datos: [72, 18, 10]
        },
        carreras: {
            labels: ['Ing. Sistemas', 'Administración', 'Derecho', 'Psicología', 'Arquitectura'],
            datos: [88, 79, 85, 82, 76]
        },
        semestres: {
            labels: ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°'],
            datos: [75, 78, 80, 82, 84, 86, 85, 87, 88]
        },
        mejoresMaterias: [
            { nombre: 'Programación Avanzada', promedio: 92, aprobados: 94 },
            { nombre: 'Bases de Datos', promedio: 89, aprobados: 91 },
            { nombre: 'Ingeniería de Software', promedio: 88, aprobados: 89 },
            { nombre: 'Redes de Computadoras', promedio: 87, aprobados: 88 }
        ],
        peoresMaterias: [
            { nombre: 'Matemáticas Avanzadas', promedio: 62, reprobados: 38 },
            { nombre: 'Física Cuántica', promedio: 58, reprobados: 45 },
            { nombre: 'Economía', promedio: 65, reprobados: 32 },
            { nombre: 'Estadística', promedio: 68, reprobados: 28 }
        ]
    };
    
    actualizarTarjetas();
    actualizarTablas();
    crearGraficas();
}

// ============================================
// ACTUALIZAR TARJETAS
// ============================================
function actualizarTarjetas() {
    document.getElementById('totalAlumnos').textContent = estadisticasData.totalAlumnos.toLocaleString();
    document.getElementById('totalMaestros').textContent = estadisticasData.totalMaestros;
    document.getElementById('totalMaterias').textContent = estadisticasData.totalMaterias;
    document.getElementById('promedioGeneral').textContent = estadisticasData.promedioGeneral;
    
    const varAlumnos = document.getElementById('variacionAlumnos');
    const varMaestros = document.getElementById('variacionMaestros');
    const varMaterias = document.getElementById('variacionMaterias');
    const varPromedio = document.getElementById('variacionPromedio');
    
    varAlumnos.innerHTML = `${estadisticasData.variacionAlumnos > 0 ? '+' : ''}${estadisticasData.variacionAlumnos}% vs período anterior`;
    varAlumnos.className = estadisticasData.variacionAlumnos > 0 ? 'text-success' : 'text-danger';
    
    varMaestros.innerHTML = `${estadisticasData.variacionMaestros > 0 ? '+' : ''}${estadisticasData.variacionMaestros}% vs período anterior`;
    varMaestros.className = estadisticasData.variacionMaestros > 0 ? 'text-success' : 'text-danger';
    
    varMaterias.innerHTML = `${estadisticasData.variacionMaterias > 0 ? '+' : ''}${estadisticasData.variacionMaterias}% vs período anterior`;
    varMaterias.className = estadisticasData.variacionMaterias > 0 ? 'text-success' : 'text-danger';
    
    varPromedio.innerHTML = `${estadisticasData.variacionPromedio > 0 ? '+' : ''}${estadisticasData.variacionPromedio}% vs período anterior`;
    varPromedio.className = estadisticasData.variacionPromedio > 0 ? 'text-success' : 'text-danger';
}

// ============================================
// ACTUALIZAR TABLAS
// ============================================
function actualizarTablas() {
    const mejoresBody = document.getElementById('mejoresMateriasBody');
    const peoresBody = document.getElementById('peoresMateriasBody');
    
    mejoresBody.innerHTML = estadisticasData.mejoresMaterias.map(m => `
        <tr>
            <td>${m.nombre}</td>
            <td class="text-success fw-bold">${m.promedio}</td>
            <td>${m.aprobados}%</td>
        </tr>
    `).join('');
    
    peoresBody.innerHTML = estadisticasData.peoresMaterias.map(m => `
        <tr>
            <td>${m.nombre}</td>
            <td class="text-danger fw-bold">${m.promedio}</td>
            <td>${m.reprobados}%</td>
        </tr>
    `).join('');
}

// ============================================
// CREAR GRÁFICAS
// ============================================
function crearGraficas() {
    // Gráfica de evolución
    const evolucionCtx = document.getElementById('evolucionChart').getContext('2d');
    if (charts.evolucion) charts.evolucion.destroy();
    charts.evolucion = new Chart(evolucionCtx, {
        type: 'line',
        data: {
            labels: estadisticasData.evolucion.labels,
            datasets: [{
                label: 'Promedio General',
                data: estadisticasData.evolucion.datos,
                borderColor: '#1e3c72',
                backgroundColor: 'rgba(30, 60, 114, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1e3c72',
                pointBorderColor: 'white',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Promedio' } } }
        }
    });
    
    // Gráfica de estado
    const estadoCtx = document.getElementById('estadoChart').getContext('2d');
    if (charts.estado) charts.estado.destroy();
    charts.estado = new Chart(estadoCtx, {
        type: 'doughnut',
        data: {
            labels: estadisticasData.estado.labels,
            datasets: [{
                data: estadisticasData.estado.datos,
                backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
    
    // Gráfica por carrera
    const carrerasCtx = document.getElementById('carrerasChart').getContext('2d');
    if (charts.carreras) charts.carreras.destroy();
    charts.carreras = new Chart(carrerasCtx, {
        type: 'bar',
        data: {
            labels: estadisticasData.carreras.labels,
            datasets: [{
                label: 'Promedio por Carrera',
                data: estadisticasData.carreras.datos,
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
    
    // Gráfica por semestre
    const semestresCtx = document.getElementById('semestresChart').getContext('2d');
    if (charts.semestres) charts.semestres.destroy();
    charts.semestres = new Chart(semestresCtx, {
        type: 'bar',
        data: {
            labels: estadisticasData.semestres.labels,
            datasets: [{
                label: 'Promedio por Semestre',
                data: estadisticasData.semestres.datos,
                backgroundColor: 'rgba(40, 167, 69, 0.7)',
                borderColor: '#28a745',
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

// ============================================
// EXPORTAR A EXCEL
// ============================================
function exportarExcel() {
    const data = [
        ['ESTADÍSTICAS ACADÉMICAS'],
        [''],
        ['MÉTRICAS PRINCIPALES'],
        ['Total Alumnos', estadisticasData.totalAlumnos],
        ['Total Maestros', estadisticasData.totalMaestros],
        ['Total Materias', estadisticasData.totalMaterias],
        ['Promedio General', estadisticasData.promedioGeneral],
        [''],
        ['RENDIMIENTO POR CARRERA'],
        ...estadisticasData.carreras.labels.map((c, i) => [c, estadisticasData.carreras.datos[i]]),
        [''],
        ['RENDIMIENTO POR SEMESTRE'],
        ...estadisticasData.semestres.labels.map((s, i) => [s, estadisticasData.semestres.datos[i]]),
        [''],
        ['MEJORES MATERIAS'],
        ...estadisticasData.mejoresMaterias.map(m => [m.nombre, m.promedio, `${m.aprobados}% aprobados`]),
        [''],
        ['MATERIAS CON MAYOR REPROBACIÓN'],
        ...estadisticasData.peoresMaterias.map(m => [m.nombre, m.promedio, `${m.reprobados}% reprobados`])
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estadisticas');
    XLSX.writeFile(wb, `Estadisticas_${document.getElementById('selectPeriodo').value}.xlsx`);
    
    mostrarMensaje('Excel exportado correctamente');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.querySelector('.estadisticas-container');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Estadisticas_${document.getElementById('selectPeriodo').value}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
    mostrarMensaje('PDF exportado correctamente');
}

// ============================================
// IMPRIMIR ESTADÍSTICAS
// ============================================
function imprimirEstadisticas() {
    window.print();
}

// ============================================
// MOSTRAR MENSAJE
// ============================================
function mostrarMensaje(mensaje) {
    const toast = document.createElement('div');
    toast.textContent = `✅ ${mensaje}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 9999;
        font-weight: 500;
        animation: fadeInOut 2s ease forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);