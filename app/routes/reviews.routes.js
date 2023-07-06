const router = require('express').Router();
const reviewsController = require('../controllers/reviews.controller');
const { verifyToken } = require('../auth/auth'); // Importar el middleware de verificación de token

router.post('/', reviewsController.add); // Ruta para crear un nuevo review
router.get('/', reviewsController.getAll); // Ruta para obtener todos los reviews
router.get('/:id', reviewsController.getById); // Ruta para obtener un review por su ID
router.put('/:id', verifyToken, reviewsController.updateById); // Ruta para editar un review por su ID
router.delete('/:id', verifyToken, reviewsController.deleteById); // Ruta para eliminar un review por su ID

module.exports = router;