const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

// Obtener todos los anuncios
router.get('/', async (req, res) => {
    try {
        const anuncios = await Anuncio.find().sort({ fecha: -1 });
        res.json(anuncios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear anuncio
router.post('/', async (req, res) => {
    try {
        const anuncio = new Anuncio(req.body);
        await anuncio.save();
        res.status(201).json(anuncio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar anuncio
router.delete('/:id', async (req, res) => {
    try {
        const anuncio = await Anuncio.findByIdAndDelete(req.params.id);
        if (!anuncio) return res.status(404).json({ error: 'Anuncio no encontrado' });
        res.json({ message: 'Anuncio eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;