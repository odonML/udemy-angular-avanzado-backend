const {Router} = require("express");
const { check } = require("express-validator");
const {login} = require("../controllers/auth.controller");
const { validarCampos } = require("../middleware/validar-campos");

const route = Router();

route.post('/', [
    check('email', 'El email es obligarotio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login );

module.exports = route;