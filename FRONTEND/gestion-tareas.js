/* ============================================
   GESTIÓN DE TAREAS JS - MI UNIVERSIDAD
   ============================================ */

// Obtener datos del usuario
const userNombre = localStorage.getItem('userNombre') || 'Dr. Juan Pérez';
const userMatricula = localStorage.getItem('userMatricula') || '202524';
const userRol = localStorage.getItem('userRol') || 'maestro';

// Variables globales
let tareasPorCurso = {};
let cursoActual = null;
let tareasFiltradas = [];
let entregaActual = null;

// ============================================
// INICIALIZAR
// ============================================
function init() {
    console.log('Inicializando gestión de tareas...');
    mostrarInfoMaestro();
    cargarDatosTareas();
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
// CARGAR DATOS DE TAREAS (SIMULADO)
// ============================================
function cargarDatosTareas() {
    console.log('Cargando datos de tareas...');
    
    const cursos = [
        { id: 1, nombre: 'Matemáticas IV', codigo: 'MAT-304' },
        { id: 2, nombre: 'Desarrollo Web Avanzado', codigo: 'WEB-401' },
        { id: 3, nombre: 'Bases de Datos Avanzadas', codigo: 'BD-401' },
        { id: 4, nombre: 'Programación Móvil', codigo: 'MOV-402' }
    ];
    
    cursos.forEach(curso => {
        tareasPorCurso[curso.id] = {
            id: curso.id,
            nombre: curso.nombre,
            codigo: curso.codigo,
            tareas: generarTareas(curso.id)
        };
    });
    
    console.log('Datos cargados:', Object.keys(tareasPorCurso).length, 'cursos');
}

// ============================================
// GENERAR TAREAS SIMULADAS
// ============================================
function generarTareas(cursoId) {
    const tareasBase = [
        { titulo: 'Examen Parcial 1', descripcion: 'Resolver los ejercicios del capítulo 1 al 3. Entregar en formato PDF.', peso: 15, tipo: 'individual' },
        { titulo: 'Proyecto Integrador', descripcion: 'Desarrollar un proyecto completo aplicando los conocimientos del curso.', peso: 30, tipo: 'proyecto' },
        { titulo: 'Investigación de Tema', descripcion: 'Investigar y presentar un resumen sobre el tema asignado.', peso: 10, tipo: 'individual' },
        { titulo: 'Examen Parcial 2', descripcion: 'Evaluación de los temas vistos en clase.', peso: 15, tipo: 'individual' }
    ];
    
    const hoy = new Date();
    const tareas = [];
    
    tareasBase.forEach((tarea, index) => {
        const fechaEntrega = new Date(hoy);
        fechaEntrega.setDate(hoy.getDate() + (index === 1 ? 15 : index === 2 ? -5 : 10));
        
        const entregas = generarEntregas(cursoId, index + 1);
        const totalEntregas = entregas.length;
        const calificadas = entregas.filter(e => e.calificacion !== null).length;
        
        tareas.push({
            id: cursoId * 100 + index + 1,
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fechaEntrega: fechaEntrega.toISOString().slice(0, 16),
            peso: tarea.peso,
            tipo: tarea.tipo,
            entregas: entregas,
            stats: {
                total: 25,
                entregadas: totalEntregas,
                calificadas: calificadas,
                promedio: calificadas > 0 ? Math.floor(Math.random() * (90 - 70 + 1) + 70) : 0
            }
        });
    });
    
    return tareas;
}

// ============================================
// GENERAR ENTREGAS SIMULADAS
// ============================================
function generarEntregas(cursoId, tareaNum) {
    const nombres = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Torres'];
    const entregas = [];
    const cantidad = Math.floor(Math.random() * (20 - 15 + 1) + 15);
    
    for (let i = 1; i <= cantidad; i++) {
        const entregada = Math.random() > 0.3;
        const calificada = entregada && Math.random() > 0.4;
        
        entregas.push({
            id: cursoId * 1000 + tareaNum * 100 + i,
            alumnoMatricula: `2023${String(i).padStart(3, '0')}`,
            alumnoNombre: nombres[(i - 1) % nombres.length],
            fechaEntrega: entregada ? new Date().toISOString().slice(0, 16) : null,
            archivo: entregada ? `tarea_${tareaNum}_alumno_${i}.pdf` : null,
            comentario: entregada ? 'Adjunto mi trabajo, quedo atento a comentarios.' : null,
            calificacion: calificada ? Math.floor(Math.random() * (100 - 60 + 1) + 60) : null,
            retroalimentacion: calificada ? 'Buen trabajo, revisa los detalles señalados.' : null
        });
    }
    
    return entregas;
}

// ============================================
// CARGAR TAREAS POR CURSO
// ============================================
function cargarTareasPorCurso() {
    const cursoId = parseInt(document.getElementById('selectCurso').value);
    console.log('Curso seleccionado ID:', cursoId);
    
    if (!cursoId) {
        document.getElementById('noCursoMessage').style.display = 'block';
        document.getElementById('btnCrearContainer').style.display = 'none';
        document.getElementById('statsGrid').style.display = 'none';
        document.getElementById('tareasContainer').innerHTML = '';
        cursoActual = null;
        return;
    }
    
    cursoActual = tareasPorCurso[cursoId];
    
    if (!cursoActual) {
        console.error('Curso no encontrado:', cursoId);
        document.getElementById('noCursoMessage').style.display = 'block';
        document.getElementById('btnCrearContainer').style.display = 'none';
        document.getElementById('statsGrid').style.display = 'none';
        return;
    }
    
    console.log('Curso cargado:', cursoActual.nombre, 'Tareas:', cursoActual.tareas.length);
    
    document.getElementById('noCursoMessage').style.display = 'none';
    document.getElementById('btnCrearContainer').style.display = 'block';
    document.getElementById('statsGrid').style.display = 'grid';
    
    tareasFiltradas = [...cursoActual.tareas];
    actualizarEstadisticas();
    renderTareas();
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    if (!cursoActual) return;
    
    const total = cursoActual.tareas.length;
    const hoy = new Date();
    const activas = cursoActual.tareas.filter(t => new Date(t.fechaEntrega) > hoy).length;
    const vencidas = cursoActual.tareas.filter(t => new Date(t.fechaEntrega) < hoy).length;
    const promedioEntregas = cursoActual.tareas.reduce((sum, t) => sum + (t.stats.entregadas / t.stats.total * 100), 0) / total;
    
    document.getElementById('totalTareas').textContent = total;
    document.getElementById('tareasActivas').textContent = activas;
    document.getElementById('tareasVencidas').textContent = vencidas;
    document.getElementById('promedioEntregas').textContent = Math.round(promedioEntregas);
}

// ============================================
// RENDERIZAR TAREAS
// ============================================
function renderTareas() {
    const container = document.getElementById('tareasContainer');
    
    if (!tareasFiltradas || tareasFiltradas.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-tasks" style="font-size: 3rem; color: #ccc;"></i>
                <h5 class="mt-3 text-muted">No hay tareas para este curso</h5>
                <p class="text-muted">Haz clic en "Crear Nueva Tarea" para comenzar</p>
            </div>
        `;
        return;
    }
    
    const hoy = new Date();
    
    container.innerHTML = tareasFiltradas.map(tarea => {
        const fechaEntrega = new Date(tarea.fechaEntrega);
        const isVencida = fechaEntrega < hoy;
        const porcentajeEntregas = (tarea.stats.entregadas / tarea.stats.total) * 100;
        
        let tipoTexto = '';
        if (tarea.tipo === 'individual') tipoTexto = 'Individual';
        else if (tarea.tipo === 'grupal') tipoTexto = 'Grupal';
        else tipoTexto = 'Proyecto';
        
        return `
            <div class="col-md-6 col-lg-4">
                <div class="tarea-card ${isVencida ? 'vencida' : 'activa'}">
                    <div class="tarea-header">
                        <h4>${tarea.titulo}</h4>
                        <div class="tarea-fecha">
                            <i class="fas fa-calendar-alt"></i> Entrega: ${new Date(tarea.fechaEntrega).toLocaleString()}
                        </div>
                    </div>
                    <div class="tarea-body">
                        <div class="tarea-descripcion">
                            ${tarea.descripcion.substring(0, 100)}${tarea.descripcion.length > 100 ? '...' : ''}
                        </div>
                        <div class="tarea-meta">
                            <span><i class="fas fa-weight-hanging"></i> Peso: ${tarea.peso}%</span>
                            <span><i class="fas fa-file-alt"></i> Tipo: ${tipoTexto}</span>
                            <span><i class="fas fa-users"></i> Entregas: ${tarea.stats.entregadas}/${tarea.stats.total}</span>
                        </div>
                        <div class="progress mb-3">
                            <div class="progress-bar bg-success" style="width: ${porcentajeEntregas}%">${Math.round(porcentajeEntregas)}%</div>
                        </div>
                        <div class="tarea-actions">
                            <button class="btn-ver-entregas" onclick="verEntregas(${tarea.id})">
                                <i class="fas fa-eye"></i> Ver Entregas
                            </button>
                            <button class="btn-editar-tarea" onclick="editarTarea(${tarea.id})">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn-eliminar-tarea" onclick="eliminarTarea(${tarea.id})">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// ABRIR MODAL CREAR TAREA
// ============================================
function abrirModalCrear() {
    if (!cursoActual) {
        alert('Primero selecciona un curso');
        return;
    }
    
    document.getElementById('modalTitulo').innerHTML = '<i class="fas fa-plus-circle"></i> Crear Nueva Tarea';
    document.getElementById('tareaId').value = '';
    document.getElementById('tituloTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
    document.getElementById('fechaEntrega').value = '';
    document.getElementById('pesoTarea').value = '10';
    document.getElementById('tipoTarea').value = 'individual';
    document.getElementById('archivosTarea').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('tareaModal'));
    modal.show();
}

// ============================================
// EDITAR TAREA
// ============================================
let tareaEditando = null;

function editarTarea(tareaId) {
    if (!cursoActual) return;
    
    tareaEditando = cursoActual.tareas.find(t => t.id === tareaId);
    if (!tareaEditando) return;
    
    document.getElementById('modalTitulo').innerHTML = '<i class="fas fa-edit"></i> Editar Tarea';
    document.getElementById('tareaId').value = tareaEditando.id;
    document.getElementById('tituloTarea').value = tareaEditando.titulo;
    document.getElementById('descripcionTarea').value = tareaEditando.descripcion;
    document.getElementById('fechaEntrega').value = tareaEditando.fechaEntrega;
    document.getElementById('pesoTarea').value = tareaEditando.peso;
    document.getElementById('tipoTarea').value = tareaEditando.tipo;
    
    const modal = new bootstrap.Modal(document.getElementById('tareaModal'));
    modal.show();
}

// ============================================
// GUARDAR TAREA
// ============================================
function guardarTarea() {
    const titulo = document.getElementById('tituloTarea').value;
    const descripcion = document.getElementById('descripcionTarea').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const peso = parseInt(document.getElementById('pesoTarea').value);
    const tipo = document.getElementById('tipoTarea').value;
    const tareaId = document.getElementById('tareaId').value;
    
    if (!titulo || !fechaEntrega) {
        alert('Completa los campos obligatorios');
        return;
    }
    
    if (peso < 0 || peso > 100) {
        alert('El porcentaje debe estar entre 0 y 100');
        return;
    }
    
    if (tareaId) {
        // Editar tarea existente
        const index = cursoActual.tareas.findIndex(t => t.id == tareaId);
        if (index !== -1) {
            cursoActual.tareas[index].titulo = titulo;
            cursoActual.tareas[index].descripcion = descripcion;
            cursoActual.tareas[index].fechaEntrega = fechaEntrega;
            cursoActual.tareas[index].peso = peso;
            cursoActual.tareas[index].tipo = tipo;
        }
        showModal('Éxito', 'Tarea actualizada correctamente', 'success');
    } else {
        // Crear nueva tarea
        const nuevaTarea = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            fechaEntrega: fechaEntrega,
            peso: peso,
            tipo: tipo,
            entregas: [],
            stats: { total: 25, entregadas: 0, calificadas: 0, promedio: 0 }
        };
        cursoActual.tareas.push(nuevaTarea);
        showModal('Éxito', 'Tarea creada correctamente', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('tareaModal')).hide();
    actualizarEstadisticas();
    renderTareas();
}

// ============================================
// ELIMINAR TAREA
// ============================================
function eliminarTarea(tareaId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.')) {
        const index = cursoActual.tareas.findIndex(t => t.id === tareaId);
        if (index !== -1) {
            cursoActual.tareas.splice(index, 1);
            actualizarEstadisticas();
            renderTareas();
            showModal('Éxito', 'Tarea eliminada correctamente', 'success');
        }
    }
}

// ============================================
// VER ENTREGAS DE TAREA
// ============================================
function verEntregas(tareaId) {
    const tarea = cursoActual.tareas.find(t => t.id === tareaId);
    if (!tarea) return;
    
    document.getElementById('tareaNombreModal').innerHTML = `<strong>${tarea.titulo}</strong> - ${cursoActual.nombre}`;
    
    const tbody = document.getElementById('entregasTableBody');
    tbody.innerHTML = tarea.entregas.map(entrega => {
        const estado = entrega.calificacion !== null ? 'Calificado' : 'Pendiente';
        const badgeClass = entrega.calificacion !== null ? 'badge-aprobado' : 'badge-pendiente';
        
        return `
            <tr>
                <td>${entrega.alumnoMatricula}</td>
                <td>${entrega.alumnoNombre}</td>
                <td>${entrega.fechaEntrega ? new Date(entrega.fechaEntrega).toLocaleString() : 'No entregada'}</td>
                <td>
                    ${entrega.archivo ? `<a href="#" class="btn btn-sm btn-outline-primary"><i class="fas fa-download"></i> Ver</a>` : '---'}
                </td>
                <td>
                    ${entrega.calificacion !== null ? `<strong>${entrega.calificacion}</strong>` : '---'}
                </td>
                <td><span class="${badgeClass}">${estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="calificarEntrega(${entrega.id}, '${entrega.alumnoNombre}', '${entrega.comentario || ''}')">
                        <i class="fas fa-star"></i> Calificar
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    window.tareaActual = tarea;
    const modal = new bootstrap.Modal(document.getElementById('entregasModal'));
    modal.show();
}

// ============================================
// CALIFICAR ENTREGA
// ============================================
function calificarEntrega(entregaId, alumnoNombre, comentario) {
    entregaActual = { id: entregaId, alumnoNombre: alumnoNombre, comentario: comentario };
    
    document.getElementById('calificarEntregaId').value = entregaId;
    document.getElementById('calificarAlumnoNombre').value = alumnoNombre;
    document.getElementById('comentarioAlumno').value = comentario || 'Sin comentarios';
    document.getElementById('calificacionEntrega').value = '';
    document.getElementById('retroalimentacion').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('calificarModal'));
    modal.show();
}

// ============================================
// GUARDAR CALIFICACIÓN
// ============================================
function guardarCalificacion() {
    const calificacion = parseInt(document.getElementById('calificacionEntrega').value);
    const retroalimentacion = document.getElementById('retroalimentacion').value;
    
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        alert('Ingresa una calificación válida entre 0 y 100');
        return;
    }
    
    // Buscar y actualizar la entrega
    for (const tarea of cursoActual.tareas) {
        const entrega = tarea.entregas.find(e => e.id === entregaActual.id);
        if (entrega) {
            entrega.calificacion = calificacion;
            entrega.retroalimentacion = retroalimentacion;
            
            // Actualizar estadísticas de la tarea
            const calificadas = tarea.entregas.filter(e => e.calificacion !== null).length;
            const promedio = tarea.entregas.reduce((sum, e) => sum + (e.calificacion || 0), 0) / calificadas;
            tarea.stats.calificadas = calificadas;
            tarea.stats.promedio = Math.round(promedio);
            break;
        }
    }
    
    bootstrap.Modal.getInstance(document.getElementById('calificarModal')).hide();
    showModal('Éxito', `Calificación ${calificacion} guardada correctamente`, 'success');
    
    // Actualizar vista de entregas si está abierta
    if (window.tareaActual) {
        verEntregas(window.tareaActual.id);
    }
}

// ============================================
// EXPORTAR EXCEL DE TAREAS
// ============================================
function exportarExcel() {
    if (!cursoActual || !tareasFiltradas.length) {
        alert('No hay datos para exportar');
        return;
    }
    
    const excelData = tareasFiltradas.map(tarea => ({
        'Título': tarea.titulo,
        'Descripción': tarea.descripcion,
        'Fecha Entrega': new Date(tarea.fechaEntrega).toLocaleString(),
        'Peso': `${tarea.peso}%`,
        'Tipo': tarea.tipo === 'individual' ? 'Individual' : tarea.tipo === 'grupal' ? 'Grupal' : 'Proyecto',
        'Entregas': `${tarea.stats.entregadas}/${tarea.stats.total}`,
        'Calificadas': tarea.stats.calificadas,
        'Promedio': tarea.stats.promedio
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Tareas_${cursoActual.codigo}`);
    XLSX.writeFile(wb, `Tareas_${cursoActual.codigo}_${userMatricula}.xlsx`);
    
    showModal('Éxito', 'Archivo Excel exportado correctamente', 'success');
}

// ============================================
// EXPORTAR ENTREGAS A EXCEL
// ============================================
function exportarEntregasExcel() {
    if (!window.tareaActual) return;
    
    const excelData = window.tareaActual.entregas.map(entrega => ({
        'Matrícula': entrega.alumnoMatricula,
        'Alumno': entrega.alumnoNombre,
        'Fecha Entrega': entrega.fechaEntrega ? new Date(entrega.fechaEntrega).toLocaleString() : 'No entregada',
        'Comentario': entrega.comentario || '',
        'Calificación': entrega.calificacion !== null ? entrega.calificacion : 'Pendiente',
        'Retroalimentación': entrega.retroalimentacion || ''
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Entregas_${window.tareaActual.titulo}`);
    XLSX.writeFile(wb, `Entregas_${window.tareaActual.titulo}_${userMatricula}.xlsx`);
    
    showModal('Éxito', 'Archivo Excel exportado correctamente', 'success');
}

// ============================================
// EXPORTAR PDF
// ============================================
function exportarPDF() {
    if (!cursoActual || !tareasFiltradas.length) {
        alert('No hay datos para exportar');
        return;
    }
    
    const element = document.getElementById('tareasContainer');
    html2pdf().from(element).save();
    showModal('Éxito', 'PDF exportado correctamente', 'success');
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
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    window.location.href = 'dashboard.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', init);