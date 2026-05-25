const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    creditos: { type: Number, required: true, min: 1, max: 12 },
    semestre: { type: Number, required: true, min: 1, max: 12 },
    carrera: { type: String, required: true },
    tipo: { type: String, enum: ['Obligatoria', 'Optativa', 'Laboratorio', 'Taller'], required: true },
    descripcion: { type: String, default: '' },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Materia', materiaSchema);