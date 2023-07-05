const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class ReviewsModel {
  // Crear un nuevo review
  async add(name, rating, comment) {
    try {
      const sql = 'INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)';
      const values = [name, rating, comment];
      const response = await query(sql, values);
      const newReviewId = response.insertId;
      return newReviewId;
    } catch (error) {
      console.log('Hubo un error al crear el review:', error);
      throw error;
    }
  }

  // Conectar un review con una película
  async addMovieReview(movieId, reviewId) {
    try {
      const sql = 'INSERT INTO movies_reviews (movie_id, review_id) VALUES (?, ?)';
      const values = [movieId, reviewId];
      const response = await query(sql, values);
      const newConnectionId = response.insertId;
      return newConnectionId;
    } catch (error) {
      console.log(`Hubo un error al conectar el review ${reviewId} con la película ${movieId}:`, error);
      throw error;
    }
  }

  // Obtener todos los reviews
  async getAll() {
    try {
      const sql = 'SELECT * FROM reviews';
      const reviews = await query(sql);
      return reviews;
    } catch (error) {
      console.log('Hubo un error al obtener los reviews:', error);
      throw error;
    }
  }

  // Obtener un review por ID
  async getById(id) {
    try {
      const sql = 'SELECT * FROM reviews WHERE id = ?';
      const values = [id];
      const [review] = await query(sql, values);
      return review;
    } catch (error) {
      console.log(`Hubo un error al obtener el review con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener la asociacion del id de la pelicula y el  review
  async getMovieIdByReviewId(reviewId) {
    try {
      const sql = 'SELECT movie_id FROM movies_reviews WHERE review_id = ?';
      const values = [reviewId];
      const [result] = await query(sql, values);
      return result.movie_id;
    } catch (error) {
      console.log(`Hubo un error al obtener el ID de la película asociada con el review con ID ${reviewId}:`, error);
      throw error;
    }
  }

  // Editar un review por ID
  async updateById(id, name, rating, comment) {
    try {
      const sql = 'UPDATE reviews SET name = ?, rating = ?, comment = ? WHERE id = ?';
      const values = [name, rating, comment, id];
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al actualizar el review con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un review por ID
  async deleteById(id) {
    try {
      const sql = 'DELETE FROM reviews WHERE id = ?';
      const values = [id];
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al eliminar el review con ID ${id}:`, error);
      throw error;
    }
  }
}

const reviewsModel = new ReviewsModel();
module.exports = reviewsModel;