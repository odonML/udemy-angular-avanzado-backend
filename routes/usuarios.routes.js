/* 
    Ruta: /api/usuarios
*/
const {Router} = require("express");
const {check} = require("express-validator");
const {validarCampos} = require("../middleware/validar-campos")
const {getUsuarios, crearUsaurio, actualizarUsuario, eliminarUsuario} = require("../controllers/usuarios.controller");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router();

router.get('/', [validarJWT], getUsuarios );

router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
] ,crearUsaurio);

router.put('/:id',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    // check('role', 'El role es obligatorio').isEmail(),
    validarCampos
],
 actualizarUsuario );

 router.delete('/:id', [validarJWT],eliminarUsuario);

module.exports = router;