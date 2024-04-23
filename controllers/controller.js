const axios = require('axios');
require('dotenv').config()
const apiUrl = 'https://api.itzuli.vicomtech.org/';
const apiKey = process.env.API_KEY

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
