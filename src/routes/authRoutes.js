const express = require("express");
const router = express.Router();
const controllerAuth = require('../controllers/authController');

// Rutas de autenticación
router.get('https://app-neskatila-back-qyr1zt9p3-sonias-projects-58d0e0c6.vercel.app/registro');
router.post('https://app-neskatila-back-qyr1zt9p3-sonias-projects-58d0e0c6.vercel.app/registro', controllerAuth.saveUser);
router.get('https://app-neskatila-back-qyr1zt9p3-sonias-projects-58d0e0c6.vercel.app/login');
router.post('https://app-neskatila-back-qyr1zt9p3-sonias-projects-58d0e0c6.vercel.app/login', controllerAuth.loginUser);

module.exports = router;
