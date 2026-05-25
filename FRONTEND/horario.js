/* ============================================
   HORARIO DE CLASES JS - MI UNIVERSIDAD
   ============================================ */

// Obtener datos del usuario
const userNombre = localStorage.getItem('userNombre') || 'Usuario';
const userMatricula = localStorage.getItem('userMatricula') || '000000';

// Variables globales
let vistaActual = 'semanal';
let mesActual = new Date();
let horarioData = [];

// ============================================
// INICIALIZAR
// ============================================
function init() {
    checkAuth();
    mostrarInfoAlumno();
    cargarHorario();
    actualizarResumen();
}

// ============================================
// MOSTRAR INFORMACIÓN DEL ALUMNO
// ============================================
function mostrarInfoAlumno() {
    document.getElementById('alumnoNombre').textContent = userNombre;
    document.getElementById('alumnoMatricula').textContent = userMatricula;
}

// ============================================
// CARGAR HORARIO (SIMULADO)
// ============================================
function cargarHorario() {
    horarioData = [
        {
            id: 1,
            nombre: 'Matemáticas IV',
            codigo: 'MAT-304',
            maestro: 'Dr. Juan Pérez',
            salon: 'A-101',
            dia: 'Lunes',
            horaInicio: '08:00',
            horaFin: '10:00',
            color: '#1e3c72'
        },
        {
            id: 2,
            nombre: 'Desarrollo Web',
            codigo: 'WEB-401',
            maestro: 'Mtra. Ana García',
            salon: 'LAB-2',
            dia: 'Lunes',
            horaInicio: '10:00',
            horaFin: '12:00',
            color: '#28a745'
        },
        {
            id: 3,
            nombre: 'Bases de Datos Avanzadas',
            codigo: 'BD-401',
            maestro: 'Ing. Carlos López',
            salon: 'A-205',
            dia: 'Martes',
            horaInicio: '08:00',
            horaFin: '10:00',
            color: '#17a2b8'
        },
        {
            id: 4,
            nombre: 'Programación Móvil',
            codigo: 'MOV-402',
            maestro: 'Ing. Roberto Gómez',
            salon: 'LAB-3',
            dia: 'Martes',
            horaInicio: '10:00',
            horaFin: '12:00',
            color: '#ffc107'
        },
        {
            id: 5,
            nombre: 'Redes de Computadoras',
            codigo: 'RED-501',
            maestro: 'Dr. Luis Torres',
            salon: 'A-308',
            dia: 'Miércoles',
            horaInicio: '09:00',
            horaFin: '11:00',
            color: '#fd7e14'
        },
        {
            id: 6,
            nombre: 'Ingeniería de Software',
            codigo: 'SIS-502',
            maestro: 'Mtra. María Fernández',
            salon: 'A-101',
            dia: 'Miércoles',
            horaInicio: '11:00',
            horaFin: '13:00',
            color: '#6f42c1'
        },
        {
            id: 7,
            nombre: 'Inteligencia Artificial',
            codigo: 'INT-503',
            maestro: 'Dr. Javier Méndez',
            salon: 'LAB-1',
            dia: 'Jueves',
            horaInicio: '08:00',
            horaFin: '10:00',
            color: '#20c997'
        },
        {
            id: 8,
            nombre: 'Seguridad Informática',
            codigo: 'SEG-602',
            maestro: 'Ing. Patricia Soto',
            salon: 'A-205',
            dia: 'Jueves',
            horaInicio: '10:00',
            horaFin: '12:00',
            color: '#e83e8c'
        },
        {
            id: 9,
            nombre: 'Proyecto Integrador',
            codigo: 'PRO-601',
            maestro: 'Dr. Juan Pérez',
            salon: 'LAB-2',
            dia: 'Viernes',
            horaInicio: '09:00',
            horaFin: '11:00',
            color: '#007bff'
        },
        {
            id: 10,
            nombre: 'Computación en la Nube',
            codigo: 'CLD-603',
            maestro: 'Ing. Carlos López',
            salon: 'LAB-3',
            dia: 'Viernes',
            horaInicio: '11:00',
            horaFin: '13:00',
            color: '#28a745'
        }
    ];
    
    renderVistaSemanal();
    renderVistaLista();
}

