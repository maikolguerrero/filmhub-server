const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Obtener la clave secreta desde una variable de entorno
const adminsModel = require('../models/admins.model');
const tokensModel = require('../models/tokens.model');

const cronJob = require('node-cron');

class Token {
  // Generar un nuevo token
  generateToken(admin) {
    const payload = {
      sub: admin.id,
      username: admin.username,
      role: admin.role,
      permissions: admin.permissions
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  // Verificar un token
  async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ status: 401, message: 'No se proporcionó un token de autenticación' });

      // Verificar y decodificar el token
      const payload = jwt.verify(token, secret);

      // Verificar si el token está almacenado en la base de datos de tokens válidos
      const tokenValido = await tokensModel.getToken(token);
      if (!tokenValido) return res.status(401).json({ status: 401, message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.' });

      // Verificar si el administrador existe y está activo
      const admin = await adminsModel.getByUsername(payload.username);
      if (!admin) return res.status(401).json({ status: 401, message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.' });

      req.admin = payload;
      next();
    } catch (error) {
      // Capturar y manejar los errores de verificación del token
      if (error.name === 'TokenExpiredError') return res.status(401).json({ status: 401, message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.' });
      if (error.name === 'JsonWebTokenError') return res.status(401).json({ status: 401, message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.' });
      return res.status(500).json({ status: 500, message: 'Error en el servidor.' });
    }
  }

  // Eliminar Tokens Expirados
  async deleteExpired() {
    try {
      // Obtener todos los tokens almacenados en la base de datos
      const tokens = await tokensModel.getAllTokens();

      // Obtener la fecha actual
      const currentDate = new Date();

      // Recorrer cada token y verificar si ha expirado
      for (const token of tokens) {
        const decodedToken = jwt.decode(token.token);

        if (decodedToken && decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000); // Convertir la fecha de expiración a milisegundos

          // Comparar la fecha de expiración con la fecha actual
          if (expirationDate <= currentDate) {
            // Eliminar el token expirado de la base de datos
            await tokensModel.delete(token.token);
          }
        }
      }
    } catch (error) {
      console.log('Error al eliminar tokens expirados:', error);
      throw error;
    }
  }
}

const tokenManager = new Token();

// Cron job para que se ejecute cada día a las 00:00
cronJob.schedule('0 0 * * *', () => {
  tokenManager.deleteExpired();
});

module.exports = tokenManager;