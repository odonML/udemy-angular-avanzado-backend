const Usuario = require("../models/usuario.models"); //Importacion de Nuestro Modelo
const bcrypt = require("bcryptjs"); //Importacion de libreria para encriptar contraseña
const { generarJWT } = require("../helpers/jwt.helpers"); //Importacion de generador de Token
// ------------------------GET--------------------------------------
const getUsuarios = async (req, res) => { //Funcion para obtener usuarips
  const usuarios = await Usuario.find({}, {_id: 0, nombre:1}); //Peticion para obtener los usuarios de la base de datos
  res.json({  //Respuesta de la peticion
    ok: true,
    usuarios, //Resultado de peticion a la base de datos
    id: req.id //id del usuario que realizo la peticion
  });
};
// -------------------------POST-------------------------------------
const crearUsaurio = async (req, res) => { //Funcion para crear un usuario
  const { password, email } = req.body; //Extraemos password y email del cuerpo de la peticion
  try { //En caso de que la promesa se cumpla
    const existeEmail = await Usuario.findOne({ email }); //Busqueda en base a el email de la peticion
    if (existeEmail) { //Validacion de email en dado caso que ya exista un usuario con ese email
      return res.status(400).json({ //Retorna una respuesta con estatus 400
        ok: false,
        msj: "el correo ya esta registrado", //Mensaje de respuesta
      });
    }
    const usuario = new Usuario(req.body); //Instancia del Modelo con el cuerpo de la peticion

    // ---------------------------------------------------------------------------------------
    //emcriptacion de password
    const salt = bcrypt.genSaltSync(); //
    usuario.password = bcrypt.hashSync(password, salt); //
    // ---------------------------------------------------------------------------------------

    await usuario.save();  //guardar usuario en la base de datos
    const token = await generarJWT(usuario.id); //Funcion que genera JWT
    res.json({ //Respuesta con los datos del usuario y su token
      ok: true,
      usuario, //Datos del usuario
      token //Token
    });
  } catch (err) { //En caso de que la promesa falle
    console.log(err); //Impresion en consola del error
    res.status(500).json({//Respuesta con estatus 560
      ok: false,
      msj: "algo salio mal revisa los logs", //Mensaje de la respuesta 
    });
  }
};
// --------------------------UPDATE------------------------------------
const actualizarUsuario = async (req, res) => { //Funcion para Actualizar Usuario
    const id = req.params.id; //Obtenemos el id pasado por parametros de la peticion (/:id)
  try { //En caso que la promesa se cumpla
      const usuarioID = await Usuario.findById(id); //Busqueda de usuario con el ID para verificar que ID sea valido
      if(!usuarioID){ //Validacion de usuario en dado caso que un usuario no sea encontrado mediante la ID
          return res.status(404).json({ //Respuesta con estatis 404
              ok: false,
              msj: 'el usuario no existe' //Mensaje de la respuesta
          })
      }
      //actualizaciones
      const {password, email, google, ...campos} = req.body; //Desestrucuramos de el cuerpo de la peticion
      if(usuarioID.email !== email ){ //Validacion si es que cambiamos el email
          const existeEmail = await Usuario.findOne({email}); //Realizamos una busqueda de un usuario en base a el email
          if(existeEmail){ //Validacion en base a la busqueda de el usuario
              res.status(400).json({//Respuesta con estatus 400
                  ok: false,
                  msj: 'Este correo ya existe'//Mensaje de la respuesta
              })
          }
      }
      campos.email = email; //Asignacion de email en el objeto
      const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true});//Actualizacion de los datos
      res.json({//Respuesta satisfactoria
          ok: true,
          usuarioActualizado//Usuario actualizado
      })
  } catch (err) {//En caso que la promesa falle
    console.log(err);//Impresion en consola del error
    res.status(500).json({//Respuesta con estatus 500
      ok: false,
      msj: "Error en la actualizacion", //Mensaje de la respuesta
    });
  }
};
// --------------------------DELETE------------------------------------
const eliminarUsuario = async (req, res) => {//Funcion para eliminar usuario
    const id = req.params.id;//Obtenemos el ID pasado por parametro en la peticion (/:id)
    try{//En caso que la promesa se cumpla
        const usuarioID = await Usuario.findById(id);//Verificamos que exista un usuario con ese ID
        if(!usuarioID){ //Validacion si el usuario no existe
            return res.status(404).json({ //Respuesta con estatus 404
                ok: false,
                msj: 'el usuario no existe'//Mensaje de la respuesta
            })
        }
        await Usuario.findByIdAndDelete(id); //Eliminacion del usuario en base al ID
        res.json({ //Respuesta de eliminacion
            ok: true,
            msj: 'Registro eliminado'//Mensaje de la respuesta
        });
    }catch(err){//En dado caso que la promesa falle
        console.log(err); //Imprecion en consola del error
        res.status(500).json({ //Respuesta con estatus 500
            ok: false,
            msj: 'erro en la peticion'//Mensaje de la respuesta
        })
    }
}

module.exports = { //Exportamos las Funciones
  getUsuarios,
  crearUsaurio,
  actualizarUsuario,
  eliminarUsuario
};
