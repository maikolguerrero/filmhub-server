const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class TokensModel {
  // Guardar un token válido en la base de datos
  async add(token) {
    const sql = 'INSERT INTO tokens (user_id, token) VALUES (?, ?)';
    const values = [token.userId, token.token];
    try {
      const response = await query(sql, values);
      const newTokenId = response.insertId;
      return newTokenId;
    } catch (error) {
      console.log('Hubo un error al guardar el token:', error);
      throw error;
    }
  }

  // Obtener todos los tokens
  async getAllTokens() {
    const sql = 'SELECT * FROM tokens';
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      console.log('Hubo un error al obtener los tokens:', error);
      throw error;
    }
  }

  // Buscar un token por su valor
  async getToken(token) {
    const sql = 'SELECT * FROM tokens WHERE token = ?';
    const values = [token];
    try {
      const [result] = await query(sql, values);
      return result;
    } catch (error) {
      console.log('Hubo un error al buscar el token:', error);
      throw error;
    }
  }

  // Eliminar un token de la base de datos
  async delete(token) {
    const sql = 'DELETE FROM tokens WHERE token = ?';
    const values = [token];
    try {
      await query(sql, values);
    } catch (error) {
      console.log('Hubo un error al eliminar el token:', error);
      throw error;
    }
  }


  // Eliminar un token de la base de datos
  async deleteByIdUsername(id) {
    try {
      const sql = 'DELETE FROM tokens WHERE user_id = ?';
      const values = [id];
      await query(sql, values);
    } catch (error) {
      console.log('Hubo un error al eliminar el token:', error);
      throw error;
    }
  }
}

const tokensModel = new TokensModel();
module.exports = tokensModel;