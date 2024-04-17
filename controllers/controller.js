const axios = require('axios');
const apiUrl = 'https://api.itzuli.vicomtech.org/';
const apiKey = '49283693744747fe5118f3514f233bdfbfe15538b56b04a8f60e97de4148c444';

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