const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({
    alumnoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    parcial1: { type: Number, default: 0 },
    parcial2: { type: Number, default: 0 },
    parcial3: { type: Number, default: 0 },
    final: { type: Number, default: 0 }
});

module.exports = mongoose.model('Calificacion', calificacionSchema);