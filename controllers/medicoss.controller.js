

const getMedicos = (req, res) =>{
    res.json({
        ok: true,
        msj: "get Medicos",
    })
}
const addMedico = (req, res) =>{
    res.json({
        ok: true,
        msj: "add Medico"
    })
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