const usuariosR = require("./usuarios.routes");
const hospitalesR = require("./hospitales.routes");
const medicosR = require("./medicos.routes");
// const busquedaR = require("")
const loginR = require("./auth.routes");

module.exports = {
    usuariosR,
    hospitalesR,
    medicosR,
    // busquedaR,
    loginR,
};
