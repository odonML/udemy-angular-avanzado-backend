const jwt = require('jsonwebtoken'); //Importamos la libraria que nos permite manejar los JWT

const validarJWT = (req, res, next) =>{ //Middleware para validar el JWT
    //Los Harders permiten al cliente y al servidor mandar informacion adicional junto a una peticion o respuesta
    const token = req.header('x-token'); //en este caso nuestro header de nombre x-header tiene nuestro token
    if(!token){//Validacion en caso que el token no exista
        res.status(401).json({//Respuesta con estatus 401
            ok: false,
            msj: 'no hay token en la peticion'//Mensaje de la respuesta
        })
    }
    try{//En dado caso que la promesa se cumpla
        const {id} = jwt.verify(token, process.env.JWT_SECRET);//Verificaremos el token y extraeremos el id
        req.id = id; //Asignamos el id a nuestra propiedad id en la peticion
        next(); //Next para segir con el flujo de funciones
    }catch(err){//En dado caso que la promesa falle
        return res.status(401).json({//Respuesta con estatis 401
            ok: false,
            msj: 'token no valido'//Mensaje de la respuesta
        })
    }
}
module.exports = {//Exportamos la funcion
    validarJWT
}