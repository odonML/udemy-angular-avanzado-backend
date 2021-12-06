/*
* Usuarips
* Ruta: /api/usuarios
*/
const { Router } = require("express"); //Router para la creacion de controladores de rutas
const { check } = require("express-validator"); //Validacion campos
const { validarCampos } = require("../middleware/validar-campos"); //Funcion que validara campos
const {
  getUsuarios,
  crearUsaurio,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller"); //Funciones para Peticiones
const { validarJWT } = require("../middleware/validar-jwt"); //Funcion que validara el token
const router = Router(); //asignacion de inastancia en una variable "router"

// --------------------------------------------------------------
//Ruta con peticion get
router.get(
  "/",
  [
    validarJWT, //Middleware para la validacion de token
  ],
  getUsuarios //Funcion para Obtener los Usuarios
);
// -------------------------------------------------------------
//Ruta con peticion post
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(), //Validacion de campo, directo en la Request
    check("password", "El password es obligatorio").not().isEmpty(), //Validacion de campo, directo en la Request
    check("email", "El email es obligatorio").isEmail(), //Validacion de campo, directo en la Request
    validarCampos, //Middleware que evalua los checks
  ],
  crearUsaurio //Funcion para Crear los Usuarios
);
// --------------------------------------------------------------
//Ruta de peticon Put a la cual le mandamos como parametro el ID (:id)
router.put(
  "/:id",
  [
    validarJWT, //Middleware para la validacion de token
    check("nombre", "El nombre es obligatorio").not().isEmpty(), //Validacion de campos directo en la request
    check("email", "El email es obligatorio").isEmail(), //Validacion de campos directo en la request
    validarCampos, //Middleware que evalua los checks
  ],
  actualizarUsuario //Funcion para Actualizar usuario
);
// --------------------------------------------------------------
//Ruta de peticon DELETE a la cual le mandamos como parametro el ID (:id)
router.delete(
  "/:id",
  [validarJWT], //Middleware para la validacion de token
  eliminarUsuario //Funcion para Eliminar usuario
  );

module.exports = router; //exportamos la bariable para que las rutas puedan ser manejadas
