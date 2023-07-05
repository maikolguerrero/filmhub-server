const bcrypt = require('bcrypt'); // Definimos la constante bcrypt para encriptar
const registry_secret = process.env.REGISTRY_SECRET; //Obtener el REGISTRY_SECRET desde las variables de entorno
const adminsModel = require('../models/admins.model'); // Importamos el modelo de administradores
const tokenManager = require('../auth/auth'); // Importamos el token manager
const tokensModel = require('../models/tokens.model'); // Importamos el modelo de tokens

class AdminsController {
  // Crear un nuevo administrador
  async add(req, res) {
    try {
      const { username, password, secret } = req.body;

      // Verificar el código para registrar
      if (secret !== registry_secret) return res.status(401).json({ status: 401, message: 'Código incorrecto.' });

      // Verificar si el administrador ya existe en la base de datos
      const adminExisting = await adminsModel.getByUsername(username);
      if (adminExisting) return res.status(400).json({ status: 400, message: 'El administrador ya existe.' });

      // Hasheo de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo administrador
      const newAdmin = { username, password: hashedPassword };
      const newAdminId = await adminsModel.add(newAdmin);

      res.status(201).json({ status: 201, message: 'Administrador creado exitosamente.', data: { id: newAdminId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al crear el administrador: ${error.message}` });
    }
  }

  // Obtener todos los administradores
  async getAll(req, res) {
    try {
      // Verificar si es un admin root
      const { role } = req.admin;
      if (role != "root") return res.status(403).json({ status: 403, message: 'No tienes autorización para ver la información de los usuarios.' });

      const admins = await adminsModel.getAll();
      // Eliminar la contraseña y convertir los permisos en cada admin
      const adminsWithoutPassword = admins.map(admin => {
        const { password, ...rest } = admin;
        return {
          ...rest,
          permissions: JSON.parse(admin.permissions)
        };
      });
      res.status(200).json({ status: 200, message: 'Administradores obtenidos correctamente.', data: { admins: adminsWithoutPassword } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener los administradores: ${error.message}` });
    }
  }

  // Obtener un administrador por su ID
  async getById(req, res) {
    try {
      // Verificar si es un admin root
      const { role } = req.admin;
      if (role != "root") return res.status(403).json({ status: 403, message: 'No tienes autorización para ver la información de los usuarios.' });

      const id = req.params.id;
      const admin = await adminsModel.getById(id);
      if (!admin) return res.status(404).json({ status: 404, message: 'Administrador no encontrado.' })

      res.status(200).json({ status: 200, message: 'Administrador encontrado.', data: { admin: adminsWithoutPassword } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el administrador: ${error.message}` });
    };
  }

  // Actualizar un administrador por su ID
  async updatePermissionsById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const roleAdminRoot = req.admin.role;
      const permissionsAdminRoot = JSON.parse(req.admin.permissions);
      if (roleAdminRoot != "root" || !permissionsAdminRoot.edit) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' });

      // Verificar que se proprociono nuevos datos
      const { id } = req.params;
      const { permissions } = req.body;
      if (!permissions) return res.status(400).json({ status: 400, message: 'No se han proporcionado nuevos permisos para actualizar el administrador.' });


      // Actualizar los permisos
      const permissionsString = JSON.stringify(permissions);
      const success = await adminsModel.updatePermissionsById(id, permissionsString);
      if (!success) return res.status(404).json({ status: 404, message: 'Administrador no encontrado.' });

      res.status(200).json({ status: 200, message: 'Administrador actualizado correctamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el administrador: ${error.message}` });
    }
  }

  // Actualizar un administrador por su ID
  async updatePassword(req, res) {
    try {
      // Verificar que se proprociono nuevos datos
      const { username, password } = req.body;
      if (!password) return res.status(400).json({ status: 400, message: 'No se han proporcionado nuevos permisos para actualizar el administrador.' });

      // Hasheo de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Actualizar la contraseña
      const success = await adminsModel.updatePassword(username, hashedPassword);
      if (!success) return res.status(404).json({ status: 404, message: 'Administrador no encontrado.' });

      res.status(200).json({ status: 200, message: 'Administrador actualizado correctamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el administrador: ${error.message}` });
    }
  }

  // Eliminar un administrador por su ID
  async deleteById(req, res) {
    try {
      // Comprobar los permisos para actualizar un admin
      const roleAdminRoot = req.admin.role;
      const permissionsAdminRoot = JSON.parse(req.admin.permissions);
      if (roleAdminRoot != "root" || !permissionsAdminRoot.delete) return res.status(403).json({ status: 403, message: 'No tienes autorización para realizar está acción.' });

      const { id } = req.params;
      await tokensModel.deleteByIdUsername(id); // Eliminar tokens del admin

      const success = await adminsModel.deleteById(id); // Eliminar admin
      if (!success) return res.status(404).json({ status: 404, message: 'Administrador no encontrado.' });

      res.status(200).json({ status: 200, message: 'Administrador eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el administrador: ${error.message}` });
    }
  }

  // Iniciar sesión
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Verificar si el administrador existe en la base de datos
      const admin = await adminsModel.getByUsername(username);
      if (!admin) return res.status(401).json({ status: 401, message: 'Credenciales inválidas.' });

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) return res.status(401).json({ status: 401, message: 'Credenciales inválidas.' });

      // Generar el token de autenticación utilizando el tokenManager
      const token = tokenManager.generateToken(admin);

      // Agregar el token a la bd
      await tokensModel.add({ userId: admin.id, token });

      res.status(200).json({ status: 200, message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al iniciar sesión: ${error.message}` });
    }
  }

  // Cerrar sesión
  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      // Eliminar el token de la base de datos de tokens válidos
      await tokensModel.delete(token);

      res.status(200).json({ status: 200, message: 'Sesión cerrada exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al cerrar sesión: ${error.message}` });
    }
  }
}

const adminsController = new AdminsController();
module.exports = adminsController;