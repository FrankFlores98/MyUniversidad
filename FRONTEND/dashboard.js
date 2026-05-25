/* ============================================
   DASHBOARD JS - MI UNIVERSIDAD
   ESTRUCTURA PLANA (TODO EN LA MISMA CARPETA)
   ============================================ */

// Obtener datos del usuario guardados en localStorage
const appUserData = JSON.parse(localStorage.getItem('user') || '{}');
const userNombre = localStorage.getItem('userNombre') || appUserData.nombre || 'Usuario';
const userEmail = localStorage.getItem('userEmail') || appUserData.email || 'correo@miuniversidad.edu.mx';
const userMatricula = localStorage.getItem('userMatricula') || appUserData.matricula || '000000';
const userRol = localStorage.getItem('userRol') || appUserData.rol || 'alumno';
const userId = localStorage.getItem('userId') || appUserData.id || '1';

// ============================================
// MOSTRAR INFORMACIÓN DEL USUARIO
// ============================================
function displayUserInfo() {
    // Nombre
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) userNameDisplay.textContent = userNombre;
    
    // Email
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) userEmailDisplay.textContent = userEmail;
    
    // Matrícula
    const userMatriculaDisplay = document.getElementById('userMatriculaDisplay');
    if (userMatriculaDisplay) userMatriculaDisplay.textContent = `Matrícula: ${userMatricula}`;
    
    // Rol
    let rolTexto = '';
    switch(userRol) {
        case 'alumno': rolTexto = 'Alumno'; break;
        case 'maestro': rolTexto = 'Maestro'; break;
        case 'administrativo': rolTexto = 'Administrativo'; break;
        case 'directivo': rolTexto = 'Directivo'; break;
        default: rolTexto = userRol;
    }
    const userRolDisplay = document.getElementById('userRolDisplay');
    if (userRolDisplay) userRolDisplay.textContent = rolTexto;
    
    // Avatar con inicial
    const primeraLetra = userNombre.charAt(0).toUpperCase();
    const avatarLetter = document.getElementById('avatarLetter');
    if (avatarLetter) avatarLetter.textContent = primeraLetra;
}

