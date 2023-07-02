const mysql = require('mysql2/promise');

// Crear la conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Verificar la conexión al obtener una conexión del pool
const validateConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida correctamente.');
        connection.release(); // Liberar la conexión al finalizar
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

// Verificar la conexión al obtener una conexión del pool
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida correctamente.');
        connection.release(); // Liberar la conexión al finalizar
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
})();

module.exports = {pool, validateConnection};