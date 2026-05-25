/* ============================================
   ESTADÍSTICAS GLOBALES JS - MI UNIVERSIDAD
   ============================================ */

// Variables globales
let charts = {};
let datosGlobales = {};

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
    const anio = document.getElementById('selectAnio').value;
    const semestre = document.getElementById('selectSemestre').value;
    
    // Actualizar fecha
    const fechaTexto = semestre === '1' ? 'Enero - Junio' : 'Agosto - Diciembre';
    document.getElementById('fechaActual').textContent = `${fechaTexto} ${anio}`;
    
    // Datos simulados
    datosGlobales = {
        totalAlumnos: 2847,
        totalMaestros: 156,
        totalMaterias: 89,
        promedioGeneral: 82.4,
        tasaAprobacion: 78.5,
        tasaTitulacion: 65.2,
        variaciones: {
            alumnos: 5.2,
            maestros: 3.1,
            materias: 2.5,
            promedio: 1.8,
            aprobacion: 2.3,
            titulacion: 1.5
        },
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
        genero: {
            labels: ['Masculino', 'Femenino', 'Otro'],
            datos: [52, 46, 2]
        },
        edad: {
            labels: ['18-20', '21-23', '24-26', '27-30', '30+'],
            datos: [35, 40, 15, 7, 3]
        },
        mejoresMaterias: [
            { nombre: 'Programación Avanzada', promedio: 92, aprobados: 94 },
            { nombre: 'Bases de Datos', promedio: 89, aprobados: 91 },
            { nombre: 'Ingeniería de Software', promedio: 88, aprobados: 89 },
            { nombre: 'Redes de Computadoras', promedio: 87, aprobados: 88 },
            { nombre: 'Desarrollo Web', promedio: 86, aprobados: 87 }
        ],
        peoresMaterias: [
            { nombre: 'Matemáticas Avanzadas', promedio: 62, reprobados: 38 },
            { nombre: 'Física Cuántica', promedio: 58, reprobados: 45 },
            { nombre: 'Economía', promedio: 65, reprobados: 32 },
            { nombre: 'Estadística', promedio: 68, reprobados: 28 },
            { nombre: 'Química', promedio: 70, reprobados: 25 }
        ]
    };
    
    actualizarKPIs();
    actualizarTablas();
    crearGraficas();
}

// ============================================
// ACTUALIZAR KPIs
// ============================================
function actualizarKPIs() {
    document.getElementById('totalAlumnos').textContent = datosGlobales.totalAlumnos.toLocaleString();
    document.getElementById('totalMaestros').textContent = datosGlobales.totalMaestros;
    document.getElementById('totalMaterias').textContent = datosGlobales.totalMaterias;
    document.getElementById('promedioGeneral').textContent = datosGlobales.promedioGeneral;
    document.getElementById('tasaAprobacion').textContent = datosGlobales.tasaAprobacion + '%';
    document.getElementById('tasaTitulacion').textContent = datosGlobales.tasaTitulacion + '%';
    
    document.getElementById('varAlumnos').textContent = `+${datosGlobales.variaciones.alumnos}%`;
    document.getElementById('varMaestros').textContent = `+${datosGlobales.variaciones.maestros}%`;
    document.getElementById('varMaterias').textContent = `+${datosGlobales.variaciones.materias}%`;
    document.getElementById('varPromedio').textContent = `+${datosGlobales.variaciones.promedio}%`;
    document.getElementById('varAprobacion').textContent = `+${datosGlobales.variaciones.aprobacion}%`;
    document.getElementById('varTitulacion').textContent = `+${datosGlobales.variaciones.titulacion}%`;
}

