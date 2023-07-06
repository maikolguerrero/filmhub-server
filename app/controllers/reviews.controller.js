const reviewsModel = require('../models/reviews.model');
const moviesModel = require('../models/movies.model');

class ReviewsController {
  // Crear un nuevo review y conectarlo con una película
  async add(req, res) {
    try {
      const { name, rating, comment, movieId } = req.body;

      // Validar que el rating esté entre 0 y 5
      if (rating < 0 || rating > 5) {
        return res.status(400).json({ status: 400, message: 'El rating debe estar entre 0 y 5.' });
      }

      // Verificar si la película existe
      const existingMovie = await moviesModel.getById(movieId);
      if (!existingMovie) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Crear el nuevo review
      const newReviewId = await reviewsModel.add(name, rating, comment);

      // Conectar el review con la película
      await reviewsModel.addMovieReview(movieId, newReviewId);

      // Actualizar el rating promedio de la película
      await moviesModel.updateMovieRating(movieId);

      res.status(201).json({ status: 201, message: 'Review creado y conectado exitosamente.', data: { id: newReviewId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al crear y conectar el review: ${error.message}` });
    }
  }



  // Obtener todos los reviews
  async getAll(req, res) {
    try {
      const reviews = await reviewsModel.getAll();
      res.status(200).json({ status: 200, message: 'Reviews obtenidos correctamente.', data: { reviews } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener los reviews: ${error.message}` });
    }
  }

  // Obtener un review por ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const review = await reviewsModel.getById(id);
      if (!review) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      res.status(200).json({ status: 200, message: 'Review encontrado.', data: { review } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el review: ${error.message}` });
    }
  }

  // Editar un review por ID
  async updateById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.edit) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })

      const id = req.params.id;
      const { name, rating, comment } = req.body;

      // Verificar si el review existe
      const existingReview = await reviewsModel.getById(id);
      if (!existingReview) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      // Actualizar el review
      const affectedRows = await reviewsModel.updateById(id, name, rating, comment);

      // Obtener el ID de la película asociada con el review
      const movieId = await reviewsModel.getMovieIdByReviewId(id);

      // Actualizar el rating promedio de la película
      await moviesModel.updateMovieRating(movieId);

      if (affectedRows > 0) return res.status(200).json({ status: 200, message: 'Review actualizado exitosamente.' });

      res.status(500).json({ status: 500, message: 'Error al actualizar el review.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el review: ${error.message}` });
    }
  }

  // Eliminar un review por ID
  async deleteById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.delete) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })

      const id = req.params.id;

      // Verificar si el review existe
      const existingReview = await reviewsModel.getById(id);
      if (!existingReview) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      // Obtener el ID de la película asociada con el review
      const movieId = await reviewsModel.getMovieIdByReviewId(id);

      // Eliminar el review
      const affectedRows = await reviewsModel.deleteById(id);
      if (affectedRows === 0) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      // Actualizar el rating promedio de la película
      await moviesModel.updateMovieRating(movieId);

      res.status(200).json({ status: 200, message: 'Review eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el review: ${error.message}` });
    }
  }
}

const reviewsController = new ReviewsController();
module.exports = reviewsController;