// ============================================
// RENDERIZAR VISTA SEMANAL
// ============================================
function renderVistaSemanal() {
    const tbody = document.getElementById('horarioBody');
    if (!tbody) return;
    
    const horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    
    tbody.innerHTML = horas.map(hora => {
        const horaShow = hora;
        const cells = dias.map(dia => {
            const clases = horarioData.filter(c => c.dia === dia && c.horaInicio === hora);
            if (clases.length > 0) {
                return `
                    <td>
                        ${clases.map(clase => `
                            <div class="clase-item" onclick="verDetalleClase(${clase.id})" style="background: ${clase.color}">
                                <div class="clase-nombre">${clase.nombre}</div>
                                <div class="clase-info">${clase.horaInicio} - ${clase.horaFin}</div>
                                <div class="clase-salon"><i class="fas fa-door-open"></i> ${clase.salon}</div>
                            </div>
                        `).join('')}
                    </td>
                `;
            }
            return '<td></td>';
        }).join('');
        
        return `<tr><td class="hora-col fw-bold">${horaShow}</td>${cells}</tr>`;
    }).join('');
}

// ============================================
// RENDERIZAR VISTA LISTA
// ============================================
function renderVistaLista() {
    const tbody = document.getElementById('listaClasesBody');
    if (!tbody) return;
    
    const diasOrden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horarioOrdenado = [...horarioData].sort((a, b) => {
        const diaDiff = diasOrden.indexOf(a.dia) - diasOrden.indexOf(b.dia);
        if (diaDiff !== 0) return diaDiff;
        return a.horaInicio.localeCompare(b.horaInicio);
    });
    
    tbody.innerHTML = horarioOrdenado.map(clase => `
        <tr>
            <td><strong>${clase.nombre}</strong><br><small class="text-muted">${clase.codigo}</small></td>
            <td><i class="fas fa-calendar-day"></i> ${clase.dia}</td>
            <td><i class="fas fa-clock"></i> ${clase.horaInicio} - ${clase.horaFin}</td>
            <td><i class="fas fa-door-open"></i> ${clase.salon}</td>
            <td><i class="fas fa-chalkboard-teacher"></i> ${clase.maestro}</td>
        </tr>
    `).join('');
}

// ============================================
// ACTUALIZAR RESUMEN
// ============================================
function actualizarResumen() {
    const totalHoras = horarioData.reduce((sum, clase) => {
        const inicio = clase.horaInicio.split(':');
        const fin = clase.horaFin.split(':');
        const horas = parseInt(fin[0]) - parseInt(inicio[0]);
        return sum + horas;
    }, 0);
    
    const materiasUnicas = [...new Set(horarioData.map(c => c.nombre))];
    const salonesUnicos = [...new Set(horarioData.map(c => c.salon))];
    const maestrosUnicos = [...new Set(horarioData.map(c => c.maestro))];
    
    document.getElementById('totalHoras').textContent = totalHoras;
    document.getElementById('totalMaterias').textContent = materiasUnicas.length;
    document.getElementById('totalSalones').textContent = salonesUnicos.length;
    document.getElementById('totalMaestros').textContent = maestrosUnicos.length;
}

