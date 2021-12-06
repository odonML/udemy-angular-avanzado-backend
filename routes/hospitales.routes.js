/*
 * Hospitales
 * Ruta: /api/hospitales
 */
const { Router } = require("express"); //Router para la creacion de controladores de rutas
const { check } = require("express-validator"); //Validacion campos
const { validarCampos } = require("../middleware/validar-campos"); //Funcion que validara campos
const controller = require("../controllers/hospitales.controller");

const { validarJWT } = require("../middleware/validar-jwt"); //Funcion que validara el token
const router = Router(); //asignacion de inastancia en una variable "router"

// --------------------------------------------------------------
//Ruta con peticion get
router.get("/", controller.getHospitales);
// -------------------------------------------------------------
//Ruta con peticion post
router.post("/", controller.crearHospital);
// --------------------------------------------------------------
//Ruta de peticon Put a la cual le mandamos como parametro el ID (:id)
router.put("/:id", controller.actualizarHospital);
// --------------------------------------------------------------
//Ruta de peticon DELETE a la cual le mandamos como parametro el ID (:id)
router.delete("/:id", controller.eliminarHospital);

module.exports = router; //exportamos la bariable para que las rutas puedan ser manejadas
