const router = require('express').Router();

// Importar el controlador de administradores
const adminsController = require('../controllers/admins.controller');

const { verifyToken } = require('../auth/auth'); // Importar el tokenManager y el middleware de verificación de token

// Ruta para acceder al panel de administración
router.get('/panel', verifyToken, (req, res) => {
  return res.status(200).json({ status: 200, message: 'Acceso permitido.' })
});

router.post('/registro', adminsController.add); // Ruta para crear un nuevo administrador
router.post('/login', adminsController.login); // Ruta para iniciar sesión
router.post('/logout', verifyToken, adminsController.logout); // Ruta para cerrar sesión
router.get('/', verifyToken, adminsController.getAll); // Ruta para obtener todos los administradores
router.get('/:id', verifyToken, adminsController.getById); // Ruta para obtener un administrador por su ID
router.put('/password', adminsController.updatePassword); // Ruta para actualizar un administrador por su username
router.put('/permissions/:id', verifyToken, adminsController.updatePermissionsById); // Ruta para actualizar un administrador por su ID
router.delete('/:id', verifyToken, adminsController.deleteById); // Ruta para eliminar un administrador por su ID

module.exports = router;