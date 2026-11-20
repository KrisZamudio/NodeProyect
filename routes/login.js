const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const login = express.Router();

login.post('/', async (req, res, next) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).send({ error: 'Usuario y contraseña son obligatorios' });
        }

        const rows = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        if (rows.length === 0) {
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }

        const user = rows[0];
        const coincide = await bcrypt.compare(password, user.password);

        if (!coincide) {
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: user.id, usuario: user.usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).send({ message: 'Login correcto', token });
    } catch (err) {
        next(err);
    }
});

module.exports = login;