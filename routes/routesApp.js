const express = require('express');
const router = express.Router();
const controllerApp = require('../controllers/controller');
const Translation = require("../models/Translation")

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

// Ruta (GET/POST) para el guardado de traducción

router.post("/create", async (req, res) =>{
    try {
        const translationUserName = req.body.email;
        const translationText = req.body.Text;
        const translation = new Translation ({userName: translationUserName, text: translationText})
        await translation.save()
        res.status(201).json(translation)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;