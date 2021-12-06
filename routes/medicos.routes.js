/*
 * Doctors
 * Ruta: /api/Doctors
 */
const { Router } = require("express"); //Router para la creacion de controladores de rutas
const controller = require("../controllers/medicoss.controller");
const { validarJWT } = require("../middleware/validar-jwt"); //Funcion que validara el token

//asignacion de inastancia en una variable "router"
const router = Router(); 

// --------------------------------------------------------------
//Ruta con peticion get
router.get("/", controller.getMedicos);
// -------------------------------------------------------------
//Ruta con peticion post
router.post("/", controller.addMedico);
// --------------------------------------------------------------
//Ruta de peticon Put a la cual le mandamos como parametro el ID (:id)
router.put("/:id", controller.updateMedico);
// --------------------------------------------------------------
//Ruta de peticon DELETE a la cual le mandamos como parametro el ID (:id)
router.delete("/:id", controller.deleteMedico);

//exportamos la bariable para que las rutas puedan ser manejadas
module.exports = router; 
