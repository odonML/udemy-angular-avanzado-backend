/*
* busqueda
* Ruta: /api/busqueda/:campo
*/

const {Router} = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const controller = require("../controllers/busqueda.controller");

const router = Router();

router.get("/:campo", validarJWT, controller.getBusqueda);

module.exports = router;