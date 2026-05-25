const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matricula: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['alumno', 'maestro', 'administrativo', 'directivo'], required: true },
    emailVerificado: { type: Boolean, default: false },
    activo: { type: Boolean, default: true },
    ultimoAcceso: Date,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);