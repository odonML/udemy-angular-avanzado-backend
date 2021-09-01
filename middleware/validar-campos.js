const {validationResult} = require('express-validator'); //Extrae los errores de validación de una solicitud y los pone a disposición en un objeto Result

const validarCampos = (req, res, next) =>{ //middleware
    const errores = validationResult(req); //Extrae los errores y retorna un objeto Result
    if(!errores.isEmpty()){ //Verificacion de que el objeto de errores tenga algun error
        return res.status(400).json({ //retorna una respuesta con estatus 400
            ok: false, 
            msj: errores.mapped() //Obtine cada error en forma de objeto
        })
    }
    next(); //Cambia la ejecucion al siguiente middleware
}

module.exports ={ //Exportacion de la funcion
    validarCampos 
}