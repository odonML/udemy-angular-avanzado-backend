/*
 * Medicos
 * Ruta: /api/medicos
 */
const { Router } = require("express"); //Router para la creacion de controladores de rutas
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt"); //Funcion que validara el token
const controller = require("../controllers/medicoss.controller");

//asignacion de inastancia en una variable "router"
const router = Router();

// --------------------------------------------------------------
//Ruta con peticion get
router.get("/", controller.getMedicos);
// -------------------------------------------------------------
//Ruta con peticion post
router.post(
    "/",
    [
        validarJWT,
        check("nombre", "el nombre del medico es necesario").not().isEmpty(),
        validarCampos
    ],
    controller.addMedico
);
// --------------------------------------------------------------
//Ruta de peticon Put a la cual le mandamos como parametro el ID (:id)
router.put("/:id", controller.updateMedico);
// --------------------------------------------------------------
//Ruta de peticon DELETE a la cual le mandamos como parametro el ID (:id)
router.delete("/:id", controller.deleteMedico);

//exportamos la bariable para que las rutas puedan ser manejadas
module.exports = router;
