const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configura multer para manejar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Configurar las credenciales de Cloudinary usando variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagenesRouter = express.Router();

// POST /api/imagenes/upload
// Ruta para la subida de imágenes a Cloudinary
imagenesRouter.post('/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No se ha subido ningún archivo.");
    }

    // Crear un stream de carga para Cloudinary
    const cld_upload_stream = cloudinary.uploader.upload_stream(
        { folder: 'tu_carpeta_de_cloudinary' },
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.json({ url: result.secure_url });
        }
    );

    // Conectar el buffer del archivo a un stream de lectura para enviarlo a Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
});

module.exports = imagenesRouter;