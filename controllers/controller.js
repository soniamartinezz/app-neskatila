const axios = require('axios');
require('dotenv').config()
const apiUrl = 'https://api.itzuli.vicomtech.org/';
const apiKey = process.env.API_KEY;
const Translation = require('../models/Translation');

// Configuración de la solicitud HTTP
const config = {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
};

// Función para realizar la solicitud de traducción
exports.translateWord = async (word, source, target) => {
    const translateUrl = `${apiUrl}translation/get`;
    const requestData = {
        "sourcelanguage": source,
        "targetlanguage": target,
        "text": word,
        "tags": [],
        "getsentences": true
    };

    try {
        const response = await axios.post(translateUrl, requestData, config);
        return response.data;
    } catch (error) {
        throw new Error('Error al llamar a la API de traducción');
    }
};

// Función para guardar la traducción en BD
exports.saveTranslation = async (req, res) => {
    try {
        const { userName, texto } = req.body;
        if (!userName || !texto) {
            return res.status(400).json({ message: "Falta el nombre de usuario o el texto traducido." });
        }
        const newTranslation = new Translation({ userName, texto });
        await newTranslation.save();
        res.status(201).json({ message: "Traducción guardada." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al guardar la traducción." });
    }
};