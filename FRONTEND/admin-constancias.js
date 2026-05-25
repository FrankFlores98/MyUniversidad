/* ============================================
   ADMINISTRACIÓN DE CONSTANCIAS - MI UNIVERSIDAD
   ============================================ */

let alumnos = [];
let alumnoSeleccionado = null;

// Datos de materias por semestre (para kardex)
const materiasKardex = {
    1: [
        { nombre: 'Matemáticas I', codigo: 'MAT-101', creditos: 5, calificacion: 85, estado: 'Aprobado' },
        { nombre: 'Introducción a la Programación', codigo: 'PRO-101', creditos: 6, calificacion: 92, estado: 'Aprobado' },
        { nombre: 'Física I', codigo: 'FIS-101', creditos: 5, calificacion: 78, estado: 'Aprobado' },
        { nombre: 'Inglés I', codigo: 'ING-101', creditos: 4, calificacion: 88, estado: 'Aprobado' }
    ],
    2: [
        { nombre: 'Matemáticas II', codigo: 'MAT-102', creditos: 5, calificacion: 82, estado: 'Aprobado' },
        { nombre: 'Programación Estructurada', codigo: 'PRO-202', creditos: 6, calificacion: 90, estado: 'Aprobado' },
        { nombre: 'Física II', codigo: 'FIS-102', creditos: 5, calificacion: 75, estado: 'Aprobado' },
        { nombre: 'Inglés II', codigo: 'ING-102', creditos: 4, calificacion: 85, estado: 'Aprobado' }
    ],
    3: [
        { nombre: 'Matemáticas III', codigo: 'MAT-203', creditos: 5, calificacion: 88, estado: 'Aprobado' },
        { nombre: 'Bases de Datos', codigo: 'BD-301', creditos: 6, calificacion: 95, estado: 'Aprobado' },
        { nombre: 'Programación Orientada a Objetos', codigo: 'PRO-303', creditos: 6, calificacion: 91, estado: 'Aprobado' },
        { nombre: 'Inglés III', codigo: 'ING-203', creditos: 4, calificacion: 82, estado: 'Aprobado' }
    ],
    4: [
        { nombre: 'Matemáticas IV', codigo: 'MAT-304', creditos: 5, calificacion: 86, estado: 'Aprobado' },
        { nombre: 'Desarrollo Web', codigo: 'WEB-401', creditos: 6, calificacion: 93, estado: 'Aprobado' },
        { nombre: 'Programación Móvil', codigo: 'MOV-402', creditos: 6, calificacion: 89, estado: 'Aprobado' }
    ],
    5: [
        { nombre: 'Redes de Computadoras', codigo: 'RED-501', creditos: 5, calificacion: 84, estado: 'Aprobado' },
        { nombre: 'Ingeniería de Software', codigo: 'SIS-502', creditos: 6, calificacion: 92, estado: 'Aprobado' },
        { nombre: 'Inteligencia Artificial', codigo: 'INT-503', creditos: 5, calificacion: 88, estado: 'Aprobado' }
    ],
    6: [
        { nombre: 'Proyecto Integrador', codigo: 'PRO-601', creditos: 8, calificacion: 0, estado: 'Cursando' },
        { nombre: 'Seguridad Informática', codigo: 'SEG-602', creditos: 5, calificacion: 0, estado: 'Cursando' },
        { nombre: 'Computación en la Nube', codigo: 'CLD-603', creditos: 5, calificacion: 0, estado: 'Cursando' }
    ]
};

// Datos de alumnos simulados
function cargarAlumnos() {
    alumnos = [
        { id: 1, matricula: '2023001', nombre: 'Juan Pérez García', email: 'juan.perez@universidad.edu', telefono: '5512345678', carrera: 'Ingeniería en Sistemas', semestre: 6, promedio: 88.5, creditos: 180 },
        { id: 2, matricula: '2023002', nombre: 'María López Hernández', email: 'maria.lopez@universidad.edu', telefono: '5512345679', carrera: 'Ingeniería en Sistemas', semestre: 6, promedio: 92.3, creditos: 185 },
        { id: 3, matricula: '2023003', nombre: 'Carlos Rodríguez Martínez', email: 'carlos.rodriguez@universidad.edu', telefono: '5512345680', carrera: 'Administración', semestre: 5, promedio: 85.2, creditos: 160 },
        { id: 4, matricula: '2023004', nombre: 'Ana González Fernández', email: 'ana.gonzalez@universidad.edu', telefono: '5512345681', carrera: 'Derecho', semestre: 7, promedio: 89.5, creditos: 210 },
        { id: 5, matricula: '2023005', nombre: 'Luis Martínez Sánchez', email: 'luis.martinez@universidad.edu', telefono: '5512345682', carrera: 'Psicología', semestre: 5, promedio: 86.5, creditos: 155 }
    ];
    
    llenarSelectAlumnos();
}

function llenarSelectAlumnos() {
    const select = document.getElementById('selectAlumno');
    select.innerHTML = '<option value="">-- Selecciona un alumno --</option>';
    
    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = alumno.id;
        option.textContent = `${alumno.matricula} - ${alumno.nombre} (${alumno.carrera})`;
        select.appendChild(option);
    });
}

