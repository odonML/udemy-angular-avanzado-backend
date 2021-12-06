const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs"); //Importacion de libreria para encriptar contraseña

const getAllUsuariosDB = async () =>{
    const allUsuarios = await Usuario.find({}, {_id: 0, nombre:1, email:1}); //Peticion para obtener los usuarios de la base de datos
    return allUsuarios;
}
const addUsuarioDB = async ({password, ...data}) =>{
    const usuario = new Usuario(data) //Instancia del Modelo con el cuerpo de la peticion
    // ---------------------------------------------------------------------------------------
    //emcriptacion de password
    const salt = bcrypt.genSaltSync(); //Salt son las bueltas que dara el hash para encriptar el password
    usuario.password = bcrypt.hashSync(password, salt); //hasheamos nustro password
    // ---------------------------------------------------------------------------------------
    const saveUsuario = await usuario.save();  //guardar usuario en la base de datos
    return saveUsuario;
}
const updateUsuarioDB = async ({id, campos}) =>{
    const updateUsuario = await Usuario.findByIdAndUpdate(id, campos, {new: true});//Actualizacion de los datos
    return updateUsuario;
}
const deleteUsuarioDB = async (id) =>{
    const deleteUsuario= await Usuario.findByIdAndDelete(id); //Eliminacion del usuario en base al ID
    return deleteUsuario;
}

//FIND----------------------------------------------
const findUsuarioForEmail = async (data) =>{
    const usuario = await Usuario.findOne(data); //Busqueda en base a el email de la peticion
    return usuario;
}
const findUsuarioForId = async (id) =>{
    const usuario = await Usuario.findById(id); //Busqueda de usuario con el ID para verificar que ID sea valido
    return usuario;
}


module.exports = {
    getAllUsuariosDB,
    addUsuarioDB,
    updateUsuarioDB,
    deleteUsuarioDB,
    findUsuarioForEmail,
    findUsuarioForId,
}