const express = require('express');
const router = express.Router();
const Materia = require('../models/Materia');

// Obtener todas las materias
router.get('/', async (req, res) => {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una materia
router.post('/', async (req, res) => {
    try {
        const materia = new Materia(req.body);
        await materia.save();
        res.status(201).json(materia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar materia
router.put('/:id', async (req, res) => {
    try {
        const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
        res.json(materia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar materia
router.delete('/:id', async (req, res) => {
    try {
        const materia = await Materia.findByIdAndDelete(req.params.id);
        if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
        res.json({ message: 'Materia eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;