const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
    email: String,
    texto: [],
}, { timestamps: true });

const Translation = mongoose.model('Translation', TranslationSchema);

module.exports = Translation;