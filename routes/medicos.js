const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
} = require("../controllers/medicos");

const router = Router();

router.get("/", validarJWT, getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "O nome do médico é obrigatório").not().isEmpty(),
    check("hospital", "O id do hospital deve ser válido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "O nome do médico é obrigatórioEl nombre del médico es necesario").not().isEmpty(),
    check("hospital", "O id do hospital deve ser válido").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

router.delete("/:id", validarJWT, borrarMedico);

router.get("/:id", validarJWT, getMedicoById);

module.exports = router;
