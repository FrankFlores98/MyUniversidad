const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    materiaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true },
    maestroId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    semestre: { type: Number, required: true },
    año: { type: Number, required: true },
    horario: [{
        dia: String,
        horaInicio: String,
        horaFin: String,
        salon: String
    }],
    alumnosInscritos: [{
        alumnoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        calificacion: { type: Number, default: 0 },
        estado: { type: String, enum: ['inscrito', 'aprobado', 'reprobado'], default: 'inscrito' }
    }],
    activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Curso', cursoSchema);