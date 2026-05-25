/* ============================================
   REPORTES JS - MI UNIVERSIDAD
   VERSIÓN COMPLETA CORREGIDA (SIN DUPLICADOS)
   EXPORTACIÓN A PDF, EXCEL, WORD E IMPRESIÓN FUNCIONAL
   ============================================ */

// Variables globales
let formatoActual = 'pdf';

// Datos de materias por curso
const cursosData = {
    '1': {
        nombre: 'Matemáticas IV',
        codigo: 'MAT-304',
        alumnos: [
            { matricula: '2023001', nombre: 'Juan Pérez', parcial1: 85, parcial2: 88, parcial3: 90, final: 88, estado: 'Aprobado', asistencia: 95 },
            { matricula: '2023002', nombre: 'María García', parcial1: 78, parcial2: 82, parcial3: 75, final: 78, estado: 'Aprobado', asistencia: 90 },
            { matricula: '2023003', nombre: 'Carlos López', parcial1: 65, parcial2: 68, parcial3: 70, final: 68, estado: 'Reprobado', asistencia: 80 },
            { matricula: '2023004', nombre: 'Ana Martínez', parcial1: 92, parcial2: 88, parcial3: 95, final: 92, estado: 'Aprobado', asistencia: 92 }
        ],
        totalAlumnos: 28,
        aprobados: 24,
        reprobados: 4,
        promedio: 85.5
    },
    '2': {
        nombre: 'Desarrollo Web Avanzado',
        codigo: 'WEB-401',
        alumnos: [
            { matricula: '2023010', nombre: 'Luis Torres', parcial1: 88, parcial2: 90, parcial3: 92, final: 90, estado: 'Aprobado', asistencia: 94 },
            { matricula: '2023011', nombre: 'Laura Díaz', parcial1: 95, parcial2: 92, parcial3: 94, final: 93, estado: 'Aprobado', asistencia: 96 },
            { matricula: '2023012', nombre: 'Javier Sánchez', parcial1: 70, parcial2: 75, parcial3: 72, final: 72, estado: 'Aprobado', asistencia: 85 }
        ],
        totalAlumnos: 25,
        aprobados: 23,
        reprobados: 2,
        promedio: 88.2
    },
    '3': {
        nombre: 'Bases de Datos Avanzadas',
        codigo: 'BD-401',
        alumnos: [
            { matricula: '2023020', nombre: 'Sofía Ramírez', parcial1: 82, parcial2: 85, parcial3: 88, final: 85, estado: 'Aprobado', asistencia: 88 },
            { matricula: '2023021', nombre: 'Diego Torres', parcial1: 75, parcial2: 78, parcial3: 80, final: 78, estado: 'Aprobado', asistencia: 82 }
        ],
        totalAlumnos: 30,
        aprobados: 26,
        reprobados: 4,
        promedio: 82.3
    },
    '4': {
        nombre: 'Programación Móvil',
        codigo: 'MOV-402',
        alumnos: [
            { matricula: '2023030', nombre: 'Valentina Castro', parcial1: 90, parcial2: 88, parcial3: 92, final: 90, estado: 'Aprobado', asistencia: 93 },
            { matricula: '2023031', nombre: 'Andrés Mora', parcial1: 85, parcial2: 82, parcial3: 88, final: 85, estado: 'Aprobado', asistencia: 89 }
        ],
        totalAlumnos: 22,
        aprobados: 20,
        reprobados: 2,
        promedio: 86.8
    }
};

