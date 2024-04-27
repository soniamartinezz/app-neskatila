const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
    userName: String,
    texto: [],
}, { timestamps: true });

const Translation = mongoose.model('Translation', TranslationSchema);

module.exports = Translation;