const Usuario = require("../models/usuario.models");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.helpers");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email google role img");
  res.json({
    ok: true,
    usuarios,
    id: req.id
  });
};

const crearUsaurio = async (req, res) => {
  const { password, email } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msj: "el correo ya esta registrado",
      });
    }
    const usuario = new Usuario(req.body);
    //emcriptacion de password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //guardar usuario
    await usuario.save();
    // generar JWT
    const token = await generarJWT(usuario.id)
    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msj: "algo salio mal revisa los logs",
    });
  }
};

const actualizarUsuario = async (req, res) => {
    const id = req.params.id;
  try {
      const usuarioID = await Usuario.findById(id);
      if(!usuarioID){
          return res.status(404).json({
              ok: false,
              msj: 'el usuario no existe'
          })
      }
      //actualizaciones
      const {password, email, google, ...campos} = req.body;
      if(usuarioID.email !== email ){
          const existeEmail = await Usuario.findOne({email});
          if(existeEmail){
              res.status(400).json({
                  ok: false,
                  msj: 'Este correo ya existe'
              })
          }
      }
      campos.email = email;

      const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true});

      res.json({
          ok: true,
          usuarioActualizado
      })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msj: "Error en la actualizacion",
    });
  }
};

const eliminarUsuario = async (req, res) => {
    const id = req.params.id;

    try{
        const usuarioID = await Usuario.findById(id);
        if(!usuarioID){
            return res.status(404).json({
                ok: false,
                msj: 'el usuario no existe'
            })
        }
        await Usuario.findByIdAndDelete(id);
        res.json({
            ok: true,
            msj: 'Registro eliminado'
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msj: 'erro en la peticion'
        })
    }
}

module.exports = {
  getUsuarios,
  crearUsaurio,
  actualizarUsuario,
  eliminarUsuario
};
