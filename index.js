const express = require("express"); //Impotamos express
require('dotenv').config(); //Variables de entorno
const cors = require("cors"); // Cors
const {dbConection} = require("./database/config"); //Conexion

const app = express();  //Creamos Express Aplication
app.use(cors()); // Middleware de Cors

dbConection(); // Conexion a BD
//Ruta get '/'
app.get('/', (req,res)=>{
    res.status(400).json({
        ok: true,
        msj: 'Todo salio bien'
    })
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Hola mundo",PORT);
})