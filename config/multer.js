const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = 'static/images';
        const destinationPath = path.join(__dirname, '..', folder);
        fs.mkdirSync(destinationPath, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        // Generar un nombre único para el archivo, utilizando el timestamp actual
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Función para borrar la imagen en caso de error
function deleteImage(image) {
    if (image) {
        fs.unlink(image, (err) => {
            if (err) {
                console.log(`Error al eliminar la imagen: ${err}`);
            }
        });
    }
}

// Configuración del middleware de multer para subir archivos
const upload = multer({ storage: storage });

module.exports = { upload, deleteImage };