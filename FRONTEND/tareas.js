/* ============================================
   TAREAS JS - MI UNIVERSIDAD
   ============================================ */

// Obtener datos del usuario
const userRol = localStorage.getItem('userRol') || 'alumno';
const userNombre = localStorage.getItem('userNombre') || 'Usuario';

// Variables globales
let tareasPendientes = [];
let tareasEntregadas = [];
let entregasPendientes = [];
let currentTab = 'pendientes';

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
        // Administrativo/Directivo - vista solo lectura
        document.getElementById('alumnoContent').style.display = 'block';
        document.getElementById('maestroContent').style.display = 'none';
        document.getElementById('crearTareaTab').style.display = 'none';
        document.getElementById('revisarTab').style.display = 'none';
        cargarTareasAlumno();
    }
}

// ============================================
// INICIALIZAR PARA ALUMNO
// ============================================
function initAlumno() {
    document.getElementById('pageTitle').innerHTML = '<i class="fas fa-tasks"></i> Mis Tareas';
    document.getElementById('pageSubtitle').innerHTML = 'Tareas pendientes y calificaciones';
    document.getElementById('maestroContent').style.display = 'none';
    document.getElementById('alumnoContent').style.display = 'block';
    document.getElementById('crearTareaTab').style.display = 'none';
    document.getElementById('revisarTab').style.display = 'none';
    
    cargarTareasAlumno();
}

// ============================================
// CARGAR TAREAS DEL ALUMNO (SIMULADO)
// ============================================
function cargarTareasAlumno() {
    // Datos simulados de tareas pendientes
    tareasPendientes = [
        {
            id: 1,
            titulo: 'Investigación de Algoritmos de Ordenamiento',
            materia: 'Programación',
            descripcion: 'Investigar y comparar los algoritmos de ordenamiento Bubble Sort, Quick Sort y Merge Sort. Incluir ejemplos de código y análisis de complejidad.',
            fechaEntrega: '2024-12-20T23:59',
            peso: 15,
            archivos: ['guia_algoritmos.pdf']
        },
        {
            id: 2,
            titulo: 'Ejercicios de Cálculo Diferencial',
            materia: 'Matemáticas',
            descripcion: 'Resolver los ejercicios del capítulo 3 (páginas 45-50). Entregar en formato PDF con procedimiento completo.',
            fechaEntrega: '2024-12-18T23:59',
            peso: 10,
            archivos: []
        },
        {
            id: 3,
            titulo: 'Diseño de Base de Datos',
            materia: 'Bases de Datos',
            descripcion: 'Diseñar un modelo entidad-relación para una tienda en línea. Incluir al menos 5 entidades y sus relaciones.',
            fechaEntrega: '2024-12-22T23:59',
            peso: 20,
            archivos: ['ejemplo_er.pdf']
        }
    ];
    
    // Datos simulados de tareas entregadas
    tareasEntregadas = [
        {
            id: 101,
            titulo: 'Introducción a la Programación',
            materia: 'Programación',
            fechaEntrega: '2024-12-01T23:59',
            fechaEntregaReal: '2024-11-30T14:30',
            calificacion: 95,
            estado: 'aprobado'
        },
        {
            id: 102,
            titulo: 'Álgebra Lineal',
            materia: 'Matemáticas',
            fechaEntrega: '2024-12-05T23:59',
            fechaEntregaReal: '2024-12-04T10:15',
            calificacion: 82,
            estado: 'aprobado'
        }
    ];
    
    actualizarContadores();
    renderTareasPendientes();
    renderTareasEntregadas();
}

// ============================================
// INICIALIZAR PARA MAESTRO
// ============================================
function initMaestro() {
    document.getElementById('pageTitle').innerHTML = '<i class="fas fa-chalkboard-teacher"></i> Gestionar Tareas';
    document.getElementById('pageSubtitle').innerHTML = 'Crea, edita y califica tareas';
    document.getElementById('alumnoContent').style.display = 'none';
    document.getElementById('maestroContent').style.display = 'block';
    document.getElementById('crearTareaTab').style.display = 'block';
    document.getElementById('revisarTab').style.display = 'block';
    
    cargarEntregasPendientes();
    actualizarContadoresMaestro();
}

