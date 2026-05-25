/* ============================================
   ALUMNOS JS - MI UNIVERSIDAD (CORREGIDO)
   ============================================ */

// Obtener datos del usuario
const userNombre = localStorage.getItem('userNombre') || 'Dr. Juan Pérez';
const userMatricula = localStorage.getItem('userMatricula') || '202524';
const userRol = localStorage.getItem('userRol') || 'maestro';

// Variables globales
let alumnosPorCurso = {};
let cursoActual = null;
let alumnosFiltrados = [];

// ============================================
// INICIALIZAR
// ============================================
function init() {
    console.log('Inicializando página de alumnos...');
    mostrarInfoMaestro();
    cargarDatosAlumnos();
}

// ============================================
// MOSTRAR INFORMACIÓN DEL MAESTRO
// ============================================
function mostrarInfoMaestro() {
    document.getElementById('maestroNombre').textContent = userNombre;
    document.getElementById('maestroMatricula').textContent = userMatricula;
    console.log('Maestro:', userNombre, userMatricula);
}

// ============================================
// CARGAR DATOS DE ALUMNOS (SIMULADO)
// ============================================
function cargarDatosAlumnos() {
    console.log('Cargando datos de alumnos...');
    
    const nombres = [
        'Juan Pérez García', 'María López Hernández', 'Carlos Rodríguez Martínez', 
        'Ana González Fernández', 'Luis Martínez Sánchez', 'Laura Díaz Pérez',
        'Javier Sánchez López', 'Sofía Ramírez Gómez', 'Diego Torres Flores',
        'Valentina Castro Ruiz', 'Andrés Mora Jiménez', 'Isabel Reyes Ortiz',
        'Fernando Cruz Mendoza', 'Carolina Vega Silva', 'Ricardo Luna Castro',
        'Patricia Soto Méndez', 'Alejandro Ruiz Torres', 'Diana García López'
    ];
    
    // IDs deben coincidir con los valores del select en HTML
    const cursos = [
        { id: 1, nombre: 'Matemáticas IV', codigo: 'MAT-304' },
        { id: 2, nombre: 'Desarrollo Web Avanzado', codigo: 'WEB-401' },
        { id: 3, nombre: 'Bases de Datos Avanzadas', codigo: 'BD-401' },
        { id: 4, nombre: 'Programación Móvil', codigo: 'MOV-402' }
    ];
    
    cursos.forEach(curso => {
        const cantidad = Math.floor(Math.random() * (25 - 15 + 1) + 15);
        const alumnos = [];
        
        for (let i = 1; i <= cantidad; i++) {
            const nombre = nombres[(i - 1) % nombres.length];
            const calificacion = Math.floor(Math.random() * (100 - 40 + 1) + 40);
            const asistencia = Math.floor(Math.random() * (100 - 50 + 1) + 50);
            
            alumnos.push({
                id: i,
                matricula: `2023${String(i).padStart(3, '0')}`,
                nombre: nombre,
                email: `${nombre.toLowerCase().replace(/ /g, '.')}@alumno.edu.mx`,
                calificacion: calificacion,
                asistencia: asistencia,
                estado: calificacion >= 60 ? 'aprobado' : 'reprobado',
                telefono: `55${Math.floor(Math.random() * 90000000 + 10000000)}`,
                direccion: `Calle ${Math.floor(Math.random() * 100 + 1)} #${Math.floor(Math.random() * 500 + 100)}`,
                fechaNacimiento: `${Math.floor(Math.random() * 12 + 1)}/${Math.floor(Math.random() * 28 + 1)}/${Math.floor(Math.random() * 10 + 1995)}`,
                tutor: 'Dr. Juan Pérez'
            });
        }
        
        alumnosPorCurso[curso.id] = {
            id: curso.id,
            nombre: curso.nombre,
            codigo: curso.codigo,
            alumnos: alumnos
        };
    });
    
    console.log('Datos cargados:', Object.keys(alumnosPorCurso).length, 'cursos');
    console.log('Cursos disponibles:', Object.keys(alumnosPorCurso));
}

