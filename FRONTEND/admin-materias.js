/* ============================================
   ADMINISTRACIÓN DE MATERIAS JS - MI UNIVERSIDAD
   CONECTADO AL BACKEND (COMPLETO)
   ============================================ */

// Variables globales
let materias = [];
let materiasFiltradas = [];
let currentPage = 1;
const itemsPerPage = 10;

const API_URL = 'http://localhost:5000/api';

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    cargarMaterias();
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
    
    // Solo administrativo y directivo pueden acceder
    if (userRol !== 'administrativo' && userRol !== 'directivo') {
        window.location.href = 'dashboard.html';
    }
}

// ============================================
// CARGAR MATERIAS (CONEXIÓN REAL AL BACKEND)
// ============================================
async function cargarMaterias() {
    const container = document.getElementById('materiasTableBody');
    if (container) container.innerHTML = '</table><td colspan="8" class="text-center">Cargando materias...</td></tr>';
    
    try {
        const response = await fetch(`${API_URL}/materias`);
        
        if (!response.ok) {
            throw new Error('Error al cargar materias');
        }
        
        materias = await response.json();
        actualizarEstadisticas();
        filtrarMaterias();
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('❌ Error de conexión con el servidor', 'error');
        if (container) container.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Error al cargar materias</td></tr>';
    }
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    const total = materias.length;
    const carreras = [...new Set(materias.map(m => m.carrera))];
    const promedioCreditos = materias.reduce((sum, m) => sum + m.creditos, 0) / (total || 1);
    const activas = materias.filter(m => m.activo === true).length;
    
    document.getElementById('totalMaterias').textContent = total;
    document.getElementById('totalCarreras').textContent = carreras.length;
    document.getElementById('promedioCreditos').textContent = promedioCreditos.toFixed(1);
    document.getElementById('materiasActivas').textContent = activas;
}

// ============================================
// FILTRAR MATERIAS
// ============================================
function filtrarMaterias() {
    const searchTerm = document.getElementById('searchMateria').value.toLowerCase();
    const filterCarrera = document.getElementById('filterCarrera').value;
    const filterSemestre = document.getElementById('filterSemestre').value;
    const filterTipo = document.getElementById('filterTipo').value;
    
    materiasFiltradas = materias.filter(materia => {
        const matchesSearch = materia.nombre.toLowerCase().includes(searchTerm) ||
                             materia.codigo.toLowerCase().includes(searchTerm) ||
                             materia.carrera.toLowerCase().includes(searchTerm);
        const matchesCarrera = filterCarrera === 'todos' || materia.carrera === filterCarrera;
        const matchesSemestre = filterSemestre === 'todos' || materia.semestre == filterSemestre;
        const matchesTipo = filterTipo === 'todos' || materia.tipo === filterTipo;
        
        return matchesSearch && matchesCarrera && matchesSemestre && matchesTipo;
    });
    
    currentPage = 1;
    renderTabla();
    renderPagination();
}

// ============================================
// LIMPIAR FILTROS
// ============================================
function limpiarFiltros() {
    document.getElementById('searchMateria').value = '';
    document.getElementById('filterCarrera').value = 'todos';
    document.getElementById('filterSemestre').value = 'todos';
    document.getElementById('filterTipo').value = 'todos';
    filtrarMaterias();
}

