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