/* ============================================
   PERFIL JS - MI UNIVERSIDAD
   ============================================ */

// ============================================
// OBTENER DATOS DEL USUARIO DESDE localStorage
// ============================================
const userNombre = localStorage.getItem('userNombre') || 'Usuario';
const userEmail = localStorage.getItem('userEmail') || 'correo@miuniversidad.edu.mx';
const userMatricula = localStorage.getItem('userMatricula') || '000000';
const userRol = localStorage.getItem('userRol') || 'alumno';
const userTelefono = localStorage.getItem('userTelefono') || '';
const userDireccion = localStorage.getItem('userDireccion') || '';
const userId = localStorage.getItem('userId') || '1';

// Datos adicionales simulados (en producción vendrían del backend)
let userData = {
    fechaRegistro: '2024-01-15',
    fechaNacimiento: localStorage.getItem('userFechaNacimiento') || '',
    carrera: 'Ingeniería en Sistemas',
    semestre: '6to Semestre',
    promedio: '87.5'
};

// ============================================
// MOSTRAR DATOS EN EL PERFIL
// ============================================
function displayProfileData() {
    // Avatar
    const primeraLetra = userNombre.charAt(0).toUpperCase();
    document.getElementById('avatarLetter').textContent = primeraLetra;
    
    // Información básica
    document.getElementById('profileNombre').textContent = userNombre;
    document.getElementById('profileMatricula').textContent = userMatricula;
    document.getElementById('profileEmail').textContent = userEmail;
    document.getElementById('profileFecha').textContent = userData.fechaRegistro;
    
    // Texto del rol
    let rolTexto = '';
    switch(userRol) {
        case 'alumno': rolTexto = 'Alumno'; break;
        case 'maestro': rolTexto = 'Maestro'; break;
        case 'administrativo': rolTexto = 'Administrativo'; break;
        case 'directivo': rolTexto = 'Directivo'; break;
        default: rolTexto = userRol;
    }
    document.getElementById('profileRol').textContent = rolTexto;
    
    // Formulario de información personal
    document.getElementById('nombre').value = userNombre;
    document.getElementById('email').value = userEmail;
    document.getElementById('matricula').value = userMatricula;
    document.getElementById('rol').value = rolTexto;
    document.getElementById('telefono').value = userTelefono;
    document.getElementById('direccion').value = userDireccion;
    document.getElementById('fechaNacimiento').value = userData.fechaNacimiento;
    
    // Mostrar información académica solo para alumnos
    if (userRol === 'alumno') {
        document.getElementById('academicCard').style.display = 'block';
        document.getElementById('carrera').value = userData.carrera;
        document.getElementById('semestre').value = userData.semestre;
        document.getElementById('promedio').value = userData.promedio;
    }
}

// ============================================
// GUARDAR CAMBIOS DEL PERFIL
// ============================================
function saveProfile() {
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    
    // Validar teléfono (opcional)
    if (telefono && !/^\d{10}$/.test(telefono)) {
        showModal('Error', 'El teléfono debe tener 10 dígitos', 'error');
        return;
    }
    
    // Guardar en localStorage
    localStorage.setItem('userTelefono', telefono);
    localStorage.setItem('userDireccion', direccion);
    localStorage.setItem('userFechaNacimiento', fechaNacimiento);
    
    // Actualizar objeto local
    userData.fechaNacimiento = fechaNacimiento;
    
    // Mostrar mensaje de éxito
    showModal('Éxito', 'Tus datos han sido actualizados correctamente', 'success');
}

// ============================================
// EDITAR PERFIL (habilitar campos)
// ============================================
function editProfile() {
    const inputs = document.querySelectorAll('#profileForm input:not([readonly])');
    inputs.forEach(input => {
        input.focus();
    });
    
    // Scroll al formulario
    document.getElementById('profileForm').scrollIntoView({ behavior: 'smooth' });
    
    // Resaltar campos editables
    const editableInputs = document.querySelectorAll('#telefono, #direccion, #fechaNacimiento');
    editableInputs.forEach(input => {
        input.style.borderColor = '#ffc107';
        setTimeout(() => {
            input.style.borderColor = '#e0e0e0';
        }, 2000);
    });
}

// ============================================
// CAMBIAR CONTRASEÑA
// ============================================
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validaciones
    if (!currentPassword) {
        showModal('Error', 'Por favor ingresa tu contraseña actual', 'error');
        return;
    }
    
    if (!newPassword) {
        showModal('Error', 'Por favor ingresa una nueva contraseña', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showModal('Error', 'La nueva contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showModal('Error', 'Las nuevas contraseñas no coinciden', 'error');
        return;
    }
    
    // Simular cambio de contraseña (en producción conectar con backend)
    // Aquí iría un fetch al backend para cambiar la contraseña
    
    // Limpiar campos
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    showModal('Éxito', 'Tu contraseña ha sido actualizada correctamente', 'success');
}

// ============================================
// CAMBIAR AVATAR
// ============================================
function changeAvatar() {
    // Crear input de archivo oculto
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const avatarCircle = document.querySelector('.avatar-circle');
                avatarCircle.style.background = `url(${event.target.result}) center/cover`;
                avatarCircle.innerHTML = '';
                
                // Guardar en localStorage (opcional)
                localStorage.setItem('userAvatar', event.target.result);
                
                showModal('Éxito', 'Foto de perfil actualizada', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// ============================================
// MOSTRAR MODAL
// ============================================
function showModal(title, message, type = 'success') {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const modalTitle = document.querySelector('#confirmModal .modal-title');
    const modalBody = document.getElementById('modalMessage');
    const modalHeader = document.querySelector('#confirmModal .modal-header');
    
    if (type === 'error') {
        modalTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        modalHeader.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    } else {
        modalTitle.innerHTML = '<i class="fas fa-check-circle"></i> Éxito';
        modalHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    }
    
    modalBody.textContent = message;
    modal.show();
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
// INICIALIZAR PÁGINA
// ============================================
function init() {
    checkAuth();
    displayProfileData();
}
// ============================================
// VOLVER AL DASHBOARD
// ============================================
function goBackToDashboard() {
    // Verificar si hay sesión activa
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'login.html';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);