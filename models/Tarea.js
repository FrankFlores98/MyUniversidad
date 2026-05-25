const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: String,
    cursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    fechaEntrega: { type: Date, required: true },
    peso: { type: Number, default: 10, min: 0, max: 100 },
    entregas: [{
        alumnoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        archivoUrl: String,
        comentario: String,
        fechaEntrega: { type: Date, default: Date.now },
        calificacion: { type: Number, default: null },
        retroalimentacion: String
    }],
    activa: { type: Boolean, default: true }
});

module.exports = mongoose.model('Tarea', tareaSchema);