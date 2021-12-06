const Hospital = require("../models/hospital.model");

const getHospitalesDB = async () => {
    const hospital = await Hospital.find({});
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
