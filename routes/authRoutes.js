const express = require("express");
const router = express.Router();
const controllerAuth = require('../controllers/authController');

// Rutas de autenticación
router.get('/registro');
router.post('/registro', controllerAuth.saveUser);
router.get('/login');
router.post('/login', controllerAuth.loginUser);

module.exports = router;
