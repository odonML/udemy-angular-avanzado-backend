const {Schema, model} = require("mongoose"); //importacion y desestructuracion de mongoose

const HospitalSchema = new Schema({ //Schema para los documentos de la coleccion de hospitales
    nombre:{
        type: String,
        require: true
    },//definicion de campo
    img:{
        type: String,
    },//definicion de campo
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },//definicion de campo enlace mediante id con el usuario
}, {collection: "hospitales"}); //cambio de nombre para colleccion y que no diga "hospitals"

HospitalSchema.method('toJSON',function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});//formateo e eliminacion de datos

module.export = model("Hospital", HospitalSchema); //exportacion de module