// ============================================
// RENDERIZAR TABLA (CORREGIDO)
// ============================================
function renderTabla() {
    const tbody = document.getElementById('materiasTableBody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageMaterias = materiasFiltradas.slice(start, end);
    const currentUserRol = localStorage.getItem('userRol');
    
    if (pageMaterias.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">No hay materias registradas</td></tr>`;
        return;
    }
    
    tbody.innerHTML = pageMaterias.map(materia => {
        let badgeTipo = '';
        switch(materia.tipo) {
            case 'Obligatoria': badgeTipo = 'badge-obligatoria'; break;
            case 'Optativa': badgeTipo = 'badge-optativa'; break;
            case 'Laboratorio': badgeTipo = 'badge-laboratorio'; break;
            case 'Taller': badgeTipo = 'badge-taller'; break;
            default: badgeTipo = 'badge-obligatoria';
        }
        
        const badgeEstado = materia.activo ? 'badge-activo' : 'badge-inactivo';
        const estadoTexto = materia.activo ? 'Activo' : 'Inactivo';
        
        // Botones según rol
        let botones = '';
        
        // Botón Ver (siempre visible para todos)
        botones += `<button class="btn-accion btn-view" onclick="verMateria('${materia._id}')" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>`;
        
        // Botón Editar (solo Directivo)
        if (currentUserRol === 'directivo') {
            botones += `<button class="btn-accion btn-edit" onclick="editarMateria('${materia._id}')" title="Editar materia">
                            <i class="fas fa-edit"></i>
                        </button>`;
        }
        
        // Botón Eliminar (solo Directivo)
        if (currentUserRol === 'directivo') {
            botones += `<button class="btn-accion btn-delete" onclick="eliminarMateria('${materia._id}')" title="Eliminar materia">
                            <i class="fas fa-trash"></i>
                        </button>`;
        }
        
        return `
            <tr>
                <td><strong>${materia.codigo}</strong></td>
                <td>${materia.nombre}</td>
                <td>${materia.creditos}</td>
                <td>${materia.semestre}° Semestre</td>
                <td>${materia.carrera}</td>
                <td><span class="${badgeTipo}">${materia.tipo}</span></td>
                <td><span class="${badgeEstado}">${estadoTexto}</span></td>
                <td class="acciones-cell">${botones}</td>
            </tr>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR PAGINACIÓN
// ============================================
function renderPagination() {
    const totalPages = Math.ceil(materiasFiltradas.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="cambiarPagina(${currentPage - 1})">Anterior</a>
            </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<li class="page-item ${currentPage === i ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="cambiarPagina(${i})">${i}</a>
                    </li>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
        }
    }
    
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="cambiarPagina(${currentPage + 1})">Siguiente</a>
            </li>`;
    
    pagination.innerHTML = html;
}

// ============================================
// CAMBIAR PÁGINA
// ============================================
function cambiarPagina(page) {
    const totalPages = Math.ceil(materiasFiltradas.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTabla();
    renderPagination();
}

// ============================================
// ABRIR MODAL CREAR MATERIA (SOLO DIRECTIVO)
// ============================================
function abrirModalCrear() {
    const currentUserRol = localStorage.getItem('userRol');
    
    if (currentUserRol !== 'directivo') {
        mostrarMensaje('❌ No tienes permiso para crear materias', 'error');
        return;
    }
    
    document.getElementById('modalTitulo').innerHTML = '<i class="fas fa-plus-circle"></i> Crear Materia';
    document.getElementById('materiaId').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('creditos').value = '';
    document.getElementById('semestre').value = '';
    document.getElementById('tipo').value = 'Obligatoria';
    document.getElementById('carrera').value = '';
    document.getElementById('estado').value = 'activo';
    document.getElementById('descripcion').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('materiaModal'));
    modal.show();
}

// ============================================
// EDITAR MATERIA (SOLO DIRECTIVO)
// ============================================
async function editarMateria(id) {
    const currentUserRol = localStorage.getItem('userRol');
    
    if (currentUserRol !== 'directivo') {
        mostrarMensaje('❌ No tienes permiso para editar materias', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/materias/${id}`);
        if (!response.ok) throw new Error('Error al cargar materia');
        
        const materia = await response.json();
        
        document.getElementById('modalTitulo').innerHTML = '<i class="fas fa-edit"></i> Editar Materia';
        document.getElementById('materiaId').value = materia._id;
        document.getElementById('codigo').value = materia.codigo;
        document.getElementById('nombre').value = materia.nombre;
        document.getElementById('creditos').value = materia.creditos;
        document.getElementById('semestre').value = materia.semestre;
        document.getElementById('tipo').value = materia.tipo;
        document.getElementById('carrera').value = materia.carrera;
        document.getElementById('estado').value = materia.activo ? 'activo' : 'inactivo';
        document.getElementById('descripcion').value = materia.descripcion || '';
        
        const modal = new bootstrap.Modal(document.getElementById('materiaModal'));
        modal.show();
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('❌ Error al cargar materia', 'error');
    }
}

// ============================================
// GUARDAR MATERIA (CREAR O EDITAR)
// ============================================
async function guardarMateria() {
    const currentUserRol = localStorage.getItem('userRol');
    
    if (currentUserRol !== 'directivo') {
        mostrarMensaje('❌ No tienes permiso para guardar materias', 'error');
        return;
    }
    
    const id = document.getElementById('materiaId').value;
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const creditos = parseInt(document.getElementById('creditos').value);
    const semestre = document.getElementById('semestre').value;
    const tipo = document.getElementById('tipo').value;
    const carrera = document.getElementById('carrera').value;
    const estado = document.getElementById('estado').value;
    const descripcion = document.getElementById('descripcion').value;
    
    if (!codigo || !nombre || !creditos || !semestre || !carrera) {
        mostrarMensaje('❌ Completa los campos obligatorios', 'error');
        return;
    }
    
    if (creditos < 1 || creditos > 12) {
        mostrarMensaje('❌ Los créditos deben estar entre 1 y 12', 'error');
        return;
    }
    
    const materiaData = {
        codigo,
        nombre,
        creditos,
        semestre: parseInt(semestre),
        tipo,
        carrera,
        activo: estado === 'activo',
        descripcion
    };
    
    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/materias/${id}` : `${API_URL}/materias`;
    
    try {
        const response = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(materiaData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarMensaje(id ? '✅ Materia actualizada correctamente' : '✅ Materia creada correctamente');
            const modal = bootstrap.Modal.getInstance(document.getElementById('materiaModal'));
            if (modal) modal.hide();
            cargarMaterias();
        } else {
            mostrarMensaje(`❌ ${data.error || 'Error al guardar'}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('❌ Error de conexión con el servidor', 'error');
    }
}

// ============================================
// VER MATERIA
// ============================================
async function verMateria(id) {
    try {
        const response = await fetch(`${API_URL}/materias/${id}`);
        if (!response.ok) throw new Error('Error al cargar materia');
        
        const materia = await response.json();
        
        let tipoBadge = '';
        switch(materia.tipo) {
            case 'Obligatoria': tipoBadge = '<span class="badge-obligatoria">Obligatoria</span>'; break;
            case 'Optativa': tipoBadge = '<span class="badge-optativa">Optativa</span>'; break;
            case 'Laboratorio': tipoBadge = '<span class="badge-laboratorio">Laboratorio</span>'; break;
            case 'Taller': tipoBadge = '<span class="badge-taller">Taller</span>'; break;
            default: tipoBadge = materia.tipo;
        }
        
        const estadoTexto = materia.activo ? '✅ Activo' : '❌ Inactivo';
        const estadoClase = materia.activo ? 'badge-activo' : 'badge-inactivo';
        
        const contenido = `
            <div class="text-center mb-3">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1e3c72, #2a5298); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">
                    <i class="fas fa-book" style="font-size: 2.5rem; color: white;"></i>
                </div>
                <h5 class="mt-3">${materia.nombre}</h5>
                <p class="text-muted">${materia.codigo}</p>
            </div>
            <div class="row mb-2"><div class="col-5"><strong>Código:</strong></div><div class="col-7">${materia.codigo}</div></div>
            <div class="row mb-2"><div class="col-5"><strong>Nombre:</strong></div><div class="col-7">${materia.nombre}</div></div>
            <div class="row mb-2"><div class="col-5"><strong>Créditos:</strong></div><div class="col-7">${materia.creditos}</div></div>
            <div class="row mb-2"><div class="col-5"><strong>Semestre:</strong></div><div class="col-7">${materia.semestre}° Semestre</div></div>
            <div class="row mb-2"><div class="col-5"><strong>Carrera:</strong></div><div class="col-7">${materia.carrera}</div></div>
            <div class="row mb-2"><div class="col-5"><strong>Tipo:</strong></div><div class="col-7">${tipoBadge}</div></div>
            <div class="row mb-2"><div class="col-5"><strong>Estado:</strong></div><div class="col-7"><span class="${estadoClase}">${estadoTexto}</span></div></div>
            ${materia.descripcion ? `<div class="row mb-2"><div class="col-5"><strong>Descripción:</strong></div><div class="col-7">${materia.descripcion}</div></div>` : ''}
        `;
        
        document.getElementById('viewModalBody').innerHTML = contenido;
        const modal = new bootstrap.Modal(document.getElementById('viewModal'));
        modal.show();
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('❌ Error al cargar detalles', 'error');
    }
}

// ============================================
// ELIMINAR MATERIA (SOLO DIRECTIVO)
// ============================================
async function eliminarMateria(id) {
    const currentUserRol = localStorage.getItem('userRol');
    
    if (currentUserRol !== 'directivo') {
        mostrarMensaje('❌ No tienes permiso para eliminar materias', 'error');
        return;
    }
    
    const materia = materias.find(m => m._id === id);
    if (!materia) return;
    
    const confirmar = confirm(
        `⚠️ ¿Estás seguro de que deseas eliminar esta materia?\n\n` +
        `📌 Código: ${materia.codigo}\n` +
        `📌 Nombre: ${materia.nombre}\n` +
        `📌 Carrera: ${materia.carrera}\n\n` +
        `Esta acción NO se puede deshacer.`
    );
    
    if (confirmar) {
        try {
            const response = await fetch(`${API_URL}/materias/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                mostrarMensaje(`✅ Materia "${materia.nombre}" eliminada correctamente`);
                cargarMaterias();
            } else {
                const data = await response.json();
                mostrarMensaje(`❌ ${data.error || 'Error al eliminar'}`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarMensaje('❌ Error de conexión', 'error');
        }
    }
}

// ============================================
// EXPORTAR A EXCEL
// ============================================
function exportarExcel() {
    const excelData = materiasFiltradas.map(m => ({
        'Código': m.codigo,
        'Nombre': m.nombre,
        'Créditos': m.creditos,
        'Semestre': `${m.semestre}° Semestre`,
        'Carrera': m.carrera,
        'Tipo': m.tipo,
        'Estado': m.activo ? 'Activo' : 'Inactivo'
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Materias');
    XLSX.writeFile(wb, `Materias_${new Date().toISOString().slice(0, 10)}.xlsx`);
    
    mostrarMensaje('✅ Excel exportado correctamente');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.getElementById('materiasTable');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Materias_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
    mostrarMensaje('✅ PDF exportado correctamente');
}

// ============================================
// IMPRIMIR LISTA
// ============================================
function imprimirLista() {
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