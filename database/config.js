const mongoose = require("mongoose"); //Importamos Mongoose
require("dotenv").config(); //Variables de entorno

const DB = process.env.DB_CNN; //Variable de entorno, URL de conexion
const dbConection = async () => {//Funcion de conexion
  try {
    mongoose.connect( //Conexion a la mongoDB
      DB, //Variable de entorno
      {
        useNewUrlParser: true, //Analizador de cadenas de conexion
        useUnifiedTopology: true, //Deteccion y supervision de servidor
        useCreateIndex: true, //Generador de indices
      }
    );
    console.log("DB connect");//Mensaje de conexion
  } catch (err) {
    console.log(err); //Menasje de error
  }
};

module.exports={ //Exportacion de funciones
    dbConection //Funcion que realiza la conexion
}; 
