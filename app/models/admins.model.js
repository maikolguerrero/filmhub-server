const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class AdminsModel {
  // Crear un nuevo administrador
  async add(admin) {
    const { username, password, role = 'admin', permissions = '{"create": true, "edit": true, "delete": true}' } = admin;
    const sql = 'INSERT INTO admins (username, password, role, permissions) VALUES (?, ?, ?, ?)';
    const values = [username, password, role, permissions];
    try {
      const response = await query(sql, values);
      const newAdminId = response.insertId;
      return newAdminId;
    } catch (error) {
      console.log('Hubo un error al crear el administrador:', error);
      throw error;
    }
  }

  // Obtener todos los administradores
  async getAll() {
    const sql = 'SELECT * FROM admins';
    try {
      const admins = await query(sql);
      return admins;
    } catch (error) {
      console.log('Hubo un error al obtener los administradores:', error);
      throw error;
    }
  }

  // Obtener un administrador por su ID
  async getById(id) {
    const sql = `SELECT * FROM admins WHERE id = ?`;
    const values = [id];
    try {
      const [admin] = await query(sql, values);
      return admin;
    } catch (error) {
      console.log(`Hubo un error al obtener el administrador con ID ${id}:`, error);
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

  // Actualizar permisos de administrador por su id
  async updatePermissionsById(id, permissions) {
    const sql = 'UPDATE admins SET permissions = ? WHERE id = ?';
    const values = [permissions, id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al actualizar el administrador con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar contraseña de administrador por su username
  async updatePassword(username, password) {
    const sql = 'UPDATE admins SET password = ? WHERE username = ?';
    const values = [password, username];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al actualizar el administrador con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un administrador por su ID
  async deleteById(id) {
    const sql = 'DELETE FROM admins WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al eliminar el administrador con ID ${id}:`, error);
      throw error;
    }
  }
}

const adminsModel = new AdminsModel();
module.exports = adminsModel;