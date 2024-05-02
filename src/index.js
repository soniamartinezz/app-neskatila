const express = require('express');
const cors = require("cors")
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(cors());

//Conexión a BD
const { dbConnection } = require('./config/db');
dbConnection();

// Rutas
const routesApp = require('./routes/routesApp');
const routesAuth = require('./routes/authRoutes');

// Configura el middleware de sesión primero
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secret_word',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('https://app-neskatila-back-qyr1zt9p3-sonias-projects-58d0e0c6.vercel.app/', routesApp);
app.use(routesAuth);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});