// Datos por carrera
const carrerasData = {
    'Ingeniería en Sistemas': {
        materias: [
            { nombre: 'Matemáticas IV', alumnos: 28, aprobados: 24, reprobados: 4, promedio: 85.5, tasaAprobacion: 85.7 },
            { nombre: 'Desarrollo Web', alumnos: 25, aprobados: 23, reprobados: 2, promedio: 88.2, tasaAprobacion: 92.0 },
            { nombre: 'Bases de Datos', alumnos: 30, aprobados: 26, reprobados: 4, promedio: 82.3, tasaAprobacion: 86.7 },
            { nombre: 'Programación Móvil', alumnos: 22, aprobados: 20, reprobados: 2, promedio: 86.8, tasaAprobacion: 90.9 }
        ]
    },
    'Administración': {
        materias: [
            { nombre: 'Administración I', alumnos: 35, aprobados: 30, reprobados: 5, promedio: 80.5, tasaAprobacion: 85.7 },
            { nombre: 'Finanzas', alumnos: 28, aprobados: 22, reprobados: 6, promedio: 75.2, tasaAprobacion: 78.6 }
        ]
    },
    'Derecho': {
        materias: [
            { nombre: 'Introducción al Derecho', alumnos: 40, aprobados: 36, reprobados: 4, promedio: 82.5, tasaAprobacion: 90.0 },
            { nombre: 'Derecho Civil', alumnos: 35, aprobados: 28, reprobados: 7, promedio: 78.3, tasaAprobacion: 80.0 }
        ]
    },
    'Psicología': {
        materias: [
            { nombre: 'Psicología General', alumnos: 38, aprobados: 32, reprobados: 6, promedio: 79.5, tasaAprobacion: 84.2 },
            { nombre: 'Psicología Clínica', alumnos: 30, aprobados: 25, reprobados: 5, promedio: 81.2, tasaAprobacion: 83.3 }
        ]
    }
};

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    cambiarTipoReporte();
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
// CAMBIAR TIPO DE REPORTE
// ============================================
function cambiarTipoReporte() {
    const tipo = document.getElementById('tipoReporte').value;
    const carreraContainer = document.getElementById('carreraContainer');
    
    if (tipo === 'academico' || tipo === 'calificaciones' || tipo === 'asistencia' || tipo === 'rendimiento') {
        if (carreraContainer) carreraContainer.style.display = 'block';
    } else {
        if (carreraContainer) carreraContainer.style.display = 'none';
    }
}

