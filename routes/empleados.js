const express = require('express');
const db = require('../config/database');

const empleados = express.Router();

empleados.get('/', async (req, res, next) => {
    try {
        const { nombre } = req.query;
        let rows;

        if (nombre) {
            rows = await db.query(
                'SELECT * FROM empleados WHERE nombre LIKE ?',
                [`%${nombre}%`]
            );
        } else {
            rows = await db.query('SELECT * FROM empleados');
        }

        return res.status(200).send(rows);
    } catch (err) {
        next(err);
    }
});

empleados.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) {
            return res.status(400).send({ error: 'Id inválido' });
        }

        const rows = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);
        return rows.length > 0
            ? res.status(200).send(rows[0])
            : res.status(404).send({ error: 'Empleado no encontrado' });
    } catch (err) {
        next(err);
    }
});

empleados.post('/', async (req, res, next) => {
    try {
        const { nombre, apellidos, telefono, correo, direccion } = req.body || {};

        if (!nombre || !apellidos) {
            return res.status(400).send({ error: 'Nombre y apellidos son obligatorios' });
        }

        const result = await db.query(
            'INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellidos, telefono, correo, direccion]
        );

        return res.status(201).send({ message: 'Empleado agregado', id: result.insertId });
    } catch (err) {
        next(err);
    }
});

empleados.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) {
            return res.status(400).send({ error: 'Id inválido' });
        }

        const { nombre, apellidos, telefono, correo, direccion } = req.body || {};

        if (!nombre || !apellidos) {
            return res.status(400).send({ error: 'Nombre y apellidos son obligatorios' });
        }

        const result = await db.query(
            'UPDATE empleados SET nombre = ?, apellidos = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?',
            [nombre, apellidos, telefono, correo, direccion, id]
        );

        return result.affectedRows > 0
            ? res.status(200).send({ message: 'Empleado actualizado' })
            : res.status(404).send({ error: 'Empleado no encontrado' });
    } catch (err) {
        next(err);
    }
});

empleados.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) {
            return res.status(400).send({ error: 'Id inválido' });
        }

        const result = await db.query('DELETE FROM empleados WHERE id = ?', [id]);

        return result.affectedRows > 0
            ? res.status(200).send({ message: 'Empleado eliminado' })
            : res.status(404).send({ error: 'Empleado no encontrado' });
    } catch (err) {
        next(err);
    }
});

module.exports = empleados;