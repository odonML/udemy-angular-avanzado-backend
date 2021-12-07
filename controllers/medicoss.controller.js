
const cases = require("../usecase/medicos.case")

const getMedicos = async (req, res) =>{
    const medicos = await cases.getMedicosDB();
    res.json({
        ok: true,
        data: medicos,
    })
}
const addMedico = async (req, res) =>{
    const id = req.id;
    const dataMedico = {
        usuario: id,
        ...req.body
    }
    try{
        const medico = await cases.postMedicoDB(dataMedico);
        res.json({
            ok: true,
            data: medico
        })
    }catch(err){
        res.json({
            ok: false,
            msj: "bad post medico",
            error: err
        })
    }
}
const updateMedico = (req, res) =>{
    res.json({
        ok: true,
        msj: "update Medico"
    })
}
const deleteMedico = (req, res) =>{
    res.json({
        ok: true,
        msj: "delete Medico"
    })
}

module.exports={
    getMedicos,
    addMedico,
    updateMedico,
    deleteMedico,
}