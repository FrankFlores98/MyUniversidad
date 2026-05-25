const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    mensaje: { type: String, required: true },
    autor: { type: String, required: true },
    autorRol: { type: String, required: true },
    dirigidoA: { type: String, enum: ['todos', 'alumnos', 'maestros'], default: 'todos' },
    destacado: { type: Boolean, default: false },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anuncio', anuncioSchema);