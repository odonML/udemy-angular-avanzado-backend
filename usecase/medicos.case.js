const Medicos = require("../models/medicos.model");

const getMedicosDB = async () =>{
    const data = await Medicos.find({}, {_id: 0, nombre:1}).populate("usuario", "nombre img").populate("hospital", "nombre");
    return data;
}
const postMedicoDB = async (data) =>{
    const medico = new Medicos(data);
    const saveMedico = await medico.save();
    return saveMedico;
} 
const updateMedicoDB = async () =>{

}
const deleteMedicoDB = async () =>{

}
//FIND----------------------------------------------
const findMedicoForEmail = async () =>{

}
const findMedicoForId = async () =>{

}
module.exports ={
    getMedicosDB,
    postMedicoDB,
    updateMedicoDB,
    deleteMedicoDB,
    findMedicoForEmail,
    findMedicoForId,
}
