const Usuario = require('../models/usuario.model'); //Importamos el modelo
const bcrypt = require("bcryptjs"); //Importamos libreria para encriptar password
const { generarJWT } = require('../helpers/jwt.helpers'); //Importamos la funcion que genera el JWT

const login = async (req, res) => { //Funcion para hacer login
    const {email, password} = req.body; //Desestructuramos el email y el password del cuerpo de la peticion
    try{//En caso que la promesa se cumpla
        const usuarioDB = await Usuario.findOne({ email });//Verificamos que exista un usuario con ese email
        if(!usuarioDB){//Validacion si el usuario con ese email no existe
            res.status(404).json({//Respuesta con estatus 404
                ok: false,
                msj: 'Email no encontrado'//Mensaje de la respuesta
            })
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);//Verificacion de el password encriptado
        if(!validPassword){ //Validacion en base a la comparacion
            res.status(400).json({//Respuesta con estatus 400
                ok: false,
                msj: 'Password no es valido'//Mensaje de la respuesta
            });
        }
        // generar JWT
        const token = await generarJWT(usuarioDB.id);//Funcion que genera el JWT
        res.json({//Respuesta con el JWT generado
            ok: true,
            token // JWT
        })
    }catch(err){//En caso que la promesa falle
        console.log(err);//Impresion en consola del error
        res.status(500).json({//Respuesta con estatus 500
            ok: false,
            msj: 'ocurrio un error en el login'//Mensaje de la respuesta
        });
    }
}

module.exports = { //Exportamos la funcion de login
    login
}