// ============================================
// SET FORMATO
// ============================================
function setFormato(formato) {
    formatoActual = formato;
    
    document.querySelectorAll('.btn-formato').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.btn-formato.${formato}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// ============================================
// GENERAR REPORTE
// ============================================
function generarReporte() {
    const tipo = document.getElementById('tipoReporte').value;
    const periodo = document.getElementById('periodo').value;
    const curso = document.getElementById('curso').value;
    const carrera = document.getElementById('carrera')?.value || 'todas';
    
    let periodoTexto = periodo === '2024-1' ? 'Enero - Junio 2024' : 
                       periodo === '2024-2' ? 'Agosto - Diciembre 2024' : 'Enero - Junio 2025';
    
    let cursoSeleccionado = curso === 'todos' ? null : cursosData[curso];
    
    switch(tipo) {
        case 'academico':
            generarReporteAcademico(periodoTexto, curso, carrera);
            break;
        case 'calificaciones':
            generarReporteCalificaciones(periodoTexto, curso, cursoSeleccionado);
            break;
        case 'asistencia':
            generarReporteAsistencia(periodoTexto, curso, cursoSeleccionado);
            break;
        case 'usuarios':
            generarReporteUsuarios(periodoTexto);
            break;
        case 'kardex':
            generarReporteKardex();
            break;
        case 'rendimiento':
            generarReporteRendimiento(periodoTexto, carrera);
            break;
        default:
            alert('Selecciona un tipo de reporte');
    }
    
    // Auto-exportar según el formato seleccionado
    setTimeout(() => {
        if (formatoActual === 'pdf') exportarPDF();
        else if (formatoActual === 'excel') exportarExcel();
        else if (formatoActual === 'word') exportarWord();
        else if (formatoActual === 'print') imprimirReporte();
    }, 100);
}

// ============================================
// GENERAR REPORTE ACADÉMICO
// ============================================
function generarReporteAcademico(periodo, curso, carrera) {
    let materiasHtml = '';
    let totalAlumnos = 0;
    let totalAprobados = 0;
    let totalReprobados = 0;
    let sumaPromedios = 0;
    let contadorMaterias = 0;
    
    if (curso !== 'todos' && cursosData[curso]) {
        const c = cursosData[curso];
        materiasHtml = `<tr><td>${c.nombre} (${c.codigo})</td><td>${c.totalAlumnos}</td><td>${c.aprobados}</td><td>${c.reprobados}</td><td>${c.promedio}</td><td>${((c.aprobados / c.totalAlumnos) * 100).toFixed(1)}%</td></tr>`;
        totalAlumnos = c.totalAlumnos;
        totalAprobados = c.aprobados;
        totalReprobados = c.reprobados;
        sumaPromedios = c.promedio;
        contadorMaterias = 1;
    } else if (carrera !== 'todas' && carrerasData[carrera]) {
        const carreraData = carrerasData[carrera];
        carreraData.materias.forEach(m => {
            materiasHtml += `<tr><td>${m.nombre}</td><td>${m.alumnos}</td><td>${m.aprobados}</td><td>${m.reprobados}</td><td>${m.promedio}</td><td>${m.tasaAprobacion}%</td></tr>`;
            totalAlumnos += m.alumnos;
            totalAprobados += m.aprobados;
            totalReprobados += m.reprobados;
            sumaPromedios += m.promedio;
            contadorMaterias++;
        });
    } else {
        Object.keys(cursosData).forEach(key => {
            const c = cursosData[key];
            materiasHtml += `<tr><td>${c.nombre} (${c.codigo})</td><td>${c.totalAlumnos}</td><td>${c.aprobados}</td><td>${c.reprobados}</td><td>${c.promedio}</td><td>${((c.aprobados / c.totalAlumnos) * 100).toFixed(1)}%</td></tr>`;
            totalAlumnos += c.totalAlumnos;
            totalAprobados += c.aprobados;
            totalReprobados += c.reprobados;
            sumaPromedios += c.promedio;
            contadorMaterias++;
        });
    }
    
    const promedioGeneral = contadorMaterias > 0 ? (sumaPromedios / contadorMaterias).toFixed(1) : 0;
    const tasaAprobacionGeneral = totalAlumnos > 0 ? ((totalAprobados / totalAlumnos) * 100).toFixed(1) : 0;
    
    const contenido = `
        <div class="reporte-contenido" id="reporteContent">
            <div class="reporte-header">
                <h2>📊 Reporte Académico</h2>
                <p>Mi Universidad - Sistema de Gestión Académica</p>
                <p><strong>Período:</strong> ${periodo}</p>
                <p><strong>Curso:</strong> ${curso === 'todos' ? 'Todos los cursos' : (cursosData[curso]?.nombre || curso)}</p>
                <p><strong>Carrera:</strong> ${carrera === 'todas' ? 'Todas las carreras' : carrera}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Generado por:</strong> ${localStorage.getItem('userNombre') || 'Administrador'}</p>
            </div>
            <table class="reporte-tabla" id="tablaExportar">
                <thead><tr><th>Materia</th><th>Alumnos</th><th>Aprobados</th><th>Reprobados</th><th>Promedio</th><th>Tasa Aprobación</th></tr></thead>
                <tbody>${materiasHtml}</tbody>
                <tfoot><tr><th>TOTAL / PROMEDIO</th><th>${totalAlumnos}</th><th>${totalAprobados}</th><th>${totalReprobados}</th><th>${promedioGeneral}</th><th>${tasaAprobacionGeneral}%</th></tr></tfoot>
            </table>
            <div class="reporte-footer"><p>Reporte generado por Mi Universidad</p></div>
        </div>
    `;
    mostrarPreview(contenido);
}

// ============================================
// GENERAR REPORTE DE CALIFICACIONES
// ============================================
function generarReporteCalificaciones(periodo, cursoId, cursoData) {
    let alumnosHtml = '';
    if (cursoId !== 'todos' && cursoData) {
        cursoData.alumnos.forEach(alumno => {
            alumnosHtml += `<tr><td>${alumno.matricula}</td><td>${alumno.nombre}</td><td>${alumno.parcial1}</td><td>${alumno.parcial2}</td><td>${alumno.parcial3}</td><td>${alumno.final}</td><td>${alumno.estado}</td></tr>`;
        });
    } else {
        alumnosHtml = `<tr><td colspan="7" class="text-center">Selecciona un curso específico</td></tr>`;
    }
    
    const contenido = `
        <div class="reporte-contenido" id="reporteContent">
            <div class="reporte-header">
                <h2>📝 Reporte de Calificaciones</h2>
                <p>Mi Universidad - Sistema de Gestión Académica</p>
                <p><strong>Período:</strong> ${periodo}</p>
                <p><strong>Curso:</strong> ${cursoData ? cursoData.nombre : 'No seleccionado'}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <table class="reporte-tabla" id="tablaExportar">
                <thead><tr><th>Matrícula</th><th>Alumno</th><th>Parcial 1</th><th>Parcial 2</th><th>Parcial 3</th><th>Final</th><th>Estado</th></tr></thead>
                <tbody>${alumnosHtml}</tbody>
            </table>
            <div class="reporte-footer">${cursoData ? `<p>Promedio: ${cursoData.promedio} | Aprobación: ${((cursoData.aprobados / cursoData.totalAlumnos) * 100).toFixed(1)}%</p>` : ''}</div>
        </div>
    `;
    mostrarPreview(contenido);
}

// ============================================
// GENERAR REPORTE DE ASISTENCIA
// ============================================
function generarReporteAsistencia(periodo, cursoId, cursoData) {
    let alumnosHtml = '';
    let totalAsistencia = 0;
    if (cursoId !== 'todos' && cursoData) {
        cursoData.alumnos.forEach(alumno => {
            alumnosHtml += `<tr><td>${alumno.matricula}</td><td>${alumno.nombre}</td><td>40</td><td>${Math.round(40 * alumno.asistencia / 100)}</td><td>${40 - Math.round(40 * alumno.asistencia / 100)}</td><td>${alumno.asistencia}%</td></tr>`;
            totalAsistencia += alumno.asistencia;
        });
    } else {
        alumnosHtml = `<tr><td colspan="6" class="text-center">Selecciona un curso específico</td></tr>`;
    }
    const promedioAsistencia = cursoData && cursoData.alumnos.length > 0 ? (totalAsistencia / cursoData.alumnos.length).toFixed(1) : 0;
    
    const contenido = `
        <div class="reporte-contenido" id="reporteContent">
            <div class="reporte-header">
                <h2>📋 Reporte de Asistencia</h2>
                <p>Mi Universidad - Sistema de Gestión Académica</p>
                <p><strong>Período:</strong> ${periodo}</p>
                <p><strong>Curso:</strong> ${cursoData ? cursoData.nombre : 'No seleccionado'}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <table class="reporte-tabla" id="tablaExportar">
                <thead><tr><th>Matrícula</th><th>Alumno</th><th>Clases</th><th>Asistencias</th><th>Faltas</th><th>Porcentaje</th></tr></thead>
                <tbody>${alumnosHtml}</tbody>
                <tfoot><tr><td colspan="5"><strong>Promedio General</strong></td><td><strong>${promedioAsistencia}%</strong></td></tr></tfoot>
            </table>
        </div>
    `;
    mostrarPreview(contenido);
}

// ============================================
// GENERAR REPORTE DE USUARIOS
// ============================================
function generarReporteUsuarios(periodo) {
    const contenido = `
        <div class="reporte-contenido" id="reporteContent">
            <div class="reporte-header">
                <h2>👥 Reporte de Usuarios</h2>
                <p>Mi Universidad - Sistema de Gestión Académica</p>
                <p><strong>Período:</strong> ${periodo}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div class="reporte-info"><p><strong>Total de Usuarios:</strong> 1,489</p><p>👨‍🎓 Alumnos: 1,284 | 👨‍🏫 Maestros: 156 | 👔 Administrativos: 42 | 👑 Directivos: 7</p></div>
            <table class="reporte-tabla" id="tablaExportar">
                <thead><tr><th>Rol</th><th>Cantidad</th><th>Activos</th><th>Inactivos</th><th>Porcentaje</th></tr></thead>
                <tbody>
                    <tr><td>Alumnos</td><td>1,284</td><td>1,250</td><td>34</td><td>86.2%</td></tr>
                    <tr><td>Maestros</td><td>156</td><td>152</td><td>4</td><td>10.5%</td></tr>
                    <tr><td>Administrativos</td><td>42</td><td>40</td><td>2</td><td>2.8%</td></tr>
                    <tr><td>Directivos</td><td>7</td><td>7</td><td>0</td><td>0.5%</td></tr>
                </tbody>
                <tfoot><tr><th>TOTAL</th><th>1,489</th><th>1,449</th><th>40</th><th>100%</th></tr></tfoot>
            </table>
        </div>
    `;
    mostrarPreview(contenido);
}

// ============================================
// GENERAR REPORTE DE KARDEX
// ============================================
function generarReporteKardex() {
    const contenido = `
        <div class="reporte-contenido" id="reporteContent">
            <div class="reporte-header">
                <h2>📚 Reporte de Kardex</h2>
                <p>Mi Universidad - Sistema de Gestión Académica</p>
                <p><strong>Alumno:</strong> ${localStorage.getItem('userNombre') || 'Ejemplo Alumno'}</p>
                <p><strong>Matrícula:</strong> ${localStorage.getItem('userMatricula') || '2024001'}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <table class="reporte-tabla" id="tablaExportar">
                <thead><tr><th>Semestre</th><th>Materia</th><th>Créditos</th><th>Calificación</th><th>Estado</th></tr></thead>
                <tbody>
                    <tr><td>1°</td><td>Matemáticas I</td><td>5</td><td>85</td><td>Aprobado</td></tr>
                    <tr><td>1°</td><td>Programación</td><td>6</td><td>92</td><td>Aprobado</td></tr>
                    <tr><td>2°</td><td>Matemáticas II</td><td>5</td><td>82</td><td>Aprobado</td></tr>
                    <tr><td>2°</td><td>Bases de Datos</td><td>5</td><td>78</td><td>Aprobado</td></tr>
                </tbody>
                <tfoot><tr><td colspan="2"><strong>Promedio General</strong></td><td colspan="3"><strong>84.25</strong></td></tr></tfoot>
            </table>
        </div>
    `;
    mostrarPreview(contenido);
}

// ============================================
// GENERAR REPORTE DE RENDIMIENTO
// ============================================
function generarReporteRendimiento(periodo, carrera) {
    let carrerasHtml = '';
    Object.keys(carrerasData).forEach(carreraNombre => {
        const carreraData = carrerasData[carreraNombre];
        let totalAlumnos = 0, sumaPromedios = 0, totalAprobados = 0, totalReprobados = 0;
        carreraData.materias.forEach(m => {
            totalAlumnos += m.alumnos;
            sumaPromedios += m.promedio;
            totalAprobados += m.aprobados;
            totalReprobados += m.reprobados;
        });
        const promedioCarrera = sumaPromedios / carreraData.materias.length;
        const tasaAprobacion = (totalAprobados / totalAlumnos) * 100;
        carrerasHtml += `<tr><td>${carreraNombre}</td><td>${totalAlumnos}</td><td>${promedioCarrera.toFixed(1)}</td><td>${totalAprobados}</td><td>${totalReprobados}</td><td>${tasaAprobacion.toFixed(1)}%</td></tr>`;
    });
    
    const contenido = `
        <div class="reporte-contenido" id="reporteContent">
            <div class="reporte-header">
                <h2>📈 Reporte de Rendimiento</h2>
                <p>Mi Universidad - Sistema de Gestión Académica</p>
                <p><strong>Período:</strong> ${periodo}</p>
                <p><strong>Carrera:</strong> ${carrera === 'todas' ? 'Todas las carreras' : carrera}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <table class="reporte-tabla" id="tablaExportar">
                <thead><tr><th>Carrera</th><th>Alumnos</th><th>Promedio</th><th>Aprobados</th><th>Reprobados</th><th>Tasa Aprobación</th></tr></thead>
                <tbody>${carrerasHtml}</tbody>
            </table>
        </div>
    `;
    mostrarPreview(contenido);
}

// ============================================
// MOSTRAR VISTA PREVIA
// ============================================
function mostrarPreview(contenido) {
    const previewContainer = document.getElementById('reportePreview');
    if (previewContainer) previewContainer.innerHTML = contenido;
}

// ============================================
// EXPORTAR REPORTE A PDF
// ============================================
function exportarPDF() {
    const element = document.getElementById('reporteContent');
    if (!element) { alert('❌ Primero genera un reporte'); return; }
    const tipo = document.getElementById('tipoReporte').value;
    html2pdf().set({ margin: 0.5, filename: `Reporte_${tipo}.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }).from(element).save();
    alert('✅ PDF exportado');
}

// ============================================
// EXPORTAR REPORTE A EXCEL
// ============================================
function exportarExcel() {
    const tabla = document.getElementById('tablaExportar');
    if (!tabla) { alert('❌ Primero genera un reporte'); return; }
    const tipo = document.getElementById('tipoReporte').value;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabla);
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, `Reporte_${tipo}.xlsx`);
    alert('✅ Excel exportado');
}

// ============================================
// EXPORTAR REPORTE A WORD
// ============================================
function exportarWord() {
    const element = document.getElementById('reporteContent');
    if (!element) { alert('❌ Primero genera un reporte'); return; }
    const tipo = document.getElementById('tipoReporte').value;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Reporte ${tipo}</title><style>body{font-family:Arial;margin:40px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:8px}th{background:#1e3c72;color:#fff}</style></head><body>${element.outerHTML}</body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_${tipo}.doc`;
    link.click();
    alert('✅ Word exportado');
}

// ============================================
// IMPRIMIR REPORTE
// ============================================
function imprimirReporte() {
    const element = document.getElementById('reporteContent');
    if (!element) { alert('❌ Primero genera un reporte'); return; }
    const ventana = window.open('', '_blank');
    ventana.document.write(`<!DOCTYPE html><html><head><title>Reporte</title><style>body{font-family:Arial;margin:40px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:8px}th{background:#1e3c72;color:#fff}</style></head><body>${element.outerHTML}<script>window.onload=function(){window.print();setTimeout(function(){window.close();},500)}<\/script></body></html>`);
    ventana.document.close();
}

// ============================================
// FUNCIONES ALIAS PARA LOS BOTONES DEL HEADER
// ============================================
function exportarExcelGeneral() { exportarExcel(); }
function exportarPDFGeneral() { exportarPDF(); }
function imprimirDashboard() { imprimirReporte(); }

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);