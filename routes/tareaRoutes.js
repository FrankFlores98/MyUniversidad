const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find().populate('cursoId');
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener tareas por curso
router.get('/curso/:cursoId', async (req, res) => {
    try {
        const tareas = await Tarea.find({ cursoId: req.params.cursoId });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear tarea
router.post('/', async (req, res) => {
    try {
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(201).json(tarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Entregar tarea
router.post('/:id/entregar', async (req, res) => {
    try {
        const { alumnoId, archivoUrl, comentario } = req.body;
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
        
        tarea.entregas.push({ alumnoId, archivoUrl, comentario });
        await tarea.save();
        res.json(tarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Calificar entrega
router.put('/:id/calificar/:entregaIndex', async (req, res) => {
    try {
        const { calificacion, retroalimentacion } = req.body;
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
        
        tarea.entregas[req.params.entregaIndex].calificacion = calificacion;
        tarea.entregas[req.params.entregaIndex].retroalimentacion = retroalimentacion;
        await tarea.save();
        res.json(tarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;