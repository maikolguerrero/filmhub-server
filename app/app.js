const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Importar los módulos de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());
app.use(cors());
require('dotenv').config();

const port = process.env.PORT || 3000; // Obtener el PORT desde las variables de entorno
app.set('port', port); // Establecer el puerto

// Definir las opciones para el objeto de especificación de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Filmhub',
      version: '1.0.0',
      description: 'SPA de películas usando la libreria React & Vite donde el usuario puede ver las películas existentes en la API ver sus detalles y dejar una review, en este apartado se documentan las rutas de las Peliculas, Administradores, Generos y Reseñas.',
    },
    tags: [
      { name: 'Administradores', description: 'Rutas relacionadas con los administradores' },
      { name: 'Películas', description: 'Rutas relacionadas con las películas' },
      { name: 'Géneros', description: 'Rutas relacionadas con los géneros' },
      { name: 'Reseñas', description: 'Rutas relacionadas con las reseñas' }
    ],
  },
  apis: [
    path.resolve(__dirname, '../Documentation/admin.yaml'),
    path.resolve(__dirname, '../Documentation/movies.yaml'),
    path.resolve(__dirname, '../Documentation/genres.yaml'),
    path.resolve(__dirname, '../Documentation/reviews.yaml')
  ],
};

const specs = swaggerJsdoc(options);

// Agregar la ruta para la documentación de Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas de la app
app.use('/admin', require('./routes/admins.routes'));
app.use('/genres', require('./routes/genres.routes'));
app.use('/movies', require('./routes/movies.routes'));
app.use('/reviews', require('./routes/reviews.routes'));

// Definir la ruta para mostrar las imágenes
app.use('/images', express.static(path.join(__dirname, '../static/images')));

// Middleware para manejar rutas no encontradas y devolver error 404
app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'La ruta que buscas no existe.' });
});

module.exports = app; // Exportamos la constante app