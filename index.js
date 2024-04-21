const express = require('express');
const routes = require('./routes/routesApp');
const cors = require("cors")
const app = express();

app.use(cors())

const PORT = 3000;

// Rutas
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});