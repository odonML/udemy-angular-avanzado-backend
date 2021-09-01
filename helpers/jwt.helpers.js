const jwt = require("jsonwebtoken"); //Importacion de libreria

const generarJWT = (id) => { //Funcion que genera JSON web token
    return new Promise((resolve, reject) => { //Retorna una promesa
        const payload = { //Payload seran todos los datos con los que queremos generar el token
            id //ID del usuario
        };
        /* 
        Con .sign() generamos y firmaremos el token mandado como parametros:
        payload: son todos los datos que queremos tener en nuestro JWT
        SECRET_KEY: es una cadena de texto que nos ayudara para poder crear la firma del JWT
        {expiresIn: '12h'}: la duracion de nuestro JWT
        (callback): es la funcion que determina si hubo algun error o si el token se genero correctamente.
         */
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '12h'}, (err, token) => {
            if(err){//Error
                console.log(err);//mensaje de error
                reject("No se pudo generar el JWT"); //mandamos el error a la promesa
            }else{//Token generado
                resolve(token);//mandamos el token a la promesa
            }
        })
    })
}

module.exports ={ //exportamos la funcion
    generarJWT
}