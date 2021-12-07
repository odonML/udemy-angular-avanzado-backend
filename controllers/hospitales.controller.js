const cases = require("../usecase/hospital.case");

const getHospitales = async (req, res) => {
    const allHospitales = await cases.getHospitalesDB();
    res.json({
        ok: true,
        hospital: allHospitales,
    });
};

const crearHospital = async (req, res) => {
    const id = req.id;
    const dataHospital = {
        usuario: id,
        ...req.body,
    };
    try {
        const hospital = await cases.postHospitalDB(dataHospital);
        res.json({
            ok: true,
            hospital,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msj: "error en crear hospital",
            error,
        });
    }
};

const actualizarHospital = (req, res) => {
    res.json({
        ok: true,
        msj: "actualuzar Hospital",
    });
};

const eliminarHospital = (req, res) => {
    res.json({
        ok: true,
        msj: "eliminar Hospital",
    });
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital,
};
