/* ============================================
   ADMINISTRACIÓN DE USUARIOS JS - MI UNIVERSIDAD
   ADMINISTRATIVO: SOLO LECTURA para Administrativos y Directivos
   ============================================ */

// Variables globales
let usuarios = [];
let usuariosFiltrados = [];
let currentPage = 1;
const itemsPerPage = 10;

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    cargarUsuarios();
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
// CARGAR USUARIOS (SIMULADO)
// ============================================
function cargarUsuarios() {
    const nombres = [
        'Juan Pérez García', 'María López Hernández', 'Carlos Rodríguez Martínez',
        'Ana González Fernández', 'Luis Martínez Sánchez', 'Laura Díaz Pérez',
        'Javier Sánchez López', 'Sofía Ramírez Gómez', 'Diego Torres Flores',
        'Valentina Castro Ruiz', 'Andrés Mora Jiménez', 'Isabel Reyes Ortiz',
        'Fernando Cruz Mendoza', 'Carolina Vega Silva', 'Ricardo Luna Castro'
    ];
    
    usuarios = [];
    
    // Crear usuarios de ejemplo
    const rolesEjemplo = ['alumno', 'alumno', 'alumno', 'alumno', 'alumno', 
                          'maestro', 'maestro', 'maestro',
                          'administrativo', 'administrativo',
                          'directivo'];
    
    for (let i = 0; i < rolesEjemplo.length; i++) {
        const rol = rolesEjemplo[i];
        let terminacion = '23';
        if (rol === 'alumno') terminacion = '23';
        else if (rol === 'maestro') terminacion = '24';
        else if (rol === 'administrativo') terminacion = '25';
        else terminacion = '26';
        
        const matricula = `2024${String(i + 1).padStart(3, '0')}${terminacion}`;
        const nombre = nombres[i % nombres.length];
        
        usuarios.push({
            id: i + 1,
            matricula: matricula,
            nombre: nombre,
            email: `${nombre.toLowerCase().replace(/ /g, '.')}@universidad.edu`,
            telefono: `55${Math.floor(Math.random() * 90000000 + 10000000)}`,
            rol: rol,
            estado: Math.random() > 0.2 ? 'activo' : 'inactivo',
            ultimoAcceso: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            carrera: rol === 'alumno' ? ['Ingeniería en Sistemas', 'Administración', 'Derecho', 'Psicología'][Math.floor(Math.random() * 4)] : '',
            departamento: rol === 'maestro' ? ['Ciencias Básicas', 'Ingeniería', 'Humanidades', 'Sociales'][Math.floor(Math.random() * 4)] : ''
        });
    }
    
    actualizarEstadisticas();
    filtrarUsuarios();
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    const totalAlumnos = usuarios.filter(u => u.rol === 'alumno').length;
    const totalMaestros = usuarios.filter(u => u.rol === 'maestro').length;
    const totalAdministrativos = usuarios.filter(u => u.rol === 'administrativo').length;
    const totalDirectivos = usuarios.filter(u => u.rol === 'directivo').length;
    
    document.getElementById('totalAlumnos').textContent = totalAlumnos;
    document.getElementById('totalMaestros').textContent = totalMaestros;
    document.getElementById('totalAdministrativos').textContent = totalAdministrativos;
    document.getElementById('totalDirectivos').textContent = totalDirectivos;
    document.getElementById('totalUsuarios').textContent = usuarios.length;
}

// ============================================
// FILTRAR USUARIOS
// ============================================
function filtrarUsuarios() {
    const searchTerm = document.getElementById('searchUsuario').value.toLowerCase();
    const filterRol = document.getElementById('filterRol').value;
    const filterEstado = document.getElementById('filterEstado').value;
    const filterCarrera = document.getElementById('filterCarrera').value;
    
    usuariosFiltrados = usuarios.filter(usuario => {
        const matchesSearch = usuario.nombre.toLowerCase().includes(searchTerm) ||
                             usuario.matricula.toLowerCase().includes(searchTerm) ||
                             usuario.email.toLowerCase().includes(searchTerm);
        const matchesRol = filterRol === 'todos' || usuario.rol === filterRol;
        const matchesEstado = filterEstado === 'todos' || usuario.estado === filterEstado;
        const matchesCarrera = filterCarrera === 'todos' || usuario.carrera === filterCarrera;
        
        return matchesSearch && matchesRol && matchesEstado && matchesCarrera;
    });
    
    currentPage = 1;
    renderTabla();
    renderPagination();
}

