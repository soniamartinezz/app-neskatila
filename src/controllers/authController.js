const bcrypt = require('bcrypt');
const { getDatabase, ref, query, orderByChild, equalTo, get, push, set } = require('firebase/database');
const { firebase } = require('../config/firebase'); 

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

// Función para procesar los datos del formulario de creación de usuario
exports.saveUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el campo de nombre de usuario está vacío
        if (!username) {
          req.session.error = 'El nombre de usuario está vacío';
          return res.redirect('/registro');
        }

        const database = getDatabase(firebase);
        const usersRef = ref(database, 'usuarios');

        // Consultar si el usuario existe
        const userQuery = query(usersRef, orderByChild('nombre'), equalTo(username));
        const snapshot = await get(userQuery);
        const usuarios = snapshot.val();

        // Comprobar si el usuario existe
        if (usuarios) {
            return res.status(400).send('El nombre de usuario ya está en uso');
        }

        // Generar el hash de la contraseña
        const hashContraseña = await bcrypt.hash(password, 10);

        const newUser = {
            nombre: username.toLowerCase(),
            password: hashContraseña
        };

        const newUserRef = push(usersRef);
        await set(newUserRef, newUser);

        res.status(200).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Ocurrió un error interno, por favor inténtalo de nuevo más tarde');
    }
};

exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Verificar si el nombre de usuario está vacío
      if (!username || !password) {
        return res.status(400).send('El nombre de usuario y la contraseña son requeridos.');
      }
  
      const database = getDatabase(firebase);
      const usersRef = ref(database, 'usuarios');
  
      // Consultar si el usuario existe
      const userQuery = query(usersRef, orderByChild('nombre'), equalTo(username.toLowerCase()));
      const snapshot = await get(userQuery);
      const usuarios = snapshot.val();
  
      if (!usuarios) {
        // Comprobar si el usuario existe
        return res.status(404).send('El nombre de usuario no existe.');
      } else {
        // Comprobar si la contraseña coincide
        const userData = Object.values(usuarios)[0];
        const contraseñaCorrecta = await bcrypt.compare(password, userData.password);
        if (!contraseñaCorrecta) {
          // La contraseña no coincide
          return res.status(401).send('La contraseña no es correcta.');
        } else {
          // La contraseña coincide, inicia una sesión y redirige a /dashboard
          req.session.username = username;
          return res.status(200).send('Inicio de sesión exitoso.');
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Ocurrió un error interno, por favor inténtalo de nuevo más tarde.');
    }
  };