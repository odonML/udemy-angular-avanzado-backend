const Hospital = require("../models/hospital.model");

const getHospitalesDB = async () => {
    const hospital = await Hospital.find({}, {_id: 0}).populate("usuario", "nombre img")
    return hospital;
};
const postHospitalDB = async (data) => {
    const hospital = new Hospital(data);
    const saveHospital = await hospital.save();
    return saveHospital;
};

module.exports = {
    getHospitalesDB,
    postHospitalDB,
};