// ============================================
// CARGAR ALUMNOS POR CURSO SELECCIONADO
// ============================================
function cargarAlumnosPorCurso() {
    const cursoId = parseInt(document.getElementById('selectCurso').value);
    console.log('Curso seleccionado ID:', cursoId);
    
    if (!cursoId) {
        document.getElementById('noCursoMessage').style.display = 'block';
        document.getElementById('statsGrid').style.display = 'none';
        document.getElementById('filterBar').style.display = 'none';
        document.getElementById('tableContainer').style.display = 'none';
        cursoActual = null;
        return;
    }
    
    cursoActual = alumnosPorCurso[cursoId];
    
    if (!cursoActual) {
        console.error('Curso no encontrado:', cursoId);
        document.getElementById('noCursoMessage').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #dc3545;"></i>
            <h4 class="mt-3">Error al cargar el curso</h4>
            <p class="text-muted">No se encontraron datos para este curso</p>
        `;
        document.getElementById('noCursoMessage').style.display = 'block';
        document.getElementById('statsGrid').style.display = 'none';
        document.getElementById('filterBar').style.display = 'none';
        document.getElementById('tableContainer').style.display = 'none';
        return;
    }
    
    console.log('Curso cargado:', cursoActual.nombre, 'Alumnos:', cursoActual.alumnos.length);
    
    alumnosFiltrados = [...cursoActual.alumnos];
    
    document.getElementById('noCursoMessage').style.display = 'none';
    document.getElementById('statsGrid').style.display = 'grid';
    document.getElementById('filterBar').style.display = 'block';
    document.getElementById('tableContainer').style.display = 'block';
    
    actualizarEstadisticas();
    renderTablaAlumnos();
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS DEL CURSO
// ============================================
function actualizarEstadisticas() {
    if (!cursoActual) return;
    
    const total = cursoActual.alumnos.length;
    const aprobados = cursoActual.alumnos.filter(a => a.estado === 'aprobado').length;
    const reprobados = cursoActual.alumnos.filter(a => a.estado === 'reprobado').length;
    const promedio = cursoActual.alumnos.reduce((sum, a) => sum + a.calificacion, 0) / total;
    
    document.getElementById('totalAlumnos').textContent = total;
    document.getElementById('aprobados').textContent = aprobados;
    document.getElementById('reprobados').textContent = reprobados;
    document.getElementById('promedioCurso').textContent = promedio.toFixed(1);
}

// ============================================
// RENDERIZAR TABLA DE ALUMNOS
// ============================================
function renderTablaAlumnos() {
    const tbody = document.getElementById('alumnosTableBody');
    
    if (!alumnosFiltrados || alumnosFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    <i class="fas fa-search" style="font-size: 2rem; color: #ccc;"></i>
                    <p class="mt-2 text-muted">No se encontraron alumnos</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = alumnosFiltrados.map(alumno => {
        let claseCalificacion = '';
        if (alumno.calificacion >= 90) claseCalificacion = 'text-success';
        else if (alumno.calificacion >= 70) claseCalificacion = 'text-warning';
        else claseCalificacion = 'text-danger';
        
        return `
            <tr>
                <td>${alumno.matricula}</td>
                <td><strong>${alumno.nombre}</strong></td>
                <td>${alumno.email}</td>
                <td class="${claseCalificacion} fw-bold">${alumno.calificacion}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div class="progress" style="width: 60px; height: 5px;">
                            <div class="progress-bar bg-success" style="width: ${alumno.asistencia}%"></div>
                        </div>
                        <span>${alumno.asistencia}%</span>
                    </div>
                </td>
                <td>
                    <span class="badge ${alumno.estado === 'aprobado' ? 'bg-success' : 'bg-danger'}">
                        ${alumno.estado === 'aprobado' ? 'Aprobado' : 'Reprobado'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="abrirModalEditar(${alumno.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-info" onclick="verDetalleAlumno(${alumno.id})" title="Ver">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    console.log('Tabla renderizada con', alumnosFiltrados.length, 'alumnos');
}

// ============================================
// FILTRAR ALUMNOS
// ============================================
function filtrarAlumnos() {
    if (!cursoActual) return;
    
    const searchTerm = document.getElementById('searchAlumno').value.toLowerCase();
    const estadoFilter = document.getElementById('filterEstado').value;
    const calificacionFilter = document.getElementById('filterCalificacion').value;
    
    alumnosFiltrados = cursoActual.alumnos.filter(alumno => {
        const matchesSearch = alumno.nombre.toLowerCase().includes(searchTerm) || 
                             alumno.matricula.toLowerCase().includes(searchTerm);
        const matchesEstado = estadoFilter === 'todos' || alumno.estado === estadoFilter;
        
        let matchesCalificacion = true;
        if (calificacionFilter !== 'todos') {
            const [min, max] = calificacionFilter.split('-').map(Number);
            matchesCalificacion = alumno.calificacion >= min && alumno.calificacion <= max;
        }
        
        return matchesSearch && matchesEstado && matchesCalificacion;
    });
    
    renderTablaAlumnos();
}

// ============================================
// LIMPIAR FILTROS
// ============================================
function limpiarFiltros() {
    document.getElementById('searchAlumno').value = '';
    document.getElementById('filterEstado').value = 'todos';
    document.getElementById('filterCalificacion').value = 'todos';
    
    if (cursoActual) {
        alumnosFiltrados = [...cursoActual.alumnos];
        renderTablaAlumnos();
    }
}

// ============================================
// ABRIR MODAL EDITAR
// ============================================
let alumnoEditando = null;

function abrirModalEditar(alumnoId) {
    if (!cursoActual) return;
    
    alumnoEditando = cursoActual.alumnos.find(a => a.id === alumnoId);
    if (!alumnoEditando) return;
    
    document.getElementById('editAlumnoId').value = alumnoEditando.id;
    document.getElementById('editAlumnoNombre').value = alumnoEditando.nombre;
    document.getElementById('editCalificacionActual').value = alumnoEditando.calificacion;
    document.getElementById('nuevaCalificacion').value = alumnoEditando.calificacion;
    
    const modal = new bootstrap.Modal(document.getElementById('editarCalificacionModal'));
    modal.show();
}

// ============================================
// GUARDAR CALIFICACIÓN
// ============================================
function guardarCalificacion() {
    const nuevaCalificacion = parseInt(document.getElementById('nuevaCalificacion').value);
    
    if (isNaN(nuevaCalificacion) || nuevaCalificacion < 0 || nuevaCalificacion > 100) {
        alert('Ingresa una calificación válida entre 0 y 100');
        return;
    }
    
    if (alumnoEditando) {
        alumnoEditando.calificacion = nuevaCalificacion;
        alumnoEditando.estado = nuevaCalificacion >= 60 ? 'aprobado' : 'reprobado';
        
        const index = cursoActual.alumnos.findIndex(a => a.id === alumnoEditando.id);
        if (index !== -1) {
            cursoActual.alumnos[index] = alumnoEditando;
        }
        
        actualizarEstadisticas();
        filtrarAlumnos();
        
        bootstrap.Modal.getInstance(document.getElementById('editarCalificacionModal')).hide();
        alert('Calificación actualizada correctamente');
    }
}

// ============================================
// VER DETALLE ALUMNO
// ============================================
function verDetalleAlumno(alumnoId) {
    if (!cursoActual) return;
    
    const alumno = cursoActual.alumnos.find(a => a.id === alumnoId);
    if (!alumno) return;
    
    const contenido = `
        <div class="row">
            <div class="col-md-4 text-center">
                <div class="mb-3">
                    <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #1e3c72, #2a5298); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                        <i class="fas fa-user-graduate" style="font-size: 3rem; color: white;"></i>
                    </div>
                </div>
                <h5>${alumno.nombre}</h5>
                <p class="text-muted">${alumno.matricula}</p>
            </div>
            <div class="col-md-8">
                <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${alumno.email}</p>
                <p><i class="fas fa-phone"></i> <strong>Teléfono:</strong> ${alumno.telefono}</p>
                <p><i class="fas fa-map-marker-alt"></i> <strong>Dirección:</strong> ${alumno.direccion}</p>
                <p><i class="fas fa-calendar-alt"></i> <strong>Fecha Nacimiento:</strong> ${alumno.fechaNacimiento}</p>
                <p><i class="fas fa-user-tie"></i> <strong>Tutor:</strong> ${alumno.tutor}</p>
                <hr>
                <div class="row">
                    <div class="col-4 text-center">
                        <h3 class="${alumno.calificacion >= 60 ? 'text-success' : 'text-danger'}">${alumno.calificacion}</h3>
                        <small>Calificación</small>
                    </div>
                    <div class="col-4 text-center">
                        <h3 class="text-primary">${alumno.asistencia}%</h3>
                        <small>Asistencia</small>
                    </div>
                    <div class="col-4 text-center">
                        <h3 class="${alumno.estado === 'aprobado' ? 'text-success' : 'text-danger'}">${alumno.estado === 'aprobado' ? 'Aprobado' : 'Reprobado'}</h3>
                        <small>Estado</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('detalleAlumnoContent').innerHTML = contenido;
    const modal = new bootstrap.Modal(document.getElementById('detalleAlumnoModal'));
    modal.show();
}

// ============================================
// EXPORTAR EXCEL
// ============================================
function exportarExcel() {
    if (!cursoActual || !alumnosFiltrados.length) {
        alert('No hay datos para exportar');
        return;
    }
    
    const excelData = alumnosFiltrados.map(alumno => ({
        'Matrícula': alumno.matricula,
        'Nombre': alumno.nombre,
        'Email': alumno.email,
        'Calificación': alumno.calificacion,
        'Asistencia': `${alumno.asistencia}%`,
        'Estado': alumno.estado === 'aprobado' ? 'Aprobado' : 'Reprobado'
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Alumnos_${cursoActual.codigo}`);
    XLSX.writeFile(wb, `Alumnos_${cursoActual.codigo}_${userMatricula}.xlsx`);
    
    alert('Archivo Excel exportado correctamente');
}

// ============================================
// EXPORTAR PDF
// ============================================
function exportarPDF() {
    if (!cursoActual || !alumnosFiltrados.length) {
        alert('No hay datos para exportar');
        return;
    }
    
    const element = document.getElementById('alumnosTable');
    html2pdf().from(element).save();
    alert('PDF exportado correctamente');
}

// ============================================
// IMPRIMIR
// ============================================
function imprimirLista() {
    window.print();
}

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);
// ============================================
// ELIMINAR TAREA (CORREGIDO)
// ============================================
function eliminarTarea(tareaId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.')) {
        const index = cursoActual.tareas.findIndex(t => t.id === tareaId);
        if (index !== -1) {
            cursoActual.tareas.splice(index, 1);
            actualizarEstadisticas();
            renderTareas();
            alert('✅ Tarea eliminada correctamente');
        }
    }
}