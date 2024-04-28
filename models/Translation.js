const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
    userName: String,
    texto: [],
    sourceLanguage: String
}, { timestamps: true });

const Translation = mongoose.model('Translation', TranslationSchema);

module.exports = Translation;