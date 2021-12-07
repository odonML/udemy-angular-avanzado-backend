
const cases = require("../usecase/busqueda.case");

const getBusqueda = (req, res) => {
    res.json({
        ok: true,
        msj: "realizada",
        busqueda: req.params.campo
    })
}

module.exports = {
    getBusqueda,
}