// ============================================
// CONFIGURAR MENÚ SEGÚN ROL
// ============================================
function setupMenu() {
    const menuContainer = document.getElementById('sidebarMenu');
    if (!menuContainer) return;
    
    let menuItems = [];
    
    // Menú común para todos
    const commonMenu = [
        { icon: 'fas fa-tachometer-alt', text: 'Dashboard', page: 'dashboard', id: 'menuDashboard' }
    ];
    
    // Menú según rol
    let roleMenu = [];
    switch(userRol) {
        case 'alumno':
            roleMenu = [
                { icon: 'fas fa-book', text: 'Mis Materias', page: 'materias' },
                { icon: 'fas fa-tasks', text: 'Tareas', page: 'tareas' },
                { icon: 'fas fa-star', text: 'Calificaciones', page: 'calificaciones' },
                { icon: 'fas fa-scroll', text: 'Kardex', page: 'kardex' },
                { icon: 'fas fa-user', text: 'Mi Perfil', page: 'perfil' },
                { icon: 'fas fa-calendar-alt', text: 'Horario', page: 'horario' },
                { icon: 'fas fa-bullhorn', text: 'Anuncios', page: 'anuncios' }
            ];
            break;
        case 'maestro':
            roleMenu = [
                { icon: 'fas fa-chalkboard-teacher', text: 'Mis Cursos', page: 'cursos' },
                { icon: 'fas fa-tasks', text: 'Gestionar Tareas', page: 'gestion-tareas' },
                { icon: 'fas fa-users', text: 'Mis Alumnos', page: 'alumnos' },
                { icon: 'fas fa-chart-bar', text: 'Estadísticas', page: 'estadisticas' },
                { icon: 'fas fa-user', text: 'Mi Perfil', page: 'perfil' },
                { icon: 'fas fa-bullhorn', text: 'Anuncios', page: 'anuncios' }
            ];
            break;
        case 'administrativo':
            roleMenu = [
                { icon: 'fas fa-users', text: 'Gestionar Usuarios', page: 'admin-usuarios' },
                { icon: 'fas fa-book', text: 'Gestionar Materias', page: 'admin-materias' },
                { icon: 'fas fa-file-certificate', text: 'Constancias y Kardex', page: 'admin-constancias' },
                { icon: 'fas fa-chart-line', text: 'Estadísticas', page: 'estadisticas' },
                { icon: 'fas fa-file-alt', text: 'Reportes', page: 'reportes' },
                { icon: 'fas fa-user', text: 'Mi Perfil', page: 'perfil' },
                { icon: 'fas fa-bullhorn', text: 'Anuncios', page: 'anuncios' }
            ];
            break;
        case 'directivo':
            roleMenu = [
                { icon: 'fas fa-users-cog', text: 'Administración Total', page: 'admin-total' },
                { icon: 'fas fa-users', text: 'Usuarios', page: 'admin-usuarios' },
                { icon: 'fas fa-book', text: 'Materias', page: 'admin-materias' },
                { icon: 'fas fa-file-certificate', text: 'Constancias y Kardex', page: 'admin-constancias' },
                { icon: 'fas fa-chart-line', text: 'Estadísticas Globales', page: 'estadisticas-globales' },
                { icon: 'fas fa-file-alt', text: 'Reportes', page: 'reportes' },
                { icon: 'fas fa-user', text: 'Mi Perfil', page: 'perfil' },
                { icon: 'fas fa-bullhorn', text: 'Anuncios', page: 'anuncios' }
            ];
            break;
    }
    
    menuItems = [...commonMenu, ...roleMenu];
    
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sidebar-menu-item';
        if (item.page === 'dashboard') div.classList.add('active');
        div.onclick = () => loadPage(item.page);
        div.innerHTML = `
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
        `;
        menuContainer.appendChild(div);
    });
}

// ============================================
// CARGAR PÁGINAS - PARA ESTRUCTURA PLANA (sin carpeta pages)
// ============================================
function loadPage(page) {
    console.log('Cargando página:', page);
    
    // Mapeo de páginas a sus archivos HTML (todos en la misma carpeta)
    const pageRoutes = {
        'dashboard': () => window.location.reload(),
        'perfil': () => window.location.href = 'perfil.html',
        'materias': () => window.location.href = 'materias.html',
        'cursos': () => window.location.href = 'cursos.html',
        'tareas': () => window.location.href = 'tareas.html',
        'calificaciones': () => window.location.href = 'calificaciones.html',
        'kardex': () => window.location.href = 'kardex.html',
        'horario': () => window.location.href = 'horario.html',
        'gestion-tareas': () => window.location.href = 'gestion-tareas.html',
        'alumnos': () => window.location.href = 'alumnos.html',
        'estadisticas': () => window.location.href = 'estadisticas.html',
        'admin-usuarios': () => window.location.href = 'admin-usuarios.html',
        'admin-materias': () => window.location.href = 'admin-materias.html',
        'admin-total': () => window.location.href = 'admin-total.html',
        'estadisticas-globales': () => window.location.href = 'estadisticas-globales.html',
        'reportes': () => window.location.href = 'reportes.html',
        'admin-constancias': () => window.location.href = 'admin-constancias.html',
        'anuncios': () => window.location.href = 'anuncios.html'
    };
    
    if (pageRoutes[page]) {
        pageRoutes[page]();
    } else {
        console.log('Página no encontrada:', page);
        alert('Página en construcción: ' + page);
    }
}