// ============================================
// CARGAR ENTREGAS PENDIENTES (MAESTRO)
// ============================================
function cargarEntregasPendientes() {
    entregasPendientes = [
        {
            id: 201,
            tareaId: 1,
            tareaTitulo: 'Investigación de Algoritmos',
            alumnoNombre: 'Juan Pérez',
            alumnoMatricula: '2023001',
            fechaEntrega: '2024-12-18T10:30',
            comentario: 'Adjunto mi investigación con ejemplos de código',
            archivo: 'investigacion_algoritmos.pdf'
        },
        {
            id: 202,
            tareaId: 2,
            tareaTitulo: 'Ejercicios de Cálculo',
            alumnoNombre: 'María García',
            alumnoMatricula: '2023002',
            fechaEntrega: '2024-12-17T15:45',
            comentario: 'Ejercicios resueltos',
            archivo: 'ejercicios_calculo.pdf'
        }
    ];
    
    renderEntregasPendientes();
}

// ============================================
// ACTUALIZAR CONTADORES (ALUMNO)
// ============================================
function actualizarContadores() {
    const pendienteCount = document.getElementById('pendienteCount');
    if (pendienteCount) pendienteCount.textContent = tareasPendientes.length;
}

// ============================================
// ACTUALIZAR CONTADORES (MAESTRO)
// ============================================
function actualizarContadoresMaestro() {
    const revisarCount = document.getElementById('revisarCount');
    if (revisarCount) revisarCount.textContent = entregasPendientes.length;
}

