/*
 * Ruta: /api/login
 */
const {Router} = require("express");//Router para la creacion de controladores de rutas
const { check } = require("express-validator"); //Validacion de campos
const { validarCampos } = require("../middleware/validar-campos"); //Funcion que validara campos
const {login} = require("../controllers/auth.controller"); //Funcion para la peticion
const route = Router(); //asignacion de inastancia en una variable "router"

//Ruta para la peticion Post
route.post('/', [
    check('email', 'El email es obligarotio').isEmail(), //Validacion de campo, directo en la Request
    check('password', 'El password es obligatorio').not().isEmpty(), //Validacion de campo, directo en la Request
    validarCampos //Middleware que evalua los checks
], login ); //Funcion para realizar login

module.exports = route; //exportamos la bariable para que las rutas puedan ser manejadas