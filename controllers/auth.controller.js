const Usuario = require('../models/usuario.models');
const bcrypt = require("bcryptjs");
const { generarJWT } = require('../helpers/jwt.helpers');

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msj: 'Email no encontrado'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            res.status(400).json({
                ok: false,
                msj: 'Password no es valido'
            });
        }

        // generar JWT
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            token
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msj: 'ocurrio un error en el login'
        });
    }
}

module.exports = {
    login
}