// ============================================
// RENDERIZAR TAREAS PENDIENTES
// ============================================
function renderTareasPendientes() {
    const container = document.getElementById('pendientesContainer');
    const searchTerm = document.getElementById('searchTarea')?.value.toLowerCase() || '';
    const materiaFilter = document.getElementById('filterMateria')?.value || 'todas';
    
    let filtered = tareasPendientes.filter(tarea => {
        const matchesSearch = tarea.titulo.toLowerCase().includes(searchTerm) ||
                             tarea.materia.toLowerCase().includes(searchTerm) ||
                             tarea.descripcion.toLowerCase().includes(searchTerm);
        const matchesMateria = materiaFilter === 'todas' || tarea.materia === materiaFilter;
        return matchesSearch && matchesMateria;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745;"></i>
                <h5 class="mt-3">¡No hay tareas pendientes!</h5>
                <p class="text-muted">Has completado todas tus tareas. ¡Buen trabajo!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(tarea => {
        const fecha = new Date(tarea.fechaEntrega);
        const hoy = new Date();
        const diasRestantes = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
        let claseUrgencia = 'normal';
        let textoUrgencia = '';
        
        if (diasRestantes < 0) {
            claseUrgencia = 'urgente';
            textoUrgencia = '⏰ Vencida';
        } else if (diasRestantes <= 2) {
            claseUrgencia = 'urgente';
            textoUrgencia = `⚠️ Urgente - ${diasRestantes} día(s)`;
        } else if (diasRestantes <= 5) {
            claseUrgencia = 'proximo';
            textoUrgencia = `📅 Próximo - ${diasRestantes} día(s)`;
        } else {
            textoUrgencia = `📅 ${diasRestantes} día(s) restantes`;
        }
        
        const fechaFormateada = fecha.toLocaleString('es-MX');
        
        return `
            <div class="col-md-6 col-lg-4">
                <div class="tarea-card ${claseUrgencia}">
                    <div class="tarea-header">
                        <h5>${tarea.titulo}</h5>
                        <span class="tarea-materia">${tarea.materia}</span>
                    </div>
                    <div class="tarea-meta">
                        <span><i class="fas fa-calendar-alt"></i> Entrega: ${fechaFormateada}</span>
                        <span><i class="fas fa-weight-hanging"></i> Peso: ${tarea.peso}%</span>
                    </div>
                    <div class="tarea-descripcion">
                        ${tarea.descripcion.substring(0, 100)}${tarea.descripcion.length > 100 ? '...' : ''}
                    </div>
                    <div class="tarea-archivos">
                        ${tarea.archivos.map(arch => `<a href="#"><i class="fas fa-paperclip"></i> ${arch}</a>`).join('')}
                    </div>
                    <div class="fecha-entrega">
                        <i class="fas fa-clock"></i> ${textoUrgencia}
                    </div>
                    <button class="btn-entregar mt-3" onclick="abrirModalEntrega(${tarea.id})">
                        <i class="fas fa-upload"></i> Entregar Tarea
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR TAREAS ENTREGADAS
// ============================================
function renderTareasEntregadas() {
    const tbody = document.getElementById('entregadasTableBody');
    if (!tbody) return;
    
    if (tareasEntregadas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No hay tareas entregadas</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = tareasEntregadas.map(tarea => {
        let claseCalificacion = '';
        let textoCalificacion = '';
        
        if (tarea.calificacion >= 70) {
            claseCalificacion = 'calificacion-aprobada';
            textoCalificacion = 'Aprobado';
        } else {
            claseCalificacion = 'calificacion-reprobada';
            textoCalificacion = 'Reprobado';
        }
        
        return `
            <tr>
                <td>${tarea.titulo}</td>
                <td>${tarea.materia}</td>
                <td>${new Date(tarea.fechaEntrega).toLocaleDateString()}</td>
                <td>${new Date(tarea.fechaEntregaReal).toLocaleDateString()}</td>
                <td><strong>${tarea.calificacion}</strong></td>
                <td><span class="calificacion-badge ${claseCalificacion}">${textoCalificacion}</span></td>
            </tr>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR ENTREGAS PENDIENTES (MAESTRO)
// ============================================
function renderEntregasPendientes() {
    const container = document.getElementById('entregasPendientesContainer');
    if (!container) return;
    
    if (entregasPendientes.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745;"></i>
                <h5 class="mt-3">No hay entregas pendientes por revisar</h5>
            </div>
        `;
        return;
    }
    
    container.innerHTML = entregasPendientes.map(entrega => `
        <div class="col-md-6">
            <div class="tarea-card">
                <div class="tarea-header">
                    <h5>${entrega.tareaTitulo}</h5>
                    <span class="tarea-materia">Entregado</span>
                </div>
                <div class="tarea-meta">
                    <span><i class="fas fa-user"></i> ${entrega.alumnoNombre}</span>
                    <span><i class="fas fa-id-card"></i> ${entrega.alumnoMatricula}</span>
                    <span><i class="fas fa-clock"></i> ${new Date(entrega.fechaEntrega).toLocaleString()}</span>
                </div>
                <div class="tarea-descripcion">
                    <strong>Comentario:</strong> ${entrega.comentario}
                </div>
                <div class="tarea-archivos mt-2">
                    <a href="#"><i class="fas fa-file-pdf"></i> ${entrega.archivo}</a>
                </div>
                <div class="mt-3 d-flex gap-2">
                    <button class="btn-ver-entrega" onclick="verArchivoEntrega('${entrega.archivo}')">
                        <i class="fas fa-eye"></i> Ver Archivo
                    </button>
                    <button class="btn-calificar-entrega" onclick="abrirModalCalificar(${entrega.id})">
                        <i class="fas fa-star"></i> Calificar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// ABRIR MODAL DE ENTREGA (ALUMNO)
// ============================================
let tareaSeleccionada = null;

function abrirModalEntrega(tareaId) {
    tareaSeleccionada = tareasPendientes.find(t => t.id === tareaId);
    if (!tareaSeleccionada) return;
    
    document.getElementById('entregaTareaId').value = tareaSeleccionada.id;
    document.getElementById('entregaTareaTitulo').value = tareaSeleccionada.titulo;
    document.getElementById('modalTareaTitulo').innerHTML = `<strong>${tareaSeleccionada.titulo}</strong><br><small class="text-muted">${tareaSeleccionada.materia}</small>`;
    document.getElementById('comentarioEntrega').value = '';
    document.getElementById('archivosEntrega').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('entregarModal'));
    modal.show();
}

// ============================================
// ENVIAR ENTREGA (ALUMNO)
// ============================================
function enviarEntrega() {
    const comentario = document.getElementById('comentarioEntrega').value;
    const archivos = document.getElementById('archivosEntrega').files;
    
    if (archivos.length === 0) {
        showModal('Error', 'Debes adjuntar al menos un archivo', 'error');
        return;
    }
    
    // Simular envío
    showModal('Éxito', `Tarea "${tareaSeleccionada.titulo}" entregada correctamente`, 'success');
    
    // Eliminar de pendientes y agregar a entregadas
    const index = tareasPendientes.findIndex(t => t.id === tareaSeleccionada.id);
    if (index !== -1) {
        tareasPendientes.splice(index, 1);
        tareasEntregadas.unshift({
            id: Date.now(),
            titulo: tareaSeleccionada.titulo,
            materia: tareaSeleccionada.materia,
            fechaEntrega: tareaSeleccionada.fechaEntrega,
            fechaEntregaReal: new Date().toISOString(),
            calificacion: 'Pendiente',
            estado: 'pendiente'
        });
    }
    
    bootstrap.Modal.getInstance(document.getElementById('entregarModal')).hide();
    actualizarContadores();
    renderTareasPendientes();
    renderTareasEntregadas();
}

// ============================================
// ABRIR MODAL DE CALIFICAR (MAESTRO)
// ============================================
let entregaSeleccionada = null;

function abrirModalCalificar(entregaId) {
    entregaSeleccionada = entregasPendientes.find(e => e.id === entregaId);
    if (!entregaSeleccionada) return;
    
    document.getElementById('calificarEntregaId').value = entregaSeleccionada.id;
    document.getElementById('calificarAlumnoNombre').innerHTML = `<strong>${entregaSeleccionada.alumnoNombre}</strong><br><small>${entregaSeleccionada.alumnoMatricula}</small>`;
    document.getElementById('comentarioAlumno').textContent = entregaSeleccionada.comentario;
    document.getElementById('archivoEntregado').innerHTML = `<a href="#"><i class="fas fa-file-pdf"></i> ${entregaSeleccionada.archivo}</a>`;
    document.getElementById('calificacion').value = '';
    document.getElementById('retroalimentacion').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('calificarModal'));
    modal.show();
}

// ============================================
// GUARDAR CALIFICACIÓN (MAESTRO)
// ============================================
function guardarCalificacion() {
    const calificacion = document.getElementById('calificacion').value;
    const retroalimentacion = document.getElementById('retroalimentacion').value;
    
    if (!calificacion || calificacion < 0 || calificacion > 100) {
        showModal('Error', 'Ingresa una calificación válida (0-100)', 'error');
        return;
    }
    
    showModal('Éxito', `Calificación guardada: ${calificacion} puntos`, 'success');
    
    // Eliminar de pendientes
    const index = entregasPendientes.findIndex(e => e.id === entregaSeleccionada.id);
    if (index !== -1) {
        entregasPendientes.splice(index, 1);
    }
    
    bootstrap.Modal.getInstance(document.getElementById('calificarModal')).hide();
    actualizarContadoresMaestro();
    renderEntregasPendientes();
}

// ============================================
// VER ARCHIVO DE ENTREGA
// ============================================
function verArchivoEntrega(archivo) {
    showModal('Archivo', `Visualizando: ${archivo}`, 'info');
}

// ============================================
// CREAR NUEVA TAREA (MAESTRO)
// ============================================
document.getElementById('crearTareaForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('tituloTarea').value;
    const materia = document.getElementById('materiaTarea').value;
    const descripcion = document.getElementById('descripcionTarea').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const peso = document.getElementById('pesoTarea').value;
    
    if (!titulo || !materia || !fechaEntrega) {
        showModal('Error', 'Completa todos los campos obligatorios', 'error');
        return;
    }
    
    showModal('Éxito', `Tarea "${titulo}" creada exitosamente`, 'success');
    
    // Limpiar formulario
    document.getElementById('crearTareaForm').reset();
});

function cancelarCrear() {
    document.getElementById('crearTareaForm').reset();
    switchTab('mis-cursos');
}

// ============================================
// CAMBIAR PESTAÑA
// ============================================
function switchTab(tab) {
    currentTab = tab;
    
    // Actualizar clase active en tabs
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // Mostrar contenido según tab
    if (userRol === 'alumno') {
        document.getElementById('pendientesContainer').style.display = tab === 'pendientes' ? 'flex' : 'none';
        document.getElementById('entregadasContainer').style.display = tab === 'entregadas' ? 'block' : 'none';
    } else if (userRol === 'maestro') {
        document.getElementById('crearContainer').style.display = tab === 'crear' ? 'block' : 'none';
        document.getElementById('revisarContainer').style.display = tab === 'revisar' ? 'block' : 'none';
        if (tab === 'mis-cursos') {
            document.getElementById('revisarContainer').style.display = 'none';
            document.getElementById('crearContainer').style.display = 'none';
            cargarEntregasPendientes();
        }
    }
}

// ============================================
// FILTRAR TAREAS
// ============================================
function filterTareas() {
    if (userRol === 'alumno' && currentTab === 'pendientes') {
        renderTareasPendientes();
    }
}

// ============================================
// MOSTRAR MODAL DE CONFIRMACIÓN
// ============================================
function showModal(title, message, type = 'success') {
    const modalHeader = document.getElementById('confirmModalHeader');
    const modalTitle = document.querySelector('#confirmModal .modal-title');
    const modalBody = document.getElementById('confirmModalMessage');
    
    if (type === 'error') {
        modalHeader.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
        modalTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    } else if (type === 'info') {
        modalHeader.style.background = 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)';
        modalTitle.innerHTML = '<i class="fas fa-info-circle"></i> Información';
    } else {
        modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        modalTitle.innerHTML = '<i class="fas fa-check-circle"></i> Éxito';
    }
    
    modalBody.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
    
    setTimeout(() => {
        modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
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