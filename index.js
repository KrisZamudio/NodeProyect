require('dotenv').config();
const express = require('express');
const app = express();

const login = require('./routes/login');
const empleados = require('./routes/empleados');
const auth = require('./middleware/auth');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('API de empleados funcionando');
});

app.use('/login', login);              
app.use('/empleados', auth, empleados); 

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});