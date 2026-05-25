const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// MIDDLEWARES
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// IMPORTAR RUTAS
// ============================================
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const anuncioRoutes = require('./routes/anuncioRoutes');

// ============================================
// USAR RUTAS
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/anuncios', anuncioRoutes);

// ============================================
// RUTA DE PRUEBA
// ============================================
app.get('/api/test', (req, res) => {
    res.json({ message: '✅ API funcionando correctamente' });
});

// ============================================
// CONEXIÓN A MONGODB (LOCAL O ATLAS)
// ============================================
// Para MongoDB Local (descomenta esta y comenta la de Atlas)
const MONGODB_URI = 'mongodb://localhost:27017/mi-universidad';

// Para MongoDB Atlas (descomenta esta y comenta la de Local)
// const MONGODB_URI = 'mongodb+srv://Fernando:Fernando23@myuniversidad.agjhctk.mongodb.net/mi-universidad?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err.message));

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en:`);
    console.log(`   - GET  /api/test`);
    console.log(`   - POST /api/auth/register`);
    console.log(`   - POST /api/auth/login`);
    console.log(`   - GET  /api/users`);
    console.log(`   - GET  /api/materias`);
    console.log(`   - POST /api/materias`);
    console.log(`   - GET  /api/anuncios`);
    console.log(`   - POST /api/anuncios`);
});