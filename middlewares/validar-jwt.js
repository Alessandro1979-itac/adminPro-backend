const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {  
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Não há token na solicitação",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token inválido",
    });
  }
};

const varlidarADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuário não existe",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "Você não tem privilégios para fazer isso",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Fale com o administrador",
    });
  }
};

const varlidarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuário não existe",
      });
    }

    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "Você não tem privilégios para fazer isso",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Fale com o administrador",
    });
  }
};

module.exports = {
  validarJWT,
  varlidarADMIN_ROLE,
  varlidarADMIN_ROLE_o_MismoUsuario,
};
