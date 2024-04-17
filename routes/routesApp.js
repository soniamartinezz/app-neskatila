const express = require('express');
const router = express.Router();
const controllerApp = require('../controllers/controller');

// Ruta (GET/POST) para realizar la traducción
router.all('/', async (req, res) => {
    try {
        // Validación de parámetros en URL
        const wordTranslate = req.query.word;
        if (!wordTranslate) {
            throw new Error('No existe palabra para traducir');
        }

        const sourceLanguage = req.query.source;
        if (!sourceLanguage) {
            throw new Error('No se ha indicado el idioma original de la traducción');
        }

        const targetLanguage = req.query.target;
        if (!targetLanguage) {
            throw new Error('No se ha indicado el idioma final de la traducción');
        }

        const translation = await controllerApp.translateWord(wordTranslate, sourceLanguage, targetLanguage);
        res.json(translation);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;