function filtrarAlumnos() {
    const searchTerm = document.getElementById('searchAlumno').value.toLowerCase();
    const select = document.getElementById('selectAlumno');
    const options = select.querySelectorAll('option');
    
    options.forEach(option => {
        if (option.value === '') return;
        const texto = option.textContent.toLowerCase();
        if (texto.includes(searchTerm)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}

function cargarDatosAlumno() {
    const alumnoId = document.getElementById('selectAlumno').value;
    if (!alumnoId) {
        document.getElementById('infoAlumno').style.display = 'none';
        document.getElementById('accionesContainer').style.display = 'none';
        return;
    }
    
    alumnoSeleccionado = alumnos.find(a => a.id == alumnoId);
    if (!alumnoSeleccionado) return;
    
    document.getElementById('alumnoMatricula').textContent = alumnoSeleccionado.matricula;
    document.getElementById('alumnoNombre').textContent = alumnoSeleccionado.nombre;
    document.getElementById('alumnoCarrera').textContent = alumnoSeleccionado.carrera;
    document.getElementById('alumnoSemestre').textContent = `${alumnoSeleccionado.semestre}° Semestre`;
    document.getElementById('alumnoPromedio').textContent = alumnoSeleccionado.promedio;
    document.getElementById('alumnoCreditos').textContent = alumnoSeleccionado.creditos;
    document.getElementById('alumnoEmail').textContent = alumnoSeleccionado.email;
    document.getElementById('alumnoTelefono').textContent = alumnoSeleccionado.telefono;
    
    document.getElementById('infoAlumno').style.display = 'block';
    document.getElementById('accionesContainer').style.display = 'flex';
}

function generarConstancia() {
    if (!alumnoSeleccionado) {
        alert('❌ Primero selecciona un alumno');
        return;
    }
    
    // Actualizar datos en la plantilla
    document.getElementById('constanciaNombre').textContent = alumnoSeleccionado.nombre.toUpperCase();
    document.getElementById('constanciaMatricula').textContent = alumnoSeleccionado.matricula;
    document.getElementById('constanciaCarrera').textContent = alumnoSeleccionado.carrera;
    document.getElementById('constanciaSemestre').textContent = alumnoSeleccionado.semestre;
    document.getElementById('constanciaPromedio').textContent = alumnoSeleccionado.promedio;
    document.getElementById('constanciaCreditos').textContent = alumnoSeleccionado.creditos;
    
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('constanciaFecha').textContent = fecha.toLocaleDateString('es-MX', opciones);
    
    const element = document.getElementById('constanciaContent');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Constancia_${alumnoSeleccionado.matricula}_${alumnoSeleccionado.nombre}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    alert(`✅ Constancia generada para ${alumnoSeleccionado.nombre}`);
}

function descargarKardex() {
    if (!alumnoSeleccionado) {
        alert('❌ Primero selecciona un alumno');
        return;
    }
    
    // Actualizar datos del kardex
    document.getElementById('kardexNombre').textContent = alumnoSeleccionado.nombre;
    document.getElementById('kardexMatricula').textContent = alumnoSeleccionado.matricula;
    document.getElementById('kardexCarrera').textContent = alumnoSeleccionado.carrera;
    
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('kardexFecha').textContent = fecha.toLocaleDateString('es-MX', opciones);
    
    // Generar tabla de materias
    let kardexBody = '';
    let totalCreditos = 0;
    let sumaCalificaciones = 0;
    let materiasConCalif = 0;
    
    for (let sem = 1; sem <= alumnoSeleccionado.semestre; sem++) {
        if (materiasKardex[sem]) {
            materiasKardex[sem].forEach(materia => {
                kardexBody += `
                    <tr>
                        <td>${sem}° Semestre</td>
                        <td>${materia.nombre}</td>
                        <td>${materia.codigo}</td>
                        <td>${materia.creditos}</td>
                        <td>${materia.calificacion > 0 ? materia.calificacion : '—'}</td>
                        <td><span class="${materia.estado === 'Aprobado' ? 'text-success' : 'text-warning'}">${materia.estado}</span></td>
                    </tr>
                `;
                totalCreditos += materia.creditos;
                if (materia.calificacion > 0) {
                    sumaCalificaciones += materia.calificacion;
                    materiasConCalif++;
                }
            });
        }
    }
    
    const promedioGeneral = materiasConCalif > 0 ? (sumaCalificaciones / materiasConCalif).toFixed(2) : 0;
    
    document.getElementById('kardexBody').innerHTML = kardexBody;
    document.getElementById('totalCreditos').textContent = totalCreditos;
    document.getElementById('promedioGeneral').textContent = promedioGeneral;
    
    const element = document.getElementById('kardexContent');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Kardex_${alumnoSeleccionado.matricula}_${alumnoSeleccionado.nombre}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    alert(`✅ Kardex generado para ${alumnoSeleccionado.nombre}`);
}

function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    cargarAlumnos();
});

function checkAuth() {
    const token = localStorage.getItem('token');
    const userRol = localStorage.getItem('userRol');
    if (!token) {
        window.location.href = 'login.html';
    }
    if (userRol !== 'administrativo' && userRol !== 'directivo') {
        window.location.href = 'dashboard.html';
    }
}