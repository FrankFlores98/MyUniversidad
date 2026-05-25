/* ============================================
   MODO OSCURO - MI UNIVERSIDAD
   ============================================ */

// Verificar preferencia guardada al cargar la página
function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    const darkModeBtn = document.getElementById('darkModeBtn');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeBtn.style.color = '#ffc107';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeBtn.style.color = '#1e3c72';
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
            darkModeBtn.style.color = '#1e3c72';
        }
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if (darkModeBtn) {
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeBtn.style.color = '#ffc107';
        }
    }
}

// Inicializar modo oscuro al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    checkDarkMode();
    
    // Buscar botón de modo oscuro y asignar evento
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.onclick = toggleDarkMode;
    }
});