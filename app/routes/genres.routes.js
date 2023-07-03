const router = require('express').Router();
const genresController = require('../controllers/genres.contoller');

router.post('/', genresController.add); // Ruta para crear un nuevo género
router.get('/', genresController.getAll); // Ruta para obtener todos los géneros
router.get('/:id', genresController.getById); // Ruta para obtener un género por su ID
router.put('/:id', genresController.updateById); // Ruta para editar un género por su ID
router.delete('/:id', genresController.deleteById); // Ruta para eliminar un género por su ID

module.exports = router;