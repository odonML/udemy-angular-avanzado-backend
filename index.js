const express = require("express"); //Impotamos express
require('dotenv').config(); //Variables de entorno
const cors = require("cors"); // Cors
const {dbConection} = require("./database/config"); //Conexion

const app = express();  //Creamos Express Aplication
app.use(cors()); // Middleware de Cors
app.use(express.json());

dbConection(); // Conexion a BD
//Rutas '/'
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/login', require('./routes/auth.routes'))

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Hola mundo",PORT);
})