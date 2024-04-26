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

        // Comprobar si el usuario existe, si las contraseñas son idénticas, creación de nuevo de usuario
        if (usuarios) {
            res.redirect('/login');
        } else {
            // Generar el hash de la contraseña
            const hashContraseña = await bcrypt.hash(password, 10);

            const newUser = {
                nombre: username.toLowerCase(),
                password: hashContraseña
            };

            const newUserRef = push(usersRef);
            await set(newUserRef, newUser);
        }

        // Simplemente muestra los datos del usuario registrado en la consola
        console.log('Nuevo usuario registrado:');
        console.log('Username:', username);
        console.log('Password:', password);

        res.status(200).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Ocurrió un error interno, por favor inténtalo de nuevo más tarde');
    }
};
