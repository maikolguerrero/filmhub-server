const genresModel = require('../models/genres.model');

class GenresController {
  // Crear un nuevo género
  async add(req, res) {
    const { name } = req.body;

    // Comprobar los permisos para actualizar un admin
    const { role } = req.admin;
    const permissions = JSON.parse(req.admin.permissions);
    if ((role != "admin" && role != "root") || !permissions.create) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' });

    try {
      // Verificar si ya existe un género con el mismo nombre
      const existingGenre = await genresModel.getByName(name);
      if (existingGenre) {
        return res.status(400).json({ status: 400, message: 'Ya existe un género con ese nombre.' });
      }

      // Crear el nuevo género
      const newGenreId = await genresModel.add(name);

      res.status(201).json({ status: 201, message: 'Género creado exitosamente.', data: { id: newGenreId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al crear el género: ${error.message}` });
    }
  }

  // Obtener todos los géneros
  async getAll(req, res) {
    try {
      const genres = await genresModel.getAll();
      res.status(200).json({ status: 200, message: 'Géneros obtenidos correctamente.', data: { genres } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener los géneros: ${error.message}` });
    }
  }

  // Obtener un género por ID
  async getById(req, res) {
    try {
      const id = req.params.id;
      const genre = await genresModel.getById(id);
      if (!genre) return res.status(404).json({ status: 404, message: 'Género no encontrado.' });

      res.status(200).json({ status: 200, message: 'Género encontrado.', data: { genre } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el género: ${error.message}` });
    }
  }

  // Editar un género por ID
  async updateById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.edit) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })

      const id = req.params.id;
      const { name } = req.body;

      // Verificar si el género existe
      const existingGenre = await genresModel.getById(id);
      if (!existingGenre) return res.status(404).json({ status: 404, message: 'Género no encontrado.' });

      // Verificar si ya existe un género con el mismo nombre
      if (name && name !== existingGenre.name) {
        const existingName = await genresModel.getByName(name);
        if (existingName) {
          return res.status(400).json({ status: 400, message: 'Ya existe un género con ese nombre.' });
        }
      }

      // Actualizar el género
      const affectedRows = await genresModel.updateById(id, name);

      if (affectedRows > 0) return res.status(200).json({ status: 200, message: 'Género actualizado exitosamente.' });

      res.status(500).json({ status: 500, message: 'Error al actualizar el género.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el género: ${error.message}` });
    }
  }

  // Eliminar un género por ID
  async deleteById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const { role } = req.admin;
      const permissions = JSON.parse(req.admin.permissions);
      if ((role != "admin" && role != "root") || !permissions.delete) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' })

      const id = req.params.id;

      // Verificar si el género existe
      const existingGenre = await genresModel.getById(id);
      if (!existingGenre) return res.status(404).json({ status: 404, message: 'Género no encontrado.' });

      // Eliminar el género
      const affectedRows = await genresModel.deleteById(id);
      if (affectedRows === 0) return res.status(404).json({ status: 404, message: 'Género no encontrado.' });

      res.status(200).json({ status: 200, message: 'Género eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el género: ${error.message}` });
    }
  }
}

const genresController = new GenresController();
module.exports = genresController;