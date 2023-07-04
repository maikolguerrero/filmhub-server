const query = require('../../config/query');

class MoviesModel {
  // Crear una nueva película
  async add({ title, image, synopsis, release_date, actors, directors, franchise, rating = 0 }) {
    const sql = 'INSERT INTO movies (title, image, synopsis, release_date, actors, directors, franchise, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [title, image, synopsis, release_date, actors, directors, franchise, rating];
    try {
      const response = await query(sql, values);
      const newMovieId = response.insertId;
      return newMovieId;
    } catch (error) {
      console.log('Hubo un error al crear la película:', error);
      throw error;
    }
  }

  // Obtener todas las películas
  async getAll() {
    const sql = 'SELECT * FROM movies';
    try {
      const movies = await query(sql);
      return movies;
    } catch (error) {
      console.log('Hubo un error al obtener las películas:', error);
      throw error;
    }
  }

  // Obtener una película por ID
  async getById(id) {
    const sql = 'SELECT * FROM movies WHERE id = ?';
    const values = [id];
    try {
      const [movie] = await query(sql, values);
      return movie;
    } catch (error) {
      console.log(`Hubo un error al obtener la película con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener una película por título
  async getByTitle(title) {
    const sql = 'SELECT * FROM movies WHERE title = ?';
    const values = [title];
    try {
      const [movie] = await query(sql, values);
      return movie;
    } catch (error) {
      console.log(`Hubo un error al obtener la película con título ${title}:`, error);
      throw error;
    }
  }

  // Obtener una película por su título (sin importar q tanto se coloque del mismo)
async getByTitleAll(title) {
  const sql = 'SELECT * FROM movies WHERE title LIKE ?';
  const values = [`%${title}%`];
  try {
    const movies = await query(sql, values);
    return movies;
  } catch (error) {
    console.log(`Hubo un error al obtener la película con título ${title}:`, error);
    throw error;
  }
}

  // Obtener una película por su franquicia
  async getByFranchise(franchise) {
    const sql = 'SELECT * FROM movies WHERE franchise LIKE ?';
    const values = [`%${franchise}%`];
    try {
      const movies = await query(sql, values);
      return movies;
    } catch (error) {
      console.log(`Hubo un error al obtener la película con franquicia ${franchise}:`, error);
      throw error;
    }
  }

  // Obtener una película por sus actores
  async getByActors(actors) {
    const sql = 'SELECT * FROM movies WHERE actors LIKE ?';
    const values = actors.map(actor => `%${actor}%`);
    try {
      const movies = await Promise.all(values.map(value => query(sql, [value])));
      return movies.flat();
    } catch (error) {
      console.log(`Hubo un error al obtener la película con actores ${actors}:`, error);
      throw error;
    }
  }

  // Obtener una película por sus directores
  async getByDirectors(directors) {
    const sql = 'SELECT * FROM movies WHERE directors LIKE ?';
    const values = directors.map(director => `%${director}%`);
    try {
      const movies = await Promise.all(values.map(value => query(sql, [value])));
      return movies.flat();
    } catch (error) {
      console.log(`Hubo un error al obtener la película con directores ${directors}:`, error);
      throw error;
    }
  }

  // Obtener una película por su sinopsis
  async getBySynopsis(synopsis) {
    const sql = 'SELECT * FROM movies WHERE synopsis LIKE ?';
    const values = [`%${synopsis}%`];
    try {
      const movies = await query(sql, values);
      return movies;
    } catch (error) {
      console.log(`Hubo un error al obtener la película con sinopsis ${synopsis}:`, error);
      throw error;
    }
  }

  // Actualizar una película por ID
  async updateById(id, { title, image, synopsis, release_date, actors, directors, franchise, rating }) {
    const sql = 'UPDATE movies SET title = ?, image = ?, synopsis = ?, release_date = ?, actors = ?, directors = ?, franchise = ?, rating = ? WHERE id = ?';
    const values = [title, image, synopsis, release_date, actors, directors, franchise, rating, id];
    try {
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al actualizar la película con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar una película por ID
  async deleteById(id) {
    const sql = 'DELETE FROM movies WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al eliminar la película con ID ${id}:`, error);
      throw error;
    }
  }

  // Agregar la relación entre una película y un género en la tabla movies_genres
  async addMovieGenre(movieId, genreId) {
    try {
      const sql = 'INSERT INTO movies_genres (movie_id, genre_id) VALUES (?, ?)';
      await query(sql, [movieId, genreId]);
    } catch (error) {
      throw new Error(`Error al agregar la relación película-género: ${error.message}`);
    }
  }

  // Obtener el género de una película por su ID
  async getGenreByMovieId(movieId) {
    try {
      const sql = 'SELECT genres.* FROM genres INNER JOIN movies_genres ON genres.id = movies_genres.genre_id WHERE movies_genres.movie_id = ?';
      const [genre] = await query(sql, [movieId]);
      return genre;
    } catch (error) {
      throw new Error(`Error al obtener el género de la película: ${error.message}`);
    }
  }

  // Actualizar la relación entre una película y un género en la tabla movies_genres
  async updateMovieGenre(movieId, genreId) {
    try {
      const sql = 'UPDATE movies_genres SET genre_id = ? WHERE movie_id = ?';
      await query(sql, [genreId, movieId]);
    } catch (error) {
      throw new Error(`Error al actualizar la relación película-género: ${error.message}`);
    }
  }

  // Eliminar una relación entre una película y un género en la tabla movies_genres
  async deleteMovieGenre(movieId) {
    try {
      const sql = 'DELETE FROM movies_genres WHERE movie_id = ?';
      await query(sql, [movieId]);
    } catch (error) {
      throw new Error(`Error al eliminar la relación película-género: ${error.message}`);
    }
  }
}

const moviesModel = new MoviesModel();
module.exports = moviesModel;