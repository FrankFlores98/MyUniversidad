const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

// Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find().populate('materiaId').populate('maestroId');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id).populate('materiaId').populate('maestroId');
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
        res.json(curso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear curso
router.post('/', async (req, res) => {
    try {
        const curso = new Curso(req.body);
        await curso.save();
        res.status(201).json(curso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar curso
router.put('/:id', async (req, res) => {
    try {
        const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
        res.json(curso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar curso
router.delete('/:id', async (req, res) => {
    try {
        const curso = await Curso.findByIdAndDelete(req.params.id);
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
        res.json({ message: 'Curso eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;