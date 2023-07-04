const router = require('express').Router();
const moviesController = require('../controllers/movies.controller');
// Importamos la configuración del middleware de multer para subir archivos
const { upload } = require('../../config/multer');

router.post('/', upload.single('image'), moviesController.add);
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getById);
router.get('/title/:title', moviesController.getByTitle);
router.get('/franchise/:franchise', moviesController.getByFranchise);
router.get('/synopsis/:synopsis', moviesController.getBySynopsis);
router.put('/:id', upload.single('image'), moviesController.updateById);
router.delete('/:id', moviesController.deleteById);

module.exports = router;