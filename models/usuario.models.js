const {Schema, model} = require("mongoose"); //Importacion y destructuracion de Schema y model

const UsuarioSchema = new Schema({ //Schema: Define la forma o estrucctura de los documentos de una colexxion
    nombre:{
        type: String,
        required: true
    }, //Definicion de Campo
    email:{
        type: String,
        required: true,
        unique: true
    },//Definicion de Campo
    password:{
        type: String,
        required: true
    },//Definicion de Campo
    img:{
        type: String
    },//Definicion de Campo
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },//Definicion de Campo
    google:{
        type: Boolean,
        default: false
    }//Definicion de Campo
})

UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
})//Esta funcion es la encargada de eliminar los datos y cambiar de _id a id nuestra propiedad

module.exports = model('Usuario', UsuarioSchema); //Los modelos son los responsables de crear y leer los documentos de una BD