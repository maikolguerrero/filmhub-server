const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class AdminsModel {
  // Crear un nuevo administrador
  async add(admin) {
    const { username, password } = admin;
    const sql = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    const values = [username, password];
    try {
      const response = await query(sql, values);
      const newAdminId = response.insertId;
      return newAdminId;
    } catch (error) {
      console.log('Hubo un error al crear el administrador:', error);
      throw error;
    }
  }

  // Obtener un administrador por su username
  async getByUsername(username) {
    const sql = `SELECT * FROM admins WHERE username = ?`;
    const values = [username];
    try {
      const [admin] = await query(sql, values);
      return admin;
    } catch (error) {
      console.log(`Hubo un error al obtener el administrador con el username ${username}:`, error);
      throw error;
    }
  }
}

const adminsModel = new AdminsModel();
module.exports = adminsModel;