// ============================================
// CERRAR SESIÓN (CORREGIDO)
// ============================================
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Borrar todos los datos
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userNombre');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userMatricula');
        localStorage.removeItem('userRol');
        localStorage.removeItem('userId');
        localStorage.removeItem('userTelefono');
        localStorage.removeItem('userDireccion');
        
        // Redirigir al login
        window.location.href = 'login.html';
    }
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
// CONFIGURAR ESTADÍSTICAS SEGÚN ROL
// ============================================
function setupStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;
    
    let stats = [];
    
    switch(userRol) {
        case 'alumno':
            stats = [
                { label: 'Materias Inscritas', value: '6', icon: 'fas fa-book', color: 'primary' },
                { label: 'Promedio General', value: '87.5', icon: 'fas fa-chart-line', color: 'success' },
                { label: 'Tareas Pendientes', value: '3', icon: 'fas fa-tasks', color: 'warning' },
                { label: 'Créditos', value: '48', icon: 'fas fa-certificate', color: 'info' }
            ];
            break;
        case 'maestro':
            stats = [
                { label: 'Cursos Asignados', value: '4', icon: 'fas fa-chalkboard', color: 'primary' },
                { label: 'Alumnos Totales', value: '120', icon: 'fas fa-users', color: 'success' },
                { label: 'Tareas por Revisar', value: '45', icon: 'fas fa-tasks', color: 'warning' },
                { label: 'Promedio Grupos', value: '85', icon: 'fas fa-chart-line', color: 'info' }
            ];
            break;
        case 'administrativo':
            stats = [
                { label: 'Total Alumnos', value: '1,234', icon: 'fas fa-user-graduate', color: 'primary' },
                { label: 'Total Maestros', value: '89', icon: 'fas fa-chalkboard-teacher', color: 'success' },
                { label: 'Materias Activas', value: '45', icon: 'fas fa-book', color: 'warning' },
                { label: 'Reportes', value: '12', icon: 'fas fa-file-alt', color: 'info' }
            ];
            break;
        case 'directivo':
            stats = [
                { label: 'Total Usuarios', value: '2,500', icon: 'fas fa-users', color: 'primary' },
                { label: 'Carreras', value: '8', icon: 'fas fa-graduation-cap', color: 'success' },
                { label: 'Materias', value: '156', icon: 'fas fa-book', color: 'warning' },
                { label: 'Cursos Activos', value: '89', icon: 'fas fa-calendar', color: 'info' }
            ];
            break;
    }
    
    statsGrid.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <div class="stat-info">
                <h3>${stat.value}</h3>
                <p>${stat.label}</p>
            </div>
            <div class="stat-icon ${stat.color}">
                <i class="${stat.icon}"></i>
            </div>
        </div>
    `).join('');
}

// ============================================
// INICIALIZAR GRÁFICA
// ============================================
function initChart() {
    const canvas = document.getElementById('academicChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Datos según el rol
    let chartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: []
    };
    
    if (userRol === 'alumno') {
        chartData.datasets = [{
            label: 'Mi Promedio',
            data: [85, 82, 88, 86, 90, 87],
            borderColor: '#1e3c72',
            backgroundColor: 'rgba(30, 60, 114, 0.1)',
            tension: 0.4,
            fill: true
        }];
    } else if (userRol === 'maestro') {
        chartData.datasets = [{
            label: 'Promedio del Grupo',
            data: [78, 82, 85, 84, 88, 86],
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
            tension: 0.4,
            fill: true
        }];
    } else {
        chartData.datasets = [{
            label: 'Rendimiento General',
            data: [82, 85, 87, 86, 89, 88],
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            tension: 0.4,
            fill: true
        }];
    }
    
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Calificación'
                    }
                }
            }
        }
    });
}

// ============================================
// ACTUALIZAR ACTIVIDADES RECIENTES
// ============================================
function updateRecentActivities() {
    const activitiesContainer = document.getElementById('recentActivities');
    if (!activitiesContainer) return;
    
    let activities = [];
    
    if (userRol === 'alumno') {
        activities = [
            { text: 'Tarea entregada: Matemáticas', time: 'Hace 2 horas', color: '#28a745' },
            { text: 'Nueva tarea: Programación Web', time: 'Hace 5 horas', color: '#ffc107' },
            { text: 'Calificación publicada: Bases de Datos', time: 'Ayer', color: '#17a2b8' },
            { text: 'Clase cancelada: Inglés', time: 'Ayer', color: '#dc3545' }
        ];
    } else if (userRol === 'maestro') {
        activities = [
            { text: '5 tareas por calificar', time: 'Hace 1 hora', color: '#ffc107' },
            { text: 'Nuevo alumno inscrito', time: 'Hace 3 horas', color: '#28a745' },
            { text: 'Reunión de academia', time: 'Mañana 10:00', color: '#17a2b8' }
        ];
    } else {
        activities = [
            { text: 'Nuevo usuario registrado', time: 'Hace 1 hora', color: '#28a745' },
            { text: 'Reporte generado', time: 'Hace 3 horas', color: '#17a2b8' },
            { text: 'Sistema actualizado', time: 'Ayer', color: '#ffc107' }
        ];
    }
    
    activitiesContainer.innerHTML = activities.map(act => `
        <div class="activity-item">
            <i class="fas fa-circle" style="color: ${act.color}; font-size: 10px;"></i>
            <span>${act.text}</span>
            <small>${act.time}</small>
        </div>
    `).join('');
}

// ============================================
// SIDEBAR MEJORADO - FUNCIONES
// ============================================

// Colapsar/Expandir sidebar (para desktop)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.btn-toggle-sidebar i');
    
    if (!sidebar) return;
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        mainContent.style.marginLeft = '80px';
        if (toggleBtn) {
            toggleBtn.classList.remove('fa-chevron-left');
            toggleBtn.classList.add('fa-chevron-right');
        }
        // Guardar preferencia
        localStorage.setItem('sidebarCollapsed', 'true');
    } else {
        mainContent.style.marginLeft = '280px';
        if (toggleBtn) {
            toggleBtn.classList.remove('fa-chevron-right');
            toggleBtn.classList.add('fa-chevron-left');
        }
        // Guardar preferencia
        localStorage.setItem('sidebarCollapsed', 'false');
    }
}

// Abrir sidebar en móvil
function openMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    sidebar.classList.add('open');
    
    // Cerrar al hacer clic fuera
    function closeSidebar(e) {
        if (!sidebar.contains(e.target) && !e.target.closest('.btn-mobile-menu')) {
            sidebar.classList.remove('open');
            document.removeEventListener('click', closeSidebar);
        }
    }
    
    // Esperar un momento antes de agregar el evento
    setTimeout(() => {
        document.addEventListener('click', closeSidebar);
    }, 100);
}

// Cargar estado guardado del sidebar
function loadSidebarState() {
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.btn-toggle-sidebar i');
    
    if (!sidebar) return;
    
    if (sidebarCollapsed === 'true') {
        sidebar.classList.add('collapsed');
        if (mainContent) mainContent.style.marginLeft = '80px';
        if (toggleBtn) {
            toggleBtn.classList.remove('fa-chevron-left');
            toggleBtn.classList.add('fa-chevron-right');
        }
    } else {
        sidebar.classList.remove('collapsed');
        if (mainContent) mainContent.style.marginLeft = '280px';
        if (toggleBtn) {
            toggleBtn.classList.remove('fa-chevron-right');
            toggleBtn.classList.add('fa-chevron-left');
        }
    }
}

// ============================================
// MODO OSCURO
// ============================================

// Verificar preferencia guardada
function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    const darkModeBtn = document.getElementById('darkModeBtn');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Alternar modo oscuro
function toggleDarkMode() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// ============================================
// INICIALIZAR DASHBOARD
// ============================================
function initDashboard() {
    checkAuth();
    displayUserInfo();
    setupMenu();
    setupStats();
    initChart();
    updateRecentActivities();
    checkDarkMode();
    loadSidebarState();
    
    // Mostrar en consola los datos guardados (para verificación)
    console.log('Usuario logueado:', {
        nombre: userNombre,
        email: userEmail,
        matricula: userMatricula,
        rol: userRol
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initDashboard);