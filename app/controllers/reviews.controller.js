const reviewsModel = require('../models/reviews.model');

class ReviewsController {
  // Crear un nuevo review
  async add(req, res) {
    const { name, rating, comment } = req.body;

    try {
      // Crear el nuevo review
      const newReviewId = await reviewsModel.add(name, rating, comment);

      res.status(201).json({ status: 201, message: 'Review creado exitosamente.', data: { id: newReviewId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al crear el review: ${error.message}` });
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
      const id = req.params.id;
      const { name, rating, comment } = req.body;

      // Verificar si el review existe
      const existingReview = await reviewsModel.getById(id);
      if (!existingReview) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      // Actualizar el review
      const affectedRows = await reviewsModel.updateById(id, name, rating, comment);

      if (affectedRows > 0) return res.status(200).json({ status: 200, message: 'Review actualizado exitosamente.' });

      res.status(500).json({ status: 500, message: 'Error al actualizar el review.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el review: ${error.message}` });
    }
  }

  // Eliminar un review por ID
  async deleteById(req, res) {
    try {
      const id = req.params.id;

      // Verificar si el review existe
      const existingReview = await reviewsModel.getById(id);
      if (!existingReview) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      // Eliminar el review
      const affectedRows = await reviewsModel.deleteById(id);
      if (affectedRows === 0) return res.status(404).json({ status: 404, message: 'Review no encontrado.' });

      res.status(200).json({ status: 200, message: 'Review eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el review: ${error.message}` });
    }
  }
}

const reviewsController = new ReviewsController();
module.exports = reviewsController;