// ============================================
// LIMPIAR FILTROS
// ============================================
function limpiarFiltros() {
    document.getElementById('searchUsuario').value = '';
    document.getElementById('filterRol').value = 'todos';
    document.getElementById('filterEstado').value = 'todos';
    document.getElementById('filterCarrera').value = 'todos';
    filtrarUsuarios();
}

// ============================================
// VERIFICAR SI EL USUARIO ACTUAL PUEDE EDITAR
// ============================================
function puedeEditar(usuario) {
    const currentUserRol = localStorage.getItem('userRol');
    const currentUserMatricula = localStorage.getItem('userMatricula');
    
    // No puede editar su propia cuenta
    if (usuario.matricula === currentUserMatricula) {
        return false;
    }
    
    // Directivo puede editar a todos
    if (currentUserRol === 'directivo') {
        return true;
    }
    
    // Administrativo solo puede editar Alumnos y Maestros
    if (currentUserRol === 'administrativo') {
        return (usuario.rol === 'alumno' || usuario.rol === 'maestro');
    }
    
    return false;
}

// ============================================
// VERIFICAR SI EL USUARIO ACTUAL PUEDE ELIMINAR
// ============================================
function puedeEliminar(usuario) {
    const currentUserRol = localStorage.getItem('userRol');
    const currentUserMatricula = localStorage.getItem('userMatricula');
    
    // No puede eliminar su propia cuenta
    if (usuario.matricula === currentUserMatricula) {
        return false;
    }
    
    // Directivo puede eliminar a todos
    if (currentUserRol === 'directivo') {
        return true;
    }
    
    // Administrativo solo puede eliminar Alumnos y Maestros
    if (currentUserRol === 'administrativo') {
        return (usuario.rol === 'alumno' || usuario.rol === 'maestro');
    }
    
    return false;
}