// ============================================
// VER DETALLE DE CLASE
// ============================================
function verDetalleClase(id) {
    const clase = horarioData.find(c => c.id === id);
    if (!clase) return;
    
    const contenido = `
        <div class="text-center mb-3">
            <div style="width: 50px; height: 50px; background: ${clase.color}; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <i class="fas fa-book" style="color: white; font-size: 1.5rem;"></i>
            </div>
        </div>
        <h6 class="text-center mb-3">${clase.nombre}</h6>
        <div class="row mb-2">
            <div class="col-5"><strong>Código:</strong></div>
            <div class="col-7">${clase.codigo}</div>
        </div>
        <div class="row mb-2">
            <div class="col-5"><strong>Día:</strong></div>
            <div class="col-7">${clase.dia}</div>
        </div>
        <div class="row mb-2">
            <div class="col-5"><strong>Horario:</strong></div>
            <div class="col-7">${clase.horaInicio} - ${clase.horaFin}</div>
        </div>
        <div class="row mb-2">
            <div class="col-5"><strong>Salón:</strong></div>
            <div class="col-7">${clase.salon}</div>
        </div>
        <div class="row mb-2">
            <div class="col-5"><strong>Maestro:</strong></div>
            <div class="col-7">${clase.maestro}</div>
        </div>
        <div class="row mb-2">
            <div class="col-5"><strong>Edificio:</strong></div>
            <div class="col-7">${clase.salon.charAt(0) === 'L' ? 'Laboratorios' : 'Aulas'}</div>
        </div>
    `;
    
    document.getElementById('detalleClaseContent').innerHTML = contenido;
    const modal = new bootstrap.Modal(document.getElementById('detalleClaseModal'));
    modal.show();
}

// ============================================
// VISTA MENSUAL
// ============================================
function renderVistaMensual() {
    const year = mesActual.getFullYear();
    const month = mesActual.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    document.getElementById('mesActual').textContent = `${monthNames[month]} ${year}`;
    
    const tbody = document.getElementById('monthBody');
    let html = '';
    let dayCounter = 1;
    
    // Crear filas de la semana
    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startDayOfWeek) {
                html += '<td></td>';
            } else if (dayCounter > daysInMonth) {
                html += '<td></td>';
            } else {
                // Verificar si hay clases en este día
                const fecha = new Date(year, month, dayCounter);
                const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
                const diaSemanaMap = {
                    'lunes': 'Lunes', 'martes': 'Martes', 'miércoles': 'Miércoles',
                    'jueves': 'Jueves', 'viernes': 'Viernes', 'sábado': 'Sábado', 'domingo': 'Domingo'
                };
                const diaNombre = diaSemanaMap[diaSemana] || diaSemana;
                
                const clasesDelDia = horarioData.filter(c => c.dia === diaNombre);
                
                let eventosHtml = '';
                if (clasesDelDia.length > 0) {
                    eventosHtml = clasesDelDia.slice(0, 2).map(clase => `
                        <div class="month-event" onclick="verDetalleClase(${clase.id})">
                            ${clase.nombre.substring(0, 15)}
                        </div>
                    `).join('');
                    if (clasesDelDia.length > 2) {
                        eventosHtml += `<div class="month-event" style="background: #6c757d">+${clasesDelDia.length - 2} más</div>`;
                    }
                }
                
                html += `
                    <td>
                        <div class="month-day-number">${dayCounter}</div>
                        ${eventosHtml}
                    </td>
                `;
                dayCounter++;
            }
        }
        html += '</tr>';
        if (dayCounter > daysInMonth) break;
    }
    
    tbody.innerHTML = html;
}

function cambiarMes(delta) {
    mesActual.setMonth(mesActual.getMonth() + delta);
    renderVistaMensual();
}

// ============================================
// CAMBIAR VISTA
// ============================================
function switchView(view) {
    vistaActual = view;
    
    // Actualizar botones
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.btn-view:nth-child(${view === 'semanal' ? 1 : view === 'mensual' ? 2 : 3})`).classList.add('active');
    
    // Mostrar vista correspondiente
    document.getElementById('vistaSemanal').style.display = view === 'semanal' ? 'block' : 'none';
    document.getElementById('vistaMensual').style.display = view === 'mensual' ? 'block' : 'none';
    document.getElementById('vistaLista').style.display = view === 'lista' ? 'block' : 'none';
    
    if (view === 'mensual') {
        renderVistaMensual();
    } else if (view === 'lista') {
        renderVistaLista();
    }
}

// ============================================
// EXPORTAR A PDF
// ============================================
function exportarPDF() {
    const element = document.querySelector('.horario-container');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Horario_${userMatricula}_${userNombre}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().set(opt).from(element).save();
    showModal('Éxito', 'PDF exportado correctamente', 'success');
}

// ============================================
// IMPRIMIR HORARIO
// ============================================
function imprimirHorario() {
    window.print();
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