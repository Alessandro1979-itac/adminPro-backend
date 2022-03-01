const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require('../controllers/usuarios');
const {
  validarJWT,
  varlidarADMIN_ROLE,
  varlidarADMIN_ROLE_o_MismoUsuario,
} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
  '/',
  [
    check('nombre', 'O nome é obrigatório').not().isEmpty(),
    check('password', 'A senha é obrigatória').not().isEmpty(),
    check('email', 'O e-mail é obrigatório').isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.put(
  '/:id',
  [
    validarJWT,
    varlidarADMIN_ROLE_o_MismoUsuario,
    check('nombre', 'O nome é obrigatório').not().isEmpty(),
    check('email', 'A senha é obrigatória').isEmail(),
    check('role', 'A função é obrigatória').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);
router.delete('/:id', [validarJWT, varlidarADMIN_ROLE], borrarUsuario);

module.exports = router;
