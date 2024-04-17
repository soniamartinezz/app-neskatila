const express = require('express');
const routes = require('./routes/routesApp');
const app = express();

const PORT = 3000;

// Rutas
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en https://localhost:${PORT}`);
});