// ============================================
// RENDERIZAR TABLA (CON BOTONES CONDICIONALES)
// ============================================
function renderTabla() {
    const tbody = document.getElementById('usuariosTableBody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageUsuarios = usuariosFiltrados.slice(start, end);
    const currentUserRol = localStorage.getItem('userRol');
    
    if (pageUsuarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">No hay usuarios registrados</td><tr>`;
        return;
    }
    
    tbody.innerHTML = pageUsuarios.map(usuario => {
        let badgeRol = '';
        let rolTexto = '';
        
        switch(usuario.rol) {
            case 'alumno': 
                badgeRol = 'badge-alumno'; 
                rolTexto = 'Alumno';
                break;
            case 'maestro': 
                badgeRol = 'badge-maestro'; 
                rolTexto = 'Maestro';
                break;
            case 'administrativo': 
                badgeRol = 'badge-administrativo'; 
                rolTexto = 'Administrativo';
                break;
            case 'directivo': 
                badgeRol = 'badge-directivo'; 
                rolTexto = 'Directivo';
                break;
        }
        
        const badgeEstado = usuario.estado === 'activo' ? 'badge-activo' : 'badge-inactivo';
        const estadoTexto = usuario.estado === 'activo' ? 'Activo' : 'Inactivo';
        
        // ============================================
        // MOSTRAR BOTONES SEGÚN PERMISOS
        // ============================================
        let botones = '';
        
        // Botón Ver (siempre visible para todos)
        botones += `<button class="btn-accion btn-view" onclick="verUsuario(${usuario.id})" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>`;
        
        // Botón Editar (solo si tiene permiso)
        if (puedeEditar(usuario)) {
            botones += `<button class="btn-accion btn-edit" onclick="editarUsuario(${usuario.id})" title="Editar usuario">
                            <i class="fas fa-edit"></i>
                        </button>`;
        }
        
        // Botón Eliminar (solo si tiene permiso)
        if (puedeEliminar(usuario)) {
            botones += `<button class="btn-accion btn-delete" onclick="eliminarUsuario(${usuario.id})" title="Eliminar usuario">
                            <i class="fas fa-trash"></i>
                        </button>`;
        }
        
        // Si es Administrativo viendo a otro Administrativo o Directivo, solo muestra el botón Ver
        if (currentUserRol === 'administrativo' && (usuario.rol === 'administrativo' || usuario.rol === 'directivo')) {
            botones = `<button class="btn-accion btn-view" onclick="verUsuario(${usuario.id})" title="Ver detalles">
                            <i class="fas fa-eye"></i>
                        </button>`;
        }
        
        return `
            <tr>
                <td><strong>${usuario.matricula}</strong></td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td><span class="${badgeRol}">${rolTexto}</span></td>
                <td><span class="${badgeEstado}">${estadoTexto}</span></td>
                <td>${usuario.ultimoAcceso}</td>
                <td class="acciones-cell">${botones}</td>
            </tr>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR PAGINACIÓN
// ============================================
function renderPagination() {
    const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
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
    const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTabla();
    renderPagination();
}

// ============================================
// ABRIR MODAL CREAR USUARIO
// ============================================
function abrirModalCrear() {
    const currentUserRol = localStorage.getItem('userRol');
    
    // Solo Directivo puede crear nuevos usuarios
    if (currentUserRol !== 'directivo') {
        mostrarMensaje('❌ No tienes permiso para crear usuarios', 'error');
        return;
    }
    
    document.getElementById('modalTitulo').innerHTML = '<i class="fas fa-user-plus"></i> Crear Usuario';
    document.getElementById('usuarioId').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('estado').value = 'activo';
    document.getElementById('carrera').value = '';
    document.getElementById('departamento').value = '';
    document.getElementById('password').value = '';
    document.getElementById('passwordField').style.display = 'block';
    
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
}

// ============================================
// EDITAR USUARIO (CON RESTRICCIONES)
// ============================================
function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    
    // Verificar permiso para editar
    if (!puedeEditar(usuario)) {
        mostrarMensaje('❌ No tienes permiso para editar este usuario', 'error');
        return;
    }
    
    document.getElementById('modalTitulo').innerHTML = '<i class="fas fa-edit"></i> Editar Usuario';
    document.getElementById('usuarioId').value = usuario.id;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('matricula').value = usuario.matricula;
    document.getElementById('email').value = usuario.email;
    document.getElementById('telefono').value = usuario.telefono || '';
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('estado').value = usuario.estado;
    document.getElementById('carrera').value = usuario.carrera || '';
    document.getElementById('departamento').value = usuario.departamento || '';
    document.getElementById('passwordField').style.display = 'none';
    
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
}

// ============================================
// GUARDAR USUARIO
// ============================================
function guardarUsuario() {
    const currentUserRol = localStorage.getItem('userRol');
    const id = document.getElementById('usuarioId').value;
    const nombre = document.getElementById('nombre').value;
    const matricula = document.getElementById('matricula').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const rol = document.getElementById('rol').value;
    const estado = document.getElementById('estado').value;
    const carrera = document.getElementById('carrera').value;
    const departamento = document.getElementById('departamento').value;
    const password = document.getElementById('password').value;
    
    if (!nombre || !matricula || !email || !rol) {
        mostrarMensaje('❌ Completa los campos obligatorios', 'error');
        return;
    }
    
    if (!id && !password) {
        mostrarMensaje('❌ Ingresa una contraseña temporal', 'error');
        return;
    }
    
    // Solo Directivo puede crear usuarios nuevos
    if (!id && currentUserRol !== 'directivo') {
        mostrarMensaje('❌ No tienes permiso para crear usuarios', 'error');
        return;
    }
    
    if (id) {
        // Editar usuario existente - verificar permiso
        const usuarioExistente = usuarios.find(u => u.id == id);
        if (!puedeEditar(usuarioExistente)) {
            mostrarMensaje('❌ No tienes permiso para editar este usuario', 'error');
            return;
        }
        
        const index = usuarios.findIndex(u => u.id == id);
        if (index !== -1) {
            usuarios[index] = {
                ...usuarios[index],
                nombre, matricula, email, telefono, rol, estado,
                carrera: rol === 'alumno' ? carrera : '',
                departamento: rol === 'maestro' ? departamento : ''
            };
            mostrarMensaje('✅ Usuario actualizado correctamente');
        }
    } else {
        // Crear nuevo usuario
        const nuevoUsuario = {
            id: usuarios.length + 1,
            matricula,
            nombre,
            email,
            telefono,
            rol,
            estado,
            ultimoAcceso: 'Nunca',
            carrera: rol === 'alumno' ? carrera : '',
            departamento: rol === 'maestro' ? departamento : ''
        };
        usuarios.push(nuevoUsuario);
        mostrarMensaje('✅ Usuario creado correctamente');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
    actualizarEstadisticas();
    filtrarUsuarios();
}

// ============================================
// VER USUARIO (SIEMPRE PERMITIDO)
// ============================================
function verUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    
    let rolTexto = '';
    switch(usuario.rol) {
        case 'alumno': rolTexto = 'Alumno'; break;
        case 'maestro': rolTexto = 'Maestro'; break;
        case 'administrativo': rolTexto = 'Administrativo'; break;
        case 'directivo': rolTexto = 'Directivo'; break;
    }
    
    const contenido = `
        <div class="text-center mb-3">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1e3c72, #2a5298); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">
                <i class="fas fa-user-graduate" style="font-size: 2.5rem; color: white;"></i>
            </div>
            <h5 class="mt-3">${usuario.nombre}</h5>
            <p class="text-muted">${rolTexto}</p>
        </div>
        <div class="row mb-2"><div class="col-5"><strong>Matrícula:</strong></div><div class="col-7">${usuario.matricula}</div></div>
        <div class="row mb-2"><div class="col-5"><strong>Email:</strong></div><div class="col-7">${usuario.email}</div></div>
        <div class="row mb-2"><div class="col-5"><strong>Teléfono:</strong></div><div class="col-7">${usuario.telefono || 'No registrado'}</div></div>
        <div class="row mb-2"><div class="col-5"><strong>Estado:</strong></div><div class="col-7">${usuario.estado === 'activo' ? '✅ Activo' : '❌ Inactivo'}</div></div>
        <div class="row mb-2"><div class="col-5"><strong>Último acceso:</strong></div><div class="col-7">${usuario.ultimoAcceso}</div></div>
        ${usuario.carrera ? `<div class="row mb-2"><div class="col-5"><strong>Carrera:</strong></div><div class="col-7">${usuario.carrera}</div></div>` : ''}
        ${usuario.departamento ? `<div class="row mb-2"><div class="col-5"><strong>Departamento:</strong></div><div class="col-7">${usuario.departamento}</div></div>` : ''}
    `;
    
    document.getElementById('viewModalBody').innerHTML = contenido;
    const modal = new bootstrap.Modal(document.getElementById('viewModal'));
    modal.show();
}

// ============================================
// ELIMINAR USUARIO (CON RESTRICCIÓN DE ROLES)
// ============================================
function eliminarUsuario(id) {
    const currentUserRol = localStorage.getItem('userRol');
    const currentUserMatricula = localStorage.getItem('userMatricula');
    
    const usuarioAEliminar = usuarios.find(u => u.id === id);
    if (!usuarioAEliminar) {
        mostrarMensaje('❌ Usuario no encontrado', 'error');
        return;
    }
    
    // Verificar permiso para eliminar
    if (!puedeEliminar(usuarioAEliminar)) {
        mostrarMensaje('❌ No tienes permiso para eliminar este usuario', 'error');
        return;
    }
    
    let rolTexto = '';
    switch(usuarioAEliminar.rol) {
        case 'alumno': rolTexto = 'Alumno'; break;
        case 'maestro': rolTexto = 'Maestro'; break;
        case 'administrativo': rolTexto = 'Administrativo'; break;
        case 'directivo': rolTexto = 'Directivo'; break;
    }
    
    const confirmar = confirm(
        `⚠️ ¿Estás seguro de que deseas eliminar este usuario?\n\n` +
        `📌 Nombre: ${usuarioAEliminar.nombre}\n` +
        `📌 Matrícula: ${usuarioAEliminar.matricula}\n` +
        `📌 Rol: ${rolTexto}\n\n` +
        `Esta acción NO se puede deshacer.`
    );
    
    if (confirmar) {
        const index = usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            usuarios.splice(index, 1);
            actualizarEstadisticas();
            filtrarUsuarios();
            mostrarMensaje(`✅ Usuario "${usuarioAEliminar.nombre}" eliminado correctamente`);
        }
    }
}

// ============================================
// EXPORTAR A EXCEL
// ============================================
function exportarExcel() {
    const excelData = usuariosFiltrados.map(u => ({
        'Matrícula': u.matricula,
        'Nombre': u.nombre,
        'Email': u.email,
        'Teléfono': u.telefono || '',
        'Rol': u.rol,
        'Estado': u.estado,
        'Último Acceso': u.ultimoAcceso
    }));
    
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, `Usuarios_${new Date().toISOString().slice(0, 10)}.xlsx`);
    
    mostrarMensaje('✅ Excel exportado correctamente');
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.getElementById('usuariosTable');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Usuarios_${new Date().toISOString().slice(0, 10)}.pdf`,
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