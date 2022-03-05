const { Router } = require("express");
const { login, googleSignIn, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    check("email", "O email é obrigatório").isEmail(),
    check("password", "A senha é obrigatória").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "O token do Google é obrigatório").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
