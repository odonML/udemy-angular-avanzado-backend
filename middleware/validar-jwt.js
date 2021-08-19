const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) =>{
    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            ok: false,
            msj: 'no hay token en la peticion'
        })
    }
    try{

        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();

    }catch(err){
        return res.status(401).json({
            ok: false,
            msj: 'token no valido'
        })
    }
}
module.exports = {
    validarJWT
}