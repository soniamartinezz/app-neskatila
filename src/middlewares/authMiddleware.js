require('dotenv').config();

const checkSessionMiddleware = (req, res, next) => {
    // Verificar si existe una sesión activa
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('https://app-neskatila-back-qyr1zt9p3-sonias-projects-58d0e0c6.vercel.app/login');
    }
};

module.exports = {
    checkSessionMiddleware
};
