const query = require('../../config/query');

class GenresModel {
  // Crear un nuevo género
  async add(name) {
    try {
      const sql = 'INSERT INTO genres (name) VALUES (?)';
      const values = [name];
      const response = await query(sql, values);
      const newGenreId = response.insertId;
      return newGenreId;
    } catch (error) {
      console.log('Hubo un error al crear el género:', error);
      throw error;
    }
  }

  // Obtener todos los géneros
  async getAll() {
    try {
      const sql = 'SELECT * FROM genres';
      const genres = await query(sql);
      return genres;
    } catch (error) {
      console.log('Hubo un error al obtener los géneros:', error);
      throw error;
    }
  }

  // Obtener un género por ID
  async getById(id) {
    try {
      const sql = 'SELECT * FROM genres WHERE id = ?';
      const values = [id];
      const [genre] = await query(sql, values);
      return genre;
    } catch (error) {
      console.log(`Hubo un error al obtener el género con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener un género por nombre
  async getByName(name) {
    const sql = 'SELECT * FROM genres WHERE name = ?';
    const values = [name];
    try {
      const [genre] = await query(sql, values);
      return genre;
    } catch (error) {
      console.log(`Hubo un error al obtener el servicio con nombre ${name}:`, error);
      throw error;
    }
  }

  // Editar un género por ID
  async updateById(id, name) {
    try {
      const sql = 'UPDATE genres SET name = ? WHERE id = ?';
      const values = [name, id];
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al actualizar el género con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un género por ID
  async deleteById(id) {
    try {
      const sql = 'DELETE FROM genres WHERE id = ?';
      const values = [id];
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al eliminar el género con ID ${id}:`, error);
      throw error;
    }
  }
}

const genresModel = new GenresModel();
module.exports = genresModel;