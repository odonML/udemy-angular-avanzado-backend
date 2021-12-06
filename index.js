const express = require("express"); //Impotamos express
require('dotenv').config(); //Variables de entorno 
const cors = require("cors"); // Cors
const {dbConection} = require("./database/config"); //Conexion a base de datos

const app = express();  //Creamos Express Aplication
app.use(cors()); // Middleware de Cors
app.use(express.json()); //Middleware JSON

dbConection(); // Conexion a BD
//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes')); //Rutas de Usuarios
app.use('/api/hospitales', require('./routes/hospitales.routes')); //Rutas de Hospitales
app.use('/api/login', require('./routes/auth.routes')); //Rutas de Login

const PORT = process.env.PORT; //Variable de entorno

app.listen(PORT, () => {
    console.log('server run in port: ', PORT);
}) //Metodo que recibe como parametro el puesto y una funcion callback que imprime un mensaje
