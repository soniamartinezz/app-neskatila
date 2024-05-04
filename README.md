*Cada repositorio, tanto el de Back-end como el de Front-end, posee su propio archivo README. Los dos primeros puntos ("Introducción: ¿Qué es Proyecto Neskatila?" y "Repositorio del proyecto" son comunes a ambos. Posteriormente, cada uno contará con sus propios puntos de explicación específicos.*

# Proyecto Neskatila (Readme Back-end):

## Introducción: ¿Qué es el Proyecto Neskatila?

Neskatila es una biblioteca de traducción que hemos desarrollado y publicado en npm (https://www.npmjs.com/package/neskatila). Esta biblioteca facilita la conversión de textos entre el castellano y el euskera en entornos web.

El propósito principal de este proyecto es su presentación en un entorno web (con un Back y un Front). En este entorno web, se da a conocer Neskatila, se exhibe su código fuente, se explica su funcionamiento y se realizan demostraciones reales de su funcionalidad y de cómo puede ser utilizado en React. Además, el proyecto incluye un sistema de registro de usuarios. Este registro es necesario para el uso de la biblioteca y permite a los usuarios guardar las traducciones que han realizado.

## Repositorio del proyecto

El proyecto consta de tres repositorios. Un Frontend, un Backend y la Libreria Neskatila:

- Backend:

	https://github.com/soniamartinezz/app-neskatila-back

- Frontend:

	https://github.com/soniamartinezz/app-neskatila-front

- Librería Neskatila para su publicación en npm:

	https://github.com/Mikelapra/Neskatila

En caso de descargar y usar el proyecto en local deben instalarse las dependencias.

	npm install

Crear archivo .env con las variables de entorno necesarias para el correcto funcionamiento de la aplicación. En este caso, es imprescindible una variable de entorno que contenga la conexión a la base de datos Mongo y a la API Itzuli (la cual se usa para realizar las traducciones).

Para levantar los entornos:

Para el Backend:

	node index.js

Para el Frontend:

	npm run dev


## Tecnologías utilizadas en Back-end:

Durante la realización del Back de este proyecto se han utilizado una serie de dependencias que han aportado distintas funcionalidades:

* **npm**: administrador de paquetes que permite a los desarrolladores de JavaScript trabajar con dependencias.
* **axios** : Librería utilizada para realizar solicitudes HTTP desde Node.js a nuestra Base de datos en Atlas(Almacenamiento de traducciones de usuarios), a la API itzuli (necesaria para realizar la traducción) y a GIT (Para mostrar el código de la dependencia Neskatila)
* **bcrypt**: Librería para cifrar contraseñas para su almacenamiento seguro en Node.js.
* **body-parser**: Middleware usado por Express que permite tener acceso al objeto req.body cuando haces una peticion post.
* **cors**: Biblioteca de Node.js que proporciona un middleware para habilitar el intercambio entre caso para comunicar el Frontend con el Backend al tener URLs diferentes.
* **dotenv**: Paquete para Node.js que permite configurar o usar las variables de entorno en nuestro código.
* **express**: Framework de backend Node.js que permite desarrollar aplicaciones de backend escalables. Ofrece el sistema de enrutamiento y una serie de características para ampliar el propio framework.
* **firebase**: Biblioteca que proporciona herramientas para el almacenamiento de datos y autenticación de usuarios
* **mongoose**: Librería para Node.js que permite escribir consultas para una base de datos de MongooDB.


## Funcionalidad de Back-end

### Estructura:

~~~

config
	db.js
	firebase.js

controllers
	controller.js
	authController.js

middlewares
	authMiddleware.js

models
	Translation.js

routes
	routesApp.js
	authRoutes.js

index.js

~~~

### Explicación de funcionamiento del Back-end:

Desde el backend se levanta el servidor mediante Express. Incluye rutas para manejar las funcionalidades que permite a los usuarios registrarse e iniciar sesión (inicializando la aplicación Firebase y con un middleware para verificar la existencia de una sesión activa), guardar y gestionar sus traducciones (establecer la conexión con la base de datos MongoDB). Establece un modelo de datos para las traducciones y controladores para procesar las solicitudes de traducción y autenticación de usuario para el uso de la dependencia neskatila y el uso de la API itzuli para poder llevar acabo la traducción.

### Funcionamiento en detalle de cada módulo:

**Carpeta "config":** (Dos ficheros, db.js y firebase.js)

*/config/db.js*

Módulo que se encarga de establecer la conexión con una base de datos MongoDB:

* **require('dotenv').config()**: Carga las variables de entorno desde el archivo `.env`. De esta manera poder conectarse a la BD de MongoDB.

* **dbConnection**: Esta función asíncrona intenta conectar a la base de datos utilizando Mongoose y la codigo almacenado en .env (`process.env.MONGO_URI`). Si la conexión es exitosa, imprime un mensaje en la consola 'Base de datos conectada con éxito'. Si ocurre un error, imprime el error en la consola y 'Error a la hora de iniciar la base de datos'.

*/config/firebase.js*

Este módulo inicializa Firebase:

* **firebaseConfig**: Este objeto contiene la configuración necesaria para inicializar la aplicación Firebase. Incluye la clave de API, el dominio de autenticación, el ID del proyecto, la URL de la base de datos, el ID del remitente de mensajes, el ID de la aplicación y el ID de medición.

* **initializeApp**: Esta función inicializa la aplicación Firebase con la configuración proporcionada.



**Carpeta "controllers":** (Dos ficheros, controller.js y authController.js)

*/controllers/authController.js*

Este es un módulo de autenticación de usuarios:

* **saveUser** : Función para procesar los datos del formulario de creación de usuario recogiendo los datos del cuerpo de la solicitud (nombre de usuario y contraseña), verifica si el nombre de usuario ya existe en la base de datos y, si no existe, crea un nuevo usuario con la contraseña cifrada y lo guarda en la base de datos.

* **loginUser** : Función para procesar los datos del formulario de inicio de sesión. Para ello recoge los datos del cuerpo de la solicitud (nombre de usuario y contraseña), verifica si el nombre de usuario existe en la base de datos y, si existe, comprueba si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos. Si la contraseña es correcta, inicia una sesión para el usuario.

*/controllers/controller.js*

Módulo de controlador para autentificarse en la API Itzuli y realizar traducciones.

* **config**: Configuración de la solicitud HTTP, incluyendo la autorización que utiliza la clave de API almacenada en las variables de entorno.

* **translateWord**: Función para realizar la solicitud de traducción realizando una solicitud POST a la API de traducción con los parámetros necesarios (palabra a traducir, idioma original y idioma final). Si la solicitud es exitosa, devuelve los datos de la respuesta. Si ocurre un error, lanza un error.

* **saveTranslation**: Función para guardar la traducción en la base de datos. Recoge los datos del cuerpo de la solicitud (nombre de usuario y texto traducido), crea un nuevo objeto de traducción y lo guarda en la base de datos. Si los datos necesarios no están presentes en el cuerpo de la solicitud, devuelve un error. Si ocurre un error al guardar la traducción, también devuelve un error.



**Carpeta "middlewares":** (Un fichero, authMiddleware.js)

*/middleware/authMiddleware.js*

Este modulo define un middleware para verificar si existe una sesión activa:

* **require('dotenv').config()**: Para la configuración de dotenv. Carga las variables de entorno desde el archivo .env. Para guardar así las claves y evitar subir esta información, añadiendo .env en .gitignore, al repositorio GIT.

* **checkSessionMiddleware**: Middleware de verificación de sesión, se ejecuta antes de llegar a las rutas de la aplicación. Verifica si existe una sesión activa comprobando si req.session y req.session.username existen. Si existen, llama a next() para pasar al siguiente middleware o ruta. Si no existen, redirige al usuario a la página de inicio de sesión con res.redirect('/login').



**Carpeta "models":** (Un fichero, Translation.js)

*/models/Translation.js*

Modulo para definir el modelo de objeto para recoger las traducciones que se van a guardar en BD utilizando Mongoose:

* **TranslationSchema**: Define la estructura de los datos para el objeto de las traducciónes a guardas. Cada traducción tiene un nombre de usuario (userName), un texto (texto) que es un array, y un idioma original (sourceLanguage). Además, se añade un campo de marcas de tiempo (timestamps) que Mongoose maneja automáticamente para registrar cuándo se creó y se actualizó por última vez cada documento.

* **Translation**: Crea un modelo a partir de "TranslationSchema". Este modelo se utilizará para crear y leer documentos de la base de datos.



**Carpeta "routes":** (Dos ficheros, routesApp.js y authRoutes.js)

*/routes/routesApp.js*

Módulo para las rutas en Node.js utilizando Express.

* **router.all('/')** Ruta (GET/POST) para realizar la traducción: Esta ruta acepta tanto solicitudes GET como POST. Se encarga de validar la apiKey y los parámetros de la URL (palabra a traducir, idioma original y idioma final). Luego, llama a la función "translateWord" importada de "controllers/controller.js" para realizar la traducción y devuelve el resultado.

* **router.post("/traducir")** Ruta para guardar una traducción: Esta ruta acepta solicitudes POST para guardar una traducción. Recoge los datos del cuerpo de la solicitud (nombre de usuario, texto a traducir, idioma original), crea un nuevo objeto de traducción y lo guarda en la base de datos.

* **router.get('/traducciones-guardadas/:username')** Ruta para mostrar todas las traducciones guardadas: Esta ruta acepta solicitudes GET y devuelve todas las traducciones guardadas por un usuario específico. Busca en la base de datos todas las traducciones que corresponden al nombre de usuario proporcionado en la URL.

* **router.delete('/traducciones-guardadas/:username')** Ruta para eliminar todas las traducciones de un usuario guardadas en BD: Esta ruta acepta solicitudes DELETE y elimina todas las traducciones guardadas por un usuario específico. Busca en la base de datos todas las traducciones que corresponden al nombre de usuario proporcionado en la URL y las elimina.

*/routes/authRoutes.js*

Módulo de rutas para autenticación en Node.js utilizando Express.

* **(router.get('/registro') y router.post('/registro', controllerAuth.saveUser)**: La primera ruta muestra la página de registro y la segunda ruta maneja la solicitud POST para registrar un nuevo usuario. Cuando se envía el formulario de registro, se llama a la función "saveUser" importado de "controllers/authController" para guardar el nuevo usuario en la base de datos.

* **(router.get('/login') y router.post('/login', controllerAuth.loginUser)**: La primera ruta muestra la página de inicio de sesión y la segunda ruta maneja la solicitud POST para iniciar sesión de un usuario. Cuando se envía el formulario de inicio de sesión, se llama a la función "loginUser" importado de "controllers/authController" para verificar las credenciales del usuario.



*/index.js*

Módulo principal del backend de la Web:

Se importan los módulos necesarios y se crea una nueva aplicación Express. Se establece el puerto en el que se escucharán las solicitudes.

Se configura la aplicación para usar varios middleware, incluyendo CORS (para permitir solicitudes de origen cruzado), express-session (para manejar las sesiones de usuario), y body-parser (para parsear el cuerpo de las solicitudes HTTP).

Se invoca función "dbConnection", importada de "/config/db", para conectar a la base de datos.

Se importan y se utilizan dos módulos de rutas, uno para las rutas generales de la Web y otro para las rutas de autenticación.
