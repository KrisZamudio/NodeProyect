require('dotenv').config();
const express = require('express');
const app = express();

const login = require('./routes/login');
const empleados = require('./routes/empleados');
const auth = require('./middleware/auth');

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('API de empleados funcionando');
});

app.use('/login', login);              
app.use('/empleados', auth, empleados); 

app.use((req, res) => {
    res.status(404).send({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: 'Error interno del servidor' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});