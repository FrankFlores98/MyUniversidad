/* ============================================
   ANUNCIOS JS - MI UNIVERSIDAD
   VERSIÓN PROFESIONAL COMPLETA
   ============================================ */

// ============================================
// VARIABLES GLOBALES
// ============================================
let anuncios = [];
let userRol = '';
let userNombre = '';
let userMatricula = '';
let filtroActual = 'todos';
let modoVista = 'grid';

// ============================================
// INICIALIZACIÓN
// ============================================
function init() {
    console.log('🚀 Inicializando sistema de anuncios...');
    checkAuth();
    cargarDatosUsuario();
    cargarAnuncios();
    configurarPermisos();
    inicializarEventListeners();
    actualizarContadorAnuncios();
    console.log('✅ Sistema de anuncios inicializado correctamente');
}

// ============================================
// VERIFICAR AUTENTICACIÓN
// ============================================
function checkAuth() {
    const token = localStorage.getItem('token');
    userRol = localStorage.getItem('userRol') || 'alumno';
    
    if (!token) {
        console.warn('⚠️ No hay token de autenticación, redirigiendo al login...');
        window.location.href = 'login.html';
    }
    
    console.log(`👤 Usuario autenticado: ${userRol}`);
}

// ============================================
// CARGAR DATOS DEL USUARIO
// ============================================
function cargarDatosUsuario() {
    userNombre = localStorage.getItem('userNombre') || 'Usuario';
    userMatricula = localStorage.getItem('userMatricula') || '000000';
    console.log(`📋 Datos del usuario: ${userNombre} (${userMatricula}) - Rol: ${userRol}`);
}

// ============================================
// CONFIGURAR PERMISOS SEGÚN ROL
// ============================================
function configurarPermisos() {
    const formAnuncio = document.getElementById('formAnuncio');
    const esAdmin = (userRol === 'administrativo' || userRol === 'directivo');
    
    if (esAdmin) {
        formAnuncio.style.display = 'block';
        console.log('✏️ Modo administrador: formulario de publicación visible');
    } else {
        formAnuncio.style.display = 'none';
        console.log('👀 Modo visualizador: solo lectura de anuncios');
    }
}

// ============================================
// INICIALIZAR EVENT LISTENERS
// ============================================
function inicializarEventListeners() {
    console.log('🔄 Inicializando event listeners...');
    
    const tituloInput = document.getElementById('tituloAnuncio');
    const mensajeTextarea = document.getElementById('mensajeAnuncio');
    const dirigidoSelect = document.getElementById('dirigidoA');
    
    if (tituloInput) {
        tituloInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (document.getElementById('mensajeAnuncio').value.trim()) {
                    publicarAnuncio();
                }
            }
        });
    }
    
    if (mensajeTextarea) {
        mensajeTextarea.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                publicarAnuncio();
            }
        });
    }
    
    console.log('✅ Event listeners inicializados');
}

// ============================================
// CARGAR ANUNCIOS GUARDADOS
// ============================================
function cargarAnuncios() {
    console.log('📡 Cargando anuncios desde localStorage...');
    
    const guardados = localStorage.getItem('anuncios');
    
    if (guardados) {
        anuncios = JSON.parse(guardados);
        console.log(`📦 ${anuncios.length} anuncios cargados desde almacenamiento local`);
    } else {
        anuncios = crearAnunciosDemo();
        guardarAnuncios();
        console.log(`🆕 ${anuncios.length} anuncios de demostración creados`);
    }
    
    renderizarAnuncios();
}

// ============================================
// CREAR ANUNCIOS DE DEMOSTRACIÓN
// ============================================
function crearAnunciosDemo() {
    const fechaBase = new Date();
    
    return [
        {
            id: 1,
            titulo: 'Bienvenida al nuevo semestre',
            mensaje: 'Damos la bienvenida a todos los estudiantes al semestre Agosto-Diciembre 2024. Les deseamos mucho éxito en sus estudios y los invitamos a participar activamente en las actividades extracurriculares.',
            autor: 'Dirección Académica',
            autorRol: 'directivo',
            fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - 2).toISOString(),
            dirigidoA: 'todos',
            destacado: true
        },
        {
            id: 2,
            titulo: 'Convocatoria de becas académicas',
            mensaje: 'Se informa a los alumnos que se abre la convocatoria para becas académicas. Fecha límite: 30 de septiembre. Requisitos: promedio mínimo de 8.5 y no adeudar materias.',
            autor: 'Departamento de Becas',
            autorRol: 'administrativo',
            fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - 5).toISOString(),
            dirigidoA: 'alumnos',
            destacado: false
        },
        {
            id: 3,
            titulo: 'Reunión de academia',
            mensaje: 'Se convoca a todos los maestros a la reunión de academia el día viernes 23 de agosto a las 10:00 am en el auditorio principal. Favor de confirmar asistencia.',
            autor: 'Coordinación Académica',
            autorRol: 'administrativo',
            fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - 7).toISOString(),
            dirigidoA: 'maestros',
            destacado: false
        },
        {
            id: 4,
            titulo: '📢 Día de la Universidad',
            mensaje: 'El próximo 15 de septiembre celebraremos el Día de la Universidad con actividades culturales, deportivas y académicas. ¡Los esperamos!',
            autor: 'Dirección General',
            autorRol: 'directivo',
            fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - 10).toISOString(),
            dirigidoA: 'todos',
            destacado: true
        },
        {
            id: 5,
            titulo: 'Cierre de inscripciones',
            mensaje: 'Se les recuerda a los alumnos que el plazo para inscripciones cierra el 31 de agosto. No dejen pasar la fecha límite.',
            autor: 'Control Escolar',
            autorRol: 'administrativo',
            fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - 12).toISOString(),
            dirigidoA: 'alumnos',
            destacado: false
        },
        {
            id: 6,
            titulo: 'Capacitación docente',
            mensaje: 'Se invita a los maestros a la capacitación "Nuevas metodologías de enseñanza" que se realizará el 5 de septiembre.',
            autor: 'Instituto de Formación',
            autorRol: 'administrativo',
            fecha: new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - 15).toISOString(),
            dirigidoA: 'maestros',
            destacado: false
        }
    ];
}

