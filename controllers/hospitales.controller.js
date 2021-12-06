

const getHospitales = (req, res) =>{
    res.json({
        ok: true,
        msj: "get Hospitales",
    })
}
const crearHospital = (req, res) =>{
    res.json({
        ok: true,
        msj: "crear Hospital"
    })
}
const actualizarHospital = (req, res) =>{
    res.json({
        ok: true,
        msj: "actualuzar Hospital"
    })
}
const eliminarHospital = (req, res) =>{
    res.json({
        ok: true,
        msj: "eliminar Hospital"
    })
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital,
}