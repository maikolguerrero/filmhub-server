const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());
require('dotenv').config();

const port = process.env.PORT || 3000; //Obtener el PORT desde las variables de entorno
app.set('port', port); // Establecer el puerto

// Rutas de la app
app.use('/admin', require('./routes/admins.routes'));

// Definir la ruta para mostrar las imágenes
app.use('/images', express.static(path.join(__dirname, '../static/images')));

// Middleware para manejar rutas no encontradas y devolver error 404
app.use((req, res) => {
    res.status(404).json({ status: 404, message: "La ruta que buscas no existe." });
});

module.exports = app; // Exportamos la constante app 