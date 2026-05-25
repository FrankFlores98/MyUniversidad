/* ============================================
   LOGIN JS - MI UNIVERSIDAD
   VERSIÓN CONECTADA AL BACKEND
   ============================================ */

// Configuración de la API
const API_URL = 'http://localhost:5000/api';

// ============================================
// GENERAR PARTÍCULAS DE FONDO
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 100 + 50;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = Math.random() * 20 + 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// DETECTAR ROL POR MATRÍCULA
// ============================================
function detectarRol(matricula) {
    if (!matricula || matricula.length < 2) return null;
    const terminacion = matricula.slice(-2);
    const roles = {
        '23': { nombre: 'Alumno', valor: 'alumno' },
        '24': { nombre: 'Maestro', valor: 'maestro' },
        '25': { nombre: 'Administrativo', valor: 'administrativo' },
        '26': { nombre: 'Directivo', valor: 'directivo' }
    };
    return roles[terminacion] || null;
}

// ============================================
// MOSTRAR ALERTAS
// ============================================
function showAlert(message, type, containerId = 'alertContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const alertClass = type === 'error' ? 'alert-error' : 'alert-success';
    const icon = type === 'error' ? 'fa-exclamation-triangle' : 'fa-check-circle';
    
    container.innerHTML = `<div class="alert-custom ${alertClass}"><i class="fas ${icon}"></i> ${message}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ============================================
// GUARDAR DATOS DEL USUARIO
// ============================================
function saveUserData(userData, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userNombre', userData.nombre);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userMatricula', userData.matricula);
    localStorage.setItem('userRol', userData.rol);
    localStorage.setItem('userId', userData.id);
    
    // Guardar usuario recordado
    const rememberCheckbox = document.getElementById('rememberUser');
    if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('rememberedUser', userData.matricula);
        localStorage.setItem('rememberedNombre', userData.nombre);
    } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedNombre');
    }
}

// ============================================
// CARGAR USUARIO RECORDADO
// ============================================
function loadRememberedUser() {
    const rememberedMatricula = localStorage.getItem('rememberedUser');
    const rememberedNombre = localStorage.getItem('rememberedNombre');
    const matriculaInput = document.getElementById('matricula');
    const nombreInput = document.getElementById('nombreUsuario');
    const rememberCheckbox = document.getElementById('rememberUser');
    
    if (rememberedMatricula && matriculaInput) {
        matriculaInput.value = rememberedMatricula;
        if (nombreInput && rememberedNombre) {
            nombreInput.value = rememberedNombre;
        }
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
        
        const rol = detectarRol(rememberedMatricula);
        const rolDetectionDiv = document.getElementById('rolDetection');
        const rolTexto = document.getElementById('rolDetectadoTexto');
        
        if (rol && rolDetectionDiv && rolTexto) {
            rolDetectionDiv.style.display = 'flex';
            rolTexto.innerHTML = `<span class="rol-valido">${rol.nombre}</span>`;
        }
    }
}

// ============================================
// DETECTAR ROL EN TIEMPO REAL
// ============================================
function setupRolDetection() {
    const matriculaInput = document.getElementById('matricula');
    const rolDetectionDiv = document.getElementById('rolDetection');
    const rolTexto = document.getElementById('rolDetectadoTexto');
    
    if (!matriculaInput || !rolDetectionDiv || !rolTexto) return;
    
    matriculaInput.addEventListener('input', function() {
        const rol = detectarRol(this.value);
        if (rol) {
            rolDetectionDiv.style.display = 'flex';
            rolTexto.innerHTML = `<span class="rol-valido">${rol.nombre}</span>`;
        } else if (this.value.length >= 2) {
            rolDetectionDiv.style.display = 'flex';
            rolTexto.innerHTML = `<span class="rol-invalido">No válido (debe terminar en 23,24,25,26)</span>`;
        } else {
            rolDetectionDiv.style.display = 'none';
        }
    });
}

// ============================================
// TOGGLE PASSWORD VISIBILITY
// ============================================
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (!passwordInput || !toggleBtn) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// ============================================
// LOGIN (CONECTADO AL BACKEND)
// ============================================
async function handleLogin(event) {
    event.preventDefault();
    
    const nombreInput = document.getElementById('nombreUsuario');
    const matriculaInput = document.getElementById('matricula');
    const passwordInput = document.getElementById('password');
    
    const nombre = nombreInput ? nombreInput.value.trim() : '';
    const matricula = matriculaInput ? matriculaInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    
    if (!nombre) {
        showAlert('Por favor ingresa tu nombre de usuario', 'error');
        if (nombreInput) nombreInput.focus();
        return;
    }
    
    if (!matricula) {
        showAlert('Por favor ingresa tu matrícula', 'error');
        if (matriculaInput) matriculaInput.focus();
        return;
    }
    
    if (!password) {
        showAlert('Por favor ingresa tu contraseña', 'error');
        if (passwordInput) passwordInput.focus();
        return;
    }
    
    const rol = detectarRol(matricula);
    if (!rol) {
        showAlert('Matrícula inválida. Debe terminar en 23, 24, 25 o 26', 'error');
        return;
    }
    
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn ? loginBtn.innerHTML : 'Iniciar Sesión';
    
    if (loginBtn) {
        loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Iniciando sesión...';
        loginBtn.disabled = true;
    }
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matricula, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Agregar el nombre manualmente (el backend no lo guarda en login)
            const userData = {
                id: data.user.id,
                nombre: nombre,
                email: data.user.email,
                matricula: data.user.matricula,
                rol: data.user.rol
            };
            
            saveUserData(userData, data.token);
            showAlert(`¡Bienvenido ${nombre}!`, 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showAlert(data.error || 'Credenciales inválidas', 'error');
            if (loginBtn) {
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al conectar con el servidor. ¿El backend está corriendo?', 'error');
        if (loginBtn) {
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    }
}

// ============================================
// MOSTRAR MODAL DE REGISTRO
// ============================================
function showRegister() {
    const regNombre = document.getElementById('regNombre');
    const regEmail = document.getElementById('regEmail');
    const regMatricula = document.getElementById('regMatricula');
    const regPassword = document.getElementById('regPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');
    const regRol = document.getElementById('regRol');
    
    if (regNombre) regNombre.value = '';
    if (regEmail) regEmail.value = '';
    if (regMatricula) regMatricula.value = '';
    if (regPassword) regPassword.value = '';
    if (regConfirmPassword) regConfirmPassword.value = '';
    if (regRol) regRol.value = '';
    
    const modalElement = document.getElementById('registerModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// ============================================
// DETECTAR ROL EN REGISTRO
// ============================================
function setupRegistroRolDetection() {
    const regMatricula = document.getElementById('regMatricula');
    const regRol = document.getElementById('regRol');
    
    if (!regMatricula || !regRol) return;
    
    regMatricula.addEventListener('input', function() {
        const rol = detectarRol(this.value);
        if (rol) {
            regRol.value = rol.nombre;
            regRol.style.color = '#28a745';
            regRol.style.fontWeight = 'bold';
        } else if (this.value.length >= 2) {
            regRol.value = 'No válido';
            regRol.style.color = '#dc3545';
            regRol.style.fontWeight = 'bold';
        } else {
            regRol.value = '';
        }
    });
}

// ============================================
// REGISTRAR USUARIO (CONECTADO AL BACKEND)
// ============================================
async function registerUser() {
    const nombre = document.getElementById('regNombre')?.value.trim() || '';
    const email = document.getElementById('regEmail')?.value.trim() || '';
    const matricula = document.getElementById('regMatricula')?.value.trim() || '';
    const password = document.getElementById('regPassword')?.value || '';
    const confirmPassword = document.getElementById('regConfirmPassword')?.value || '';
    const rolDetectado = document.getElementById('regRol')?.value || '';
    
    if (!nombre || !email || !matricula || !password) {
        showAlert('Completa todos los campos', 'error', 'registerAlert');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Ingresa un correo electrónico válido', 'error', 'registerAlert');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'error', 'registerAlert');
        return;
    }
    
    if (password.length < 6) {
        showAlert('La contraseña debe tener al menos 6 caracteres', 'error', 'registerAlert');
        return;
    }
    
    if (rolDetectado === 'No válido' || !rolDetectado) {
        showAlert('Matrícula inválida. Debe terminar en 23,24,25,26', 'error', 'registerAlert');
        return;
    }
    
    const registerBtn = document.querySelector('#registerModal .btn-success');
    const originalText = registerBtn ? registerBtn.innerHTML : 'Registrarse';
    
    if (registerBtn) {
        registerBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Registrando...';
        registerBtn.disabled = true;
    }
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, matricula, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showAlert('¡Registro exitoso! Ahora puedes iniciar sesión', 'success', 'registerAlert');
            
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                if (modal) modal.hide();
                
                const nombreUsuario = document.getElementById('nombreUsuario');
                const matriculaInput = document.getElementById('matricula');
                
                if (nombreUsuario) nombreUsuario.value = nombre;
                if (matriculaInput) matriculaInput.value = matricula;
                
                document.getElementById('registerAlert').innerHTML = '';
            }, 1500);
        } else {
            showAlert(data.error || 'Error al registrar usuario', 'error', 'registerAlert');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al conectar con el servidor', 'error', 'registerAlert');
    } finally {
        if (registerBtn) {
            registerBtn.innerHTML = originalText;
            registerBtn.disabled = false;
        }
    }
}

// ============================================
// MOSTRAR MODAL DE RECUPERACIÓN
// ============================================
function showForgotPassword() {
    const forgotNombre = document.getElementById('forgotNombre');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotMatricula = document.getElementById('forgotMatricula');
    
    if (forgotNombre) forgotNombre.value = '';
    if (forgotEmail) forgotEmail.value = '';
    if (forgotMatricula) forgotMatricula.value = '';
    
    const modalElement = document.getElementById('forgotModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// ============================================
// ENVIAR RECUPERACIÓN (CONECTADO AL BACKEND)
// ============================================
async function sendRecovery() {
    const email = document.getElementById('forgotEmail')?.value.trim() || '';
    const matricula = document.getElementById('forgotMatricula')?.value.trim() || '';
    
    if (!email && !matricula) {
        showAlert('Ingresa tu correo o matrícula', 'error', 'forgotAlert');
        return;
    }
    
    const sendBtn = document.querySelector('#forgotModal .btn-primary');
    const originalText = sendBtn ? sendBtn.innerHTML : 'Enviar';
    
    if (sendBtn) {
        sendBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Enviando...';
        sendBtn.disabled = true;
    }
    
    try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, matricula })
        });
        
        if (response.ok) {
            showAlert('Se ha enviado un enlace de recuperación a tu correo', 'success', 'forgotAlert');
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('forgotModal'));
                if (modal) modal.hide();
            }, 2000);
        } else {
            const data = await response.json();
            showAlert(data.error || 'Usuario no encontrado', 'error', 'forgotAlert');
        }
    } catch (error) {
        showAlert('Error al conectar con el servidor', 'error', 'forgotAlert');
    } finally {
        if (sendBtn) {
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
        }
    }
}

// ============================================
// MODO OSCURO
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('darkModeBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// ============================================
// VERIFICAR SESIÓN ACTIVA
// ============================================
function checkActiveSession() {
    const token = localStorage.getItem('token');
    const userNombre = localStorage.getItem('userNombre');
    if (token && userNombre) {
        window.location.href = 'dashboard.html';
    }
}

// ============================================
// RECORDAR USUARIO
// ============================================
document.getElementById('rememberUser')?.addEventListener('change', function(e) {
    const matricula = document.getElementById('matricula')?.value;
    const nombre = document.getElementById('nombreUsuario')?.value;
    if (e.target.checked && matricula) {
        localStorage.setItem('rememberedUser', matricula);
        localStorage.setItem('rememberedNombre', nombre);
    } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedNombre');
    }
});

// ============================================
// INICIALIZAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    checkActiveSession();
    checkDarkMode();
    loadRememberedUser();
    setupRolDetection();
    setupRegistroRolDetection();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.togglePasswordVisibility = togglePasswordVisibility;
window.showRegister = showRegister;
window.registerUser = registerUser;
window.showForgotPassword = showForgotPassword;
window.sendRecovery = sendRecovery;
window.toggleDarkMode = toggleDarkMode;