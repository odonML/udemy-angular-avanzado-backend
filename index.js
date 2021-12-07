const express = require("express"); //Impotamos express
require("dotenv").config(); //Variables de entorno
const cors = require("cors"); // Cors
const { dbConection } = require("./database/config"); //Conexion a base de datos
const route = require("./routes/ALL.routes");

const app = express(); //Creamos Express Aplication

app.use(cors()); // Middleware de Cors
app.use(express.json()); //Middleware JSON

// Conexion a BD
dbConection(); 

//Rutas
app.use("/api/usuarios", route.usuariosR); //Rutas de Usuarios
app.use("/api/hospitales", route.hospitalesR); //Rutas de Hospitales
app.use("/api/medicos", route.medicosR); //Rutas de Medicos
app.use("/api/busqueda", route.busquedaR); //Rutas de Medicos
app.use("/api/login", route.loginR); //Rutas de Login

const PORT = process.env.PORT; //Variable de entorno

app.listen(PORT, () => {
    console.log("server run in port: ", PORT);
}); //Metodo que recibe como parametro el puesto y una funcion callback que imprime un mensaje