// ============================================
// GUARDAR ANUNCIOS EN LOCALSTORAGE
// ============================================
function guardarAnuncios() {
    localStorage.setItem('anuncios', JSON.stringify(anuncios));
    console.log(`💾 ${anuncios.length} anuncios guardados en localStorage`);
    actualizarContadorAnuncios();
}

// ============================================
// ACTUALIZAR CONTADOR DE ANUNCIOS
// ============================================
function actualizarContadorAnuncios() {
    const countSpan = document.getElementById('anunciosCount');
    if (countSpan) {
        const anunciosVisibles = filtrarAnunciosPorRol(anuncios);
        countSpan.textContent = anunciosVisibles.length;
    }
}

// ============================================
// FILTRAR ANUNCIOS POR ROL DEL USUARIO
// ============================================
function filtrarAnunciosPorRol(anunciosLista) {
    return anunciosLista.filter(anuncio => {
        if (anuncio.dirigidoA === 'todos') return true;
        if (anuncio.dirigidoA === 'alumnos' && userRol === 'alumno') return true;
        if (anuncio.dirigidoA === 'maestros' && userRol === 'maestro') return true;
        if (userRol === 'administrativo' || userRol === 'directivo') return true;
        return false;
    });
}

// ============================================
// RENDERIZAR ANUNCIOS
// ============================================
function renderizarAnuncios() {
    console.log('🎨 Renderizando anuncios...');
    
    const container = document.getElementById('listaAnuncios');
    if (!container) return;
    
    let anunciosFiltrados = filtrarAnunciosPorRol(anuncios);
    
    anunciosFiltrados.sort((a, b) => {
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        return new Date(b.fecha) - new Date(a.fecha);
    });
    
    actualizarContadorAnuncios();
    
    if (anunciosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bullhorn"></i>
                <h5>No hay anuncios disponibles</h5>
                <p>Los nuevos anuncios aparecerán aquí</p>
                ${(userRol === 'administrativo' || userRol === 'directivo') ? 
                    '<button class="btn-publicar mt-3" onclick="document.getElementById(\'tituloAnuncio\').focus()"><i class="fas fa-plus"></i> Crear primer anuncio</button>' : ''}
            </div>
        `;
        console.log('📭 No hay anuncios para mostrar');
        return;
    }
    
    container.innerHTML = anunciosFiltrados.map(anuncio => generarHTMLAnuncio(anuncio)).join('');
    console.log(`✅ ${anunciosFiltrados.length} anuncios renderizados correctamente`);
}

// ============================================
// GENERAR HTML DE UN ANUNCIO
// ============================================
function generarHTMLAnuncio(anuncio) {
    let badgeClass = '';
    let badgeText = '';
    let badgeTopClass = '';
    
    switch(anuncio.dirigidoA) {
        case 'todos':
            badgeClass = 'badge-todos';
            badgeTopClass = 'badge-todos-top';
            badgeText = '📢 Para todos';
            break;
        case 'alumnos':
            badgeClass = 'badge-alumnos';
            badgeTopClass = 'badge-alumnos-top';
            badgeText = '🎓 Para Alumnos';
            break;
        case 'maestros':
            badgeClass = 'badge-maestros';
            badgeTopClass = 'badge-maestros-top';
            badgeText = '👨‍🏫 Para Maestros';
            break;
        default:
            badgeClass = 'badge-todos';
            badgeTopClass = 'badge-todos-top';
            badgeText = '📢 Para todos';
    }
    
    const fecha = new Date(anuncio.fecha);
    const fechaFormateada = fecha.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const esAdmin = (userRol === 'administrativo' || userRol === 'directivo');
    const botonEliminar = esAdmin ? `
        <button class="btn-eliminar" onclick="eliminarAnuncio(${anuncio.id})">
            <i class="fas fa-trash"></i> Eliminar
        </button>
    ` : '';
    
    const destacadoBadge = anuncio.destacado ? `
        <div class="destacado-badge" style="position: absolute; top: 10px; left: 10px; background: linear-gradient(135deg, #ffd700, #ff8c00); color: #fff; padding: 2px 10px; border-radius: 20px; font-size: 0.65rem; font-weight: 600; z-index: 1;">
            <i class="fas fa-star"></i> Destacado
        </div>
    ` : '';
    
    return `
        <div class="anuncio-card">
            ${destacadoBadge}
            <div class="anuncio-badge-top ${badgeTopClass}">${badgeText}</div>
            <div class="anuncio-content">
                <div class="anuncio-header">
                    <h4 class="anuncio-titulo">${escapeHTML(anuncio.titulo)}</h4>
                    <span class="anuncio-fecha">${fechaFormateada}</span>
                </div>
                <div class="anuncio-autor">
                    <i class="fas fa-user-circle"></i> Publicado por: ${escapeHTML(anuncio.autor)}
                </div>
                <div class="anuncio-mensaje">
                    ${escapeHTML(anuncio.mensaje)}
                </div>
                <div class="anuncio-footer">
                    <span class="anuncio-badge ${badgeClass}"><i class="fas fa-users"></i> ${badgeText}</span>
                    ${botonEliminar}
                </div>
            </div>
        </div>
    `;
}

// ============================================
// ESCAPE DE HTML PARA SEGURIDAD
// ============================================
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================
// PUBLICAR NUEVO ANUNCIO
// ============================================
function publicarAnuncio() {
    const titulo = document.getElementById('tituloAnuncio').value.trim();
    const mensaje = document.getElementById('mensajeAnuncio').value.trim();
    const dirigidoA = document.getElementById('dirigidoA').value;
    
    if (!titulo) {
        mostrarAlerta('❌ Por favor escribe un título para el anuncio', 'error');
        document.getElementById('tituloAnuncio').focus();
        return;
    }
    
    if (!mensaje) {
        mostrarAlerta('❌ Por favor escribe el contenido del anuncio', 'error');
        document.getElementById('mensajeAnuncio').focus();
        return;
    }
    
    if (mensaje.length < 10) {
        mostrarAlerta('❌ El mensaje debe tener al menos 10 caracteres', 'error');
        return;
    }
    
    const nuevoAnuncio = {
        id: Date.now(),
        titulo: titulo,
        mensaje: mensaje,
        autor: userNombre,
        autorRol: userRol,
        fecha: new Date().toISOString(),
        dirigidoA: dirigidoA,
        destacado: false
    };
    
    anuncios.unshift(nuevoAnuncio);
    guardarAnuncios();
    renderizarAnuncios();
    
    document.getElementById('tituloAnuncio').value = '';
    document.getElementById('mensajeAnuncio').value = '';
    document.getElementById('dirigidoA').value = 'todos';
    
    mostrarAlerta(`✅ Anuncio "${titulo}" publicado correctamente`, 'success');
    console.log(`📢 Nuevo anuncio publicado: ${titulo}`);
}

// ============================================
// ELIMINAR ANUNCIO
// ============================================
function eliminarAnuncio(id) {
    if (userRol !== 'administrativo' && userRol !== 'directivo') {
        mostrarAlerta('❌ No tienes permiso para eliminar anuncios', 'error');
        return;
    }
    
    const anuncio = anuncios.find(a => a.id === id);
    if (!anuncio) return;
    
    if (confirm(`¿Estás seguro de que deseas eliminar el anuncio "${anuncio.titulo}"?\n\nEsta acción no se puede deshacer.`)) {
        anuncios = anuncios.filter(a => a.id !== id);
        guardarAnuncios();
        renderizarAnuncios();
        mostrarAlerta(`✅ Anuncio "${anuncio.titulo}" eliminado correctamente`, 'success');
        console.log(`🗑️ Anuncio eliminado: ${anuncio.titulo}`);
    }
}

// ============================================
// MOSTRAR ALERTA TOAST
// ============================================
function mostrarAlerta(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${tipo}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        </div>
        <div class="toast-message">${mensaje}</div>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    console.log('🔙 Regresando al dashboard...');
    window.location.href = 'dashboard.html';
}

// ============================================
// TOGGLE MODO OSCURO (desde dark-mode.js)
// ============================================
function toggleDarkMode() {
    if (typeof window.toggleDarkMode === 'function') {
        window.toggleDarkMode();
    } else {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        const btn = document.getElementById('darkModeBtn');
        if (btn) {
            btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
}

// ============================================
// CHECK MODO OSCURO
// ============================================
function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('darkModeBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// ============================================
// INICIALIZAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkDarkMode();
    init();
});