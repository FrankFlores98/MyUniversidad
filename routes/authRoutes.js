const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generarToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'mi-secret-key', { expiresIn: '7d' });
};

// REGISTRO
router.post('/register', async (req, res) => {
    console.log('📝 Datos recibidos:', req.body);
    
    try {
        const { nombre, email, matricula, password } = req.body;
        
        // Validar que todos los campos existan
        if (!nombre || !email || !matricula || !password) {
            console.log('❌ Faltan campos');
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        
        // Validar rol por matrícula
        const matriculaStr = matricula.toString();
        const terminacion = matriculaStr.slice(-2);
        console.log('🔍 Terminación detectada:', terminacion);
        
        const roles = {
            '23': 'alumno',
            '24': 'maestro',
            '25': 'administrativo',
            '26': 'directivo'
        };
        const rol = roles[terminacion];
        
        if (!rol) {
            console.log('❌ Rol no válido para terminación:', terminacion);
            return res.status(400).json({ error: `Matrícula inválida. Terminación "${terminacion}" no es válida. Debe terminar en 23,24,25,26` });
        }
        
        console.log('✅ Rol detectado:', rol);
        
        // Verificar si ya existe
        const existe = await User.findOne({ $or: [{ email }, { matricula }] });
        if (existe) {
            console.log('❌ Usuario ya existe');
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Crear usuario
        const user = new User({
            nombre,
            email,
            matricula,
            password: hashedPassword,
            rol,
            emailVerificado: false,
            activo: true,
            createdAt: new Date()
        });
        
        await user.save();
        console.log('✅ Usuario creado:', user._id);
        
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                matricula: user.matricula,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error('❌ Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor: ' + error.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { matricula, password } = req.body;
        
        const user = await User.findOne({ matricula });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const token = generarToken(user._id);
        
        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                matricula: user.matricula,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;