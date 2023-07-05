const moviesModel = require('../models/movies.model');
const genresModel = require('../models/genres.model');
const path = require('path');
const { deleteImage } = require('../../config/multer');

// Convertir actores y directores en arreglos de una película
const moviesWithAndActorsDirectorsOneMovie = (movie, name) => {
  const actorsArray = movie.actors.split(',').map(actor => actor.trim());
  const directorsArray = movie.directors.split(',').map(director => director.trim());
  return { ...movie, actors: actorsArray, directors: directorsArray, genre: name };
};

// Convertir actores y directores en arreglos de varias películas
function convertArrayActorsAndDirectors(movies) {
  const moviesWithAndActorsDirectors = movies.map((movie) => {
    const actorsArray = movie.actors.split(',');
    const directorsArray = movie.directors.split(',');
    return { ...movie, actors: actorsArray, directors: directorsArray };
  });
  return moviesWithAndActorsDirectors;
}

class MoviesController {
  // Crear una nueva película
  async add(req, res) {
    try {
      const { genre, title, synopsis, release_date, actors, directors, franchise, rating } = req.body;

      // Obtener la ruta de la imagen
      const imagePath = req.file.path;
      // Obtener el nombre de la imagen
      const image = path.basename(imagePath);

      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.create) {
        deleteImage(imagePath);
        return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })
      };

      // Verificar si el género existe
      const existingGenre = await genresModel.getById(genre);
      if (!existingGenre) {
        deleteImage(imagePath);
        return res.status(404).json({ status: 404, message: 'Género no encontrado.' })
      };

      // Crear la nueva película
      const newMovie = { title, image, synopsis, release_date, actors, directors, franchise, rating };
      const newMovieId = await moviesModel.add(newMovie);

      // Guardar la relación entre la película y el género en la tabla movies_genres
      await moviesModel.addMovieGenre(newMovieId, genre);

      res.status(201).json({ status: 201, message: 'Película creada exitosamente.', data: { id: newMovieId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al crear la película: ${error.message}` });
    }
  }

  // Obtener todas las películas
  async getAll(req, res) {
    try {
      //Obtener película y su género correspondiente
      const movies = await moviesModel.getAll();
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      res.status(200).json({ status: 200, message: 'Películas obtenidas correctamente.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por su ID
  async getById(req, res) {
    try {
      const id = req.params.id;

      // Verificar que exista la película
      const movie = await moviesModel.getById(id);
      if (!movie) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Buscar el género de la película
      const { name } = await moviesModel.getGenreByMovieId(movie.id);

      res.status(200).json({ status: 200, message: 'Película encontrada.', data: { movie: moviesWithAndActorsDirectorsOneMovie(movie, name) } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener la película: ${error.message}` });
    }
  }

  // Obtener una película por su título
  async getByTitle(req, res) {
    try {
      const title = req.params.title;

      // Verificar que exista la película
      const movie = await moviesModel.getByTitle(title);
      if (!movie) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Buscar el género de la película
      const { name } = await moviesModel.getGenreByMovieId(movie.id);

      res.status(200).json({ status: 200, message: 'Película encontrada.', data: { movie: moviesWithAndActorsDirectorsOneMovie(movie, name) } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener la película: ${error.message}` });
    }
  }

  // Obtener una película por su título (sin importar que tanto se coloque del mismo)
  async getByTitleAll(req, res) {
    try {
      const title = req.params.title;

      // Verificar que exista la película
      const movies = await moviesModel.getByTitleAll(title);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Titulo no encontrado.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas por Titulo.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por su género
  async getByGenre(req, res) {
    try {
      const genre = req.params.genre;

      // Verificar que exista la película
      const movies = await moviesModel.getByGenre(genre);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por su franquicia
  async getByFranchise(req, res) {
    try {
      const franchise = req.params.franchise;

      // Verificar que exista la película
      const movies = await moviesModel.getByFranchise(franchise);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Franquicia no encontrada.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas con Franquicia.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por su sinopsis
  async getBySynopsis(req, res) {
    try {
      const synopsis = req.params.synopsis;

      // Verificar que exista la película
      const movies = await moviesModel.getBySynopsis(synopsis);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Sinopsis no encontrada.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas con la Sinopsis.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por sus actores
  async getByActors(req, res) {
    try {
      const actors = req.params.actors.split(',');

      // Verificar que exista la película
      const movies = await moviesModel.getByActors(actors);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Actor no encontrado.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas con el Actor.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por sus directores
  async getByDirectors(req, res) {
    try {
      const directors = req.params.directors.split(',');

      // Verificar que exista la película
      const movies = await moviesModel.getByDirectors(directors);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Director no encontrado.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Convertir actores y directores en arreglos
      const moviesWithGenreAndActorsDirectors = convertArrayActorsAndDirectors(moviesWithGenre);

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas con el Director.', data: { movies: moviesWithGenreAndActorsDirectors } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Obtener una película por cuqlquier tipo de búsqueda
  async getBySearch(req, res) {
    try {
      const data = req.body;

      // Verificar que exista la película
      const movies = await moviesModel.getBySearch(data);
      if (!movies.length) return res.status(404).json({ status: 404, message: 'Películas no encontradas.' });

      // Buscar el género de las películas
      const moviesWithGenre = await Promise.all(movies.map(async (movie) => {
        const { name } = await moviesModel.getGenreByMovieId(movie.id);
        return { ...movie, genre: name };
      }));

      // Manejo de Errores
      res.status(200).json({ status: 200, message: 'Películas encontradas.', data: { movies: moviesWithGenre } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las películas: ${error.message}` });
    }
  }

  // Actualizar una película por ID
  async updateById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.edit) {
        deleteImage(imagePath);
        return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })
      };

      const id = req.params.id;
      const { genre, title, synopsis, release_date, actors, directors, franchise, rating } = req.body;

      // Verificar si la película existe
      const existingMovie = await moviesModel.getById(id);
      if (!existingMovie) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Obtener la ruta de la imagen
      const folder = `../../static/images/${existingMovie.image}`;
      const imagePath = req.file?.path ?? path.join(__dirname, folder);
      const imageChange = req.file?.path ? true : false;

      // Verificar si el género existe
      if (genre) {
        const existingGenre = await genresModel.getById(genre);
        if (!existingGenre) {
          if (imageChange) deleteImage(imagePath);
          return res.status(404).json({ status: 404, message: 'Género no encontrado.' });
        }
      }

      // Eliminar imagen anterior si se va a actualizar
      if (req.file && req.file?.path) {
        const imageExisting = path.join(__dirname, folder);
        deleteImage(imageExisting);
      }

      // Datos de la película actualizados
      const updatedMovie = {
        title: title ?? existingMovie.title,
        image: req.file?.path ? path.basename(imagePath) : existingMovie.image,
        synopsis: synopsis ?? existingMovie.synopsis,
        release_date: release_date ?? existingMovie.release_date,
        actors: actors ?? existingMovie.actors,
        directors: directors ?? existingMovie.directors,
        franchise: franchise ?? existingMovie.franchise,
        rating: rating ?? existingMovie.rating
      };

      // Actualizar la película
      const affectedRows = await moviesModel.updateById(id, updatedMovie);

      // Actualizar la relación entre la película y el género en la tabla movies_genres
      if (genre) await moviesModel.updateMovieGenre(id, genre);

      if (affectedRows > 0) return res.status(200).json({ status: 200, message: 'Película actualizada exitosamente.' });

      deleteImage(imagePath);
      res.status(500).json({ status: 500, message: 'Error al actualizar la película.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar la película: ${error.message}` });
    }
  }

  // Eliminar una película por ID
  async deleteById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.delete) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })

      const id = req.params.id;

      // Verificar si la película existe
      const existingMovie = await moviesModel.getById(id);
      if (!existingMovie) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Eliminar la relación película-género en la tabla movies_genres
      await moviesModel.deleteMovieGenre(id);

      // Eliminar la relación película-review en la tabla movies_reviews y eliminar los reviews asociados
      await moviesModel.deleteMovieReviews(id);

      // Eliminar la película
      const affectedRows = await moviesModel.deleteById(id);
      if (affectedRows === 0) return res.status(404).json({ status: 404, message: 'Película no encontrada.' });

      // Eliminar la imagen
      const folder = `../../static/images/${existingMovie.image}`;
      const imagePath = path.join(__dirname, folder);
      deleteImage(imagePath);

      res.status(200).json({ status: 200, message: 'Película eliminada exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar la película: ${error.message}` });
    }
  }
}

const moviesController = new MoviesController();
module.exports = moviesController;