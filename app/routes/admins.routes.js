const router = require('express').Router();

// Importar el controlador de administradores
const adminsController = require('../controllers/admins.controller');

const { verifyToken } = require('../auth/auth'); // Importar el tokenManager y el middleware de verificación de token

router.post('/registro', adminsController.add); // Ruta para crear un nuevo administrador
router.post('/login', adminsController.login); // Ruta para iniciar sesión
router.post('/logout', verifyToken, adminsController.logout); // Ruta para cerrar sesión

// Ruta para acceder al panel de administración
router.get('/panel', verifyToken, (req, res) => {
  return res.status(200).json({ status: 200, message: 'Acceso permitido.' })
});

module.exports = router;