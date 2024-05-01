const express = require('express');
const router = express.Router();
const controllerApp = require('../controllers/controller');
const Translation = require("../models/Translation")

// Ruta (GET/POST) para realizar la traducción
router.all('/', async (req, res) => {
    try {
        if(!req.headers.apikey || !req.headers.apikey.startsWith("2")){
            res.status(403).json({"error": "No se encuentra apiKey valido"});
        }
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

// Ruta para guardar una traducción
router.post("/traducir", async (req, res) => {
    try {
        const translationUserName = req.body.userName;
        const translationText = req.body.texto;
        const sourceLanguage = req.body.sourceLanguage;

        let language;
        if (sourceLanguage === 'es') {
            language = '(español)';
        } else if (sourceLanguage === 'eu') {
            language = '(euskera)';
        } else {
            language = '';
        }

        const translation = new Translation({
            userName: translationUserName,
            texto: translationText,
            sourceLanguage: sourceLanguage
        });

        await translation.save();
        res.status(201).json(translation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar la traducción." });
    }
});

// Ruta para mostrar todas las traducciones guardadas
router.get('/traducciones-guardadas/:username', async (req, res) => {
    try {
        const translations = await Translation.find({ userName: req.params.username });
        // Información sobre el idioma origen de cada traducción
        const translationsWithLanguage = translations.map(translation => ({
            ...translation.toObject(),
            language: translation.sourceLanguage === 'es' ? '(español)' : '(euskera)'
        }));
        res.json(translationsWithLanguage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las traducciones guardadas." });
    }
});

// Ruta para eliminar todas las traducciones de un usuario guardadas en BD
router.delete('/traducciones-guardadas/:username', async (req, res) => {
    try {
        await Translation.deleteMany({ userName: req.params.username });
        res.status(200).json({ message: 'Todas las traducciones se han eliminado.' });
    } catch (error) {
        console.error('Error al eliminar las traducciones guardadas:', error);
        res.status(500).json({ message: 'Error al eliminar las traducciones guardadas.' });
    }
});

module.exports = router;