// ============================================
// ACTUALIZAR TABLAS
// ============================================
function actualizarTablas() {
    const mejoresBody = document.getElementById('mejoresMateriasBody');
    mejoresBody.innerHTML = datosGlobales.mejoresMaterias.map(m => `
        <tr>
            <td>${m.nombre}</td>
            <td class="text-success fw-bold">${m.promedio}</td>
            <td>${m.aprobados}%</td>
        </tr>
    `).join('');
    
    const peoresBody = document.getElementById('peoresMateriasBody');
    peoresBody.innerHTML = datosGlobales.peoresMaterias.map(m => `
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
            labels: datosGlobales.evolucion.labels,
            datasets: [{
                label: 'Promedio General',
                data: datosGlobales.evolucion.datos,
                borderColor: '#1e3c72',
                backgroundColor: 'rgba(30, 60, 114, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1e3c72',
                pointBorderColor: 'white',
                pointRadius: 5
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
            labels: datosGlobales.estado.labels,
            datasets: [{
                data: datosGlobales.estado.datos,
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
            labels: datosGlobales.carreras.labels,
            datasets: [{
                label: 'Promedio por Carrera',
                data: datosGlobales.carreras.datos,
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
            labels: datosGlobales.semestres.labels,
            datasets: [{
                label: 'Promedio por Semestre',
                data: datosGlobales.semestres.datos,
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
    
    // Gráfica de género
    const generoCtx = document.getElementById('generoChart').getContext('2d');
    if (charts.genero) charts.genero.destroy();
    charts.genero = new Chart(generoCtx, {
        type: 'pie',
        data: {
            labels: datosGlobales.genero.labels,
            datasets: [{
                data: datosGlobales.genero.datos,
                backgroundColor: ['#4facfe', '#fa709a', '#f6d365']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
    
    // Gráfica de edad
    const edadCtx = document.getElementById('edadChart').getContext('2d');
    if (charts.edad) charts.edad.destroy();
    charts.edad = new Chart(edadCtx, {
        type: 'bar',
        data: {
            labels: datosGlobales.edad.labels,
            datasets: [{
                label: 'Distribución por Edad',
                data: datosGlobales.edad.datos,
                backgroundColor: 'rgba(23, 162, 184, 0.7)',
                borderColor: '#17a2b8',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Porcentaje (%)' } } }
        }
    });
}

// ============================================
// EXPORTAR EXCEL COMPLETO
// ============================================
function exportarExcelCompleto() {
    const data = [
        ['ESTADÍSTICAS GLOBALES - MI UNIVERSIDAD'],
        [''],
        ['MÉTRICAS PRINCIPALES'],
        ['Total Alumnos', datosGlobales.totalAlumnos],
        ['Total Maestros', datosGlobales.totalMaestros],
        ['Total Materias', datosGlobales.totalMaterias],
        ['Promedio General', datosGlobales.promedioGeneral],
        ['Tasa de Aprobación', datosGlobales.tasaAprobacion + '%'],
        ['Tasa de Titulación', datosGlobales.tasaTitulacion + '%'],
        [''],
        ['RENDIMIENTO POR CARRERA'],
        ...datosGlobales.carreras.labels.map((c, i) => [c, datosGlobales.carreras.datos[i]]),
        [''],
        ['RENDIMIENTO POR SEMESTRE'],
        ...datosGlobales.semestres.labels.map((s, i) => [s, datosGlobales.semestres.datos[i]]),
        [''],
        ['MEJORES MATERIAS'],
        ...datosGlobales.mejoresMaterias.map(m => [m.nombre, m.promedio, `${m.aprobados}% aprobados`]),
        [''],
        ['MATERIAS CON MAYOR REPROBACIÓN'],
        ...datosGlobales.peoresMaterias.map(m => [m.nombre, m.promedio, `${m.reprobados}% reprobados`]),
        [''],
        ['DISTRIBUCIÓN POR GÉNERO'],
        ...datosGlobales.genero.labels.map((g, i) => [g, `${datosGlobales.genero.datos[i]}%`]),
        [''],
        ['DISTRIBUCIÓN POR EDAD'],
        ...datosGlobales.edad.labels.map((e, i) => [e, `${datosGlobales.edad.datos[i]}%`])
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'EstadisticasGlobales');
    XLSX.writeFile(wb, `EstadisticasGlobales_${new Date().toISOString().slice(0, 10)}.xlsx`);
    
    mostrarMensaje('✅ Excel exportado correctamente');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.querySelector('.estadisticas-globales-container');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `EstadisticasGlobales_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
    mostrarMensaje('✅ PDF exportado correctamente');
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