// corregir-js.js
const fs = require('fs');
const path = require('path');

// Lista de todos tus archivos JS
const archivos = [
    'perfil.js',
    'materias.js',
    'tareas.js',
    'calificaciones.js',
    'kardex.js',
    'horario.js',
    'cursos.js',
    'alumnos.js',
    'gestion-tareas.js',
    'estadisticas.js',
    'admin-usuarios.js',
    'admin-materias.js',
    'admin-total.js',
    'estadisticas-globales.js',
    'reportes.js',
    'dashboard.js'
];

console.log('🔧 Corrigiendo rutas en archivos JS...\n');

let contador = 0;

archivos.forEach(nombreArchivo => {
    const ruta = path.join(__dirname, nombreArchivo);
    
    if (!fs.existsSync(ruta)) {
        console.log(`❌ No encontrado: ${nombreArchivo}`);
        return;
    }
    
    let contenido = fs.readFileSync(ruta, 'utf8');
    let modificado = false;
    
    // Corregir '../dashboard.html' a 'dashboard.html'
    if (contenido.includes('../dashboard.html')) {
        contenido = contenido.replace(/'\.\.\/dashboard\.html'/g, "'dashboard.html'");
        contenido = contenido.replace(/"\.\.\/dashboard\.html"/g, '"dashboard.html"');
        modificado = true;
        console.log(`  ✅ Corregido goBackToDashboard en ${nombreArchivo}`);
    }
    
    // Corregir '../index.html' a 'login.html' si es necesario
    if (contenido.includes('../index.html')) {
        contenido = contenido.replace(/'\.\.\/index\.html'/g, "'login.html'");
        contenido = contenido.replace(/"\.\.\/index\.html"/g, '"login.html"');
        modificado = true;
        console.log(`  ✅ Corregido redirección a login en ${nombreArchivo}`);
    }
    
    if (modificado) {
        fs.writeFileSync(ruta, contenido);
        console.log(`✅ Guardado: ${nombreArchivo}`);
        contador++;
    } else {
        console.log(`⏭️ Sin cambios: ${nombreArchivo}`);
    }
});

console.log(`\n✨ ¡Proceso completado! ${contador} archivos modificados.`);