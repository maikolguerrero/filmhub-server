const app = require('./app'); // Importamos app
require('dotenv').config(); // Para acceder a las variables de entorno
require('../config/connection');

// Levantar el servidor
async function startServer() {
  app.listen(app.get('port'), (err) => {
    if (err) {
      console.log(`Hubo un error : ${err}`)
    } else {
      console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
    }
  }
  );
};

module.exports = startServer;