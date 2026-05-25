/* ============================================
   KARDEX ACADÉMICO JS - MI UNIVERSIDAD
   ============================================ */

// Obtener datos del usuario
const userNombre = localStorage.getItem('userNombre') || 'Usuario';
const userEmail = localStorage.getItem('userEmail') || 'correo@miuniversidad.edu.mx';
const userMatricula = localStorage.getItem('userMatricula') || '000000';
const userRol = localStorage.getItem('userRol') || 'alumno';
const userTelefono = localStorage.getItem('userTelefono') || '5512345678';

// Datos del kardex
let kardexData = [];
let historialAcademico = [];

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    cargarKardex();
    mostrarInfoAlumno();
}

// ============================================
// MOSTRAR INFORMACIÓN DEL ALUMNO
// ============================================
function mostrarInfoAlumno() {
    document.getElementById('nombreAlumno').value = userNombre;
    document.getElementById('matriculaAlumno').value = userMatricula;
    document.getElementById('emailAlumno').value = userEmail;
    document.getElementById('telefonoAlumno').value = userTelefono;
    document.getElementById('carreraAlumno').value = 'Ingeniería en Sistemas Computacionales';
    document.getElementById('semestreAlumno').value = '6to Semestre';
    document.getElementById('tutorAlumno').value = 'Dr. Juan Pérez González';
    
    // Fecha de emisión
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('fechaEmision').textContent = fechaFormateada;
    document.getElementById('folioKardex').textContent = `K-${userMatricula}-${hoy.getFullYear()}`;
}

// ============================================
// CARGAR KARDEX (SIMULADO)
// ============================================
function cargarKardex() {
    // Datos simulados del kardex académico
    historialAcademico = [
        { semestre: '1er Semestre', codigo: 'MAT-101', materia: 'Matemáticas I', creditos: 5, calificacion: 85, letra: 'B', estado: 'aprobado' },
        { semestre: '1er Semestre', codigo: 'FIS-101', materia: 'Física I', creditos: 5, calificacion: 78, letra: 'C', estado: 'aprobado' },
        { semestre: '1er Semestre', codigo: 'PRO-101', materia: 'Introducción a la Programación', creditos: 6, calificacion: 92, letra: 'A', estado: 'aprobado' },
        { semestre: '1er Semestre', codigo: 'ING-101', materia: 'Inglés I', creditos: 4, calificacion: 88, letra: 'B', estado: 'aprobado' },
        
        { semestre: '2do Semestre', codigo: 'MAT-102', materia: 'Matemáticas II', creditos: 5, calificacion: 82, letra: 'B', estado: 'aprobado' },
        { semestre: '2do Semestre', codigo: 'FIS-102', materia: 'Física II', creditos: 5, calificacion: 75, letra: 'C', estado: 'aprobado' },
        { semestre: '2do Semestre', codigo: 'PRO-202', materia: 'Programación Estructurada', creditos: 6, calificacion: 90, letra: 'A', estado: 'aprobado' },
        { semestre: '2do Semestre', codigo: 'ING-102', materia: 'Inglés II', creditos: 4, calificacion: 85, letra: 'B', estado: 'aprobado' },
        
        { semestre: '3er Semestre', codigo: 'MAT-203', materia: 'Matemáticas III', creditos: 5, calificacion: 88, letra: 'B', estado: 'aprobado' },
        { semestre: '3er Semestre', codigo: 'BD-301', materia: 'Bases de Datos', creditos: 6, calificacion: 95, letra: 'A', estado: 'aprobado' },
        { semestre: '3er Semestre', codigo: 'PRO-303', materia: 'Programación Orientada a Objetos', creditos: 6, calificacion: 91, letra: 'A', estado: 'aprobado' },
        { semestre: '3er Semestre', codigo: 'ING-203', materia: 'Inglés III', creditos: 4, calificacion: 82, letra: 'B', estado: 'aprobado' },
        
        { semestre: '4to Semestre', codigo: 'MAT-304', materia: 'Matemáticas IV', creditos: 5, calificacion: 86, letra: 'B', estado: 'aprobado' },
        { semestre: '4to Semestre', codigo: 'WEB-401', materia: 'Desarrollo Web', creditos: 6, calificacion: 93, letra: 'A', estado: 'aprobado' },
        { semestre: '4to Semestre', codigo: 'MOV-402', materia: 'Programación Móvil', creditos: 6, calificacion: 89, letra: 'B', estado: 'aprobado' },
        
        { semestre: '5to Semestre', codigo: 'RED-501', materia: 'Redes de Computadoras', creditos: 5, calificacion: 84, letra: 'B', estado: 'aprobado' },
        { semestre: '5to Semestre', codigo: 'SIS-502', materia: 'Ingeniería de Software', creditos: 6, calificacion: 92, letra: 'A', estado: 'aprobado' },
        { semestre: '5to Semestre', codigo: 'INT-503', materia: 'Inteligencia Artificial', creditos: 5, calificacion: 88, letra: 'B', estado: 'aprobado' },
        
        { semestre: '6to Semestre', codigo: 'PRO-601', materia: 'Proyecto Integrador', creditos: 8, calificacion: 0, letra: '-', estado: 'cursando' },
        { semestre: '6to Semestre', codigo: 'SEG-602', materia: 'Seguridad Informática', creditos: 5, calificacion: 0, letra: '-', estado: 'cursando' },
        { semestre: '6to Semestre', codigo: 'CLD-603', materia: 'Computación en la Nube', creditos: 5, calificacion: 0, letra: '-', estado: 'cursando' }
    ];
    
    calcularEstadisticas();
    renderKardex();
}

// ============================================
// CALCULAR ESTADÍSTICAS
// ============================================
function calcularEstadisticas() {
    const materiasAprobadas = historialAcademico.filter(m => m.estado === 'aprobado');
    const materiasCursando = historialAcademico.filter(m => m.estado === 'cursando');
    
    const creditosTotales = historialAcademico.reduce((sum, m) => sum + m.creditos, 0);
    const creditosAprobados = materiasAprobadas.reduce((sum, m) => sum + m.creditos, 0);
    
    const materiasConCalificacion = materiasAprobadas.filter(m => m.calificacion > 0);
    const sumaCalificaciones = materiasConCalificacion.reduce((sum, m) => sum + m.calificacion, 0);
    const promedio = materiasConCalificacion.length > 0 ? sumaCalificaciones / materiasConCalificacion.length : 0;
    
    const porcentajeAvance = (creditosAprobados / creditosTotales) * 100;
    
    // Función para obtener letra de calificación
    function getLetraCalificacion(calif) {
        if (calif >= 90) return 'A';
        if (calif >= 80) return 'B';
        if (calif >= 70) return 'C';
        if (calif >= 60) return 'D';
        return 'F';
    }
    
    // Actualizar letras de calificaciones
    historialAcademico.forEach(materia => {
        if (materia.calificacion > 0) {
            materia.letra = getLetraCalificacion(materia.calificacion);
        }
    });
    
    document.getElementById('totalCreditos').textContent = creditosTotales;
    document.getElementById('creditosAprobados').textContent = creditosAprobados;
    document.getElementById('promedioGeneral').textContent = promedio.toFixed(2);
    document.getElementById('porcentajeAvance').textContent = Math.round(porcentajeAvance) + '%';
    document.getElementById('footerCreditos').innerHTML = `<strong>${creditosTotales}</strong>`;
    document.getElementById('footerPromedio').innerHTML = `<strong>${promedio.toFixed(2)}</strong>`;
}

// ============================================
// RENDERIZAR TABLA DEL KARDEX
// ============================================
function renderKardex() {
    const tbody = document.getElementById('kardexBody');
    
    tbody.innerHTML = historialAcademico.map(materia => {
        // Clase para la calificación
        let claseCalificacion = '';
        if (materia.calificacion >= 90) claseCalificacion = 'calificacion-excelente';
        else if (materia.calificacion >= 80) claseCalificacion = 'calificacion-notable';
        else if (materia.calificacion >= 70) claseCalificacion = 'calificacion-bueno';
        else if (materia.calificacion >= 60) claseCalificacion = 'calificacion-suficiente';
        else if (materia.calificacion > 0) claseCalificacion = 'calificacion-insuficiente';
        
        // Estado
        let claseEstado = '';
        let textoEstado = '';
        if (materia.estado === 'aprobado') {
            claseEstado = 'estado-aprobado';
            textoEstado = 'Aprobado';
        } else if (materia.estado === 'reprobado') {
            claseEstado = 'estado-reprobado';
            textoEstado = 'Reprobado';
        } else {
            claseEstado = 'estado-cursando';
            textoEstado = 'Cursando';
        }
        
        const calificacionMostrar = materia.calificacion > 0 ? materia.calificacion : '—';
        
        return `
            <tr>
                <td>${materia.semestre}</td>
                <td>${materia.codigo}</td>
                <td class="text-start">${materia.materia}</td>
                <td>${materia.creditos}</td>
                <td class="${claseCalificacion} fw-bold">${calificacionMostrar}</td>
                <td><strong>${materia.letra}</strong></td>
                <td><span class="${claseEstado}">${textoEstado}</span></td>
            </tr>
        `;
    }).join('');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.getElementById('kardexContent');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Kardex_${userMatricula}_${userNombre}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    showModal('Éxito', 'PDF exportado correctamente', 'success');
}

// ============================================
// EXPORTAR A EXCEL
// ============================================
function exportarExcel() {
    // Preparar datos para Excel
    const excelData = historialAcademico.map(materia => ({
        'Semestre': materia.semestre,
        'Código': materia.codigo,
        'Materia': materia.materia,
        'Créditos': materia.creditos,
        'Calificación': materia.calificacion > 0 ? materia.calificacion : 'En curso',
        'Letra': materia.letra,
        'Estado': materia.estado === 'aprobado' ? 'Aprobado' : materia.estado === 'reprobado' ? 'Reprobado' : 'Cursando'
    }));
    
    // Agregar información del alumno al inicio
    const infoAlumno = [
        ['KARDEX ACADÉMICO - MI UNIVERSIDAD'],
        [''],
        ['Información del Alumno'],
        ['Nombre:', userNombre],
        ['Matrícula:', userMatricula],
        ['Carrera:', 'Ingeniería en Sistemas Computacionales'],
        ['Semestre:', '6to Semestre'],
        [''],
        ['HISTORIAL ACADÉMICO'],
        []
    ];
    
    const worksheetData = [...infoAlumno, ...excelData.map(Object.values)];
    
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kardex');
    XLSX.writeFile(wb, `Kardex_${userMatricula}_${userNombre}.xlsx`);
    
    showModal('Éxito', 'Excel exportado correctamente', 'success');
}

// ============================================
// IMPRIMIR KARDEX
// ============================================
function imprimirKardex() {
    window.print();
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
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);