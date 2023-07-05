const router = require('express').Router();
//Importamos las funciones del controlador
const moviesController = require('../controllers/movies.controller');
// Importamos la configuración del middleware de multer para subir archivos
const { upload } = require('../../config/multer');
const { verifyToken } = require('../auth/auth'); // Importar el middleware de verificación de token

router.post('/', upload.single('image'), verifyToken, moviesController.add); // Ruta para añadir una peli
router.get('/', moviesController.getAll); // Ruta para traer todas las peliculas
router.get('/:id', moviesController.getById); // Ruta para filtrar una peli por su id
router.get('/title/:title', moviesController.getByTitle); // Ruta para filtrar una peli por su titulo
router.get('/genre/:genre', moviesController.getByGenre); // Ruta para filtrar una peli por su genero
router.get('/franchise/:franchise', moviesController.getByFranchise); // Ruta para filtrar una peli por su Franquisia
router.get('/synopsis/:synopsis', moviesController.getBySynopsis); // Ruta para filtrar una peli por su Sinopsis
router.get('/actors/:actors', moviesController.getByActors); // Ruta para filtrar una peli por sus Actores
router.get('/directors/:directors', moviesController.getByDirectors); // Ruta para filtrar una peli por sus Directores
router.get('/title/all/:title', moviesController.getByTitleAll); // Ruta para filtrar una peli por su titulo sin importar q tanto se ponga del mismo
router.put('/:id', upload.single('image'), verifyToken, moviesController.updateById); // Ruta para editar una peli por su id
router.delete('/:id', verifyToken, moviesController.deleteById); // Ruta para eliminar una peli por su id
router.post('/search', moviesController.getBySearch); // Ruta para filtrar una peli por cualquier calor de busqueda

module.exports = router;