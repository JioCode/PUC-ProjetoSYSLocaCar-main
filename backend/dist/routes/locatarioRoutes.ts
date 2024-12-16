const express = require("express");
const {
  getLocatarios,
  getLocatarioById,
  createLocatario,
  updateLocatario,
  deleteLocatario,
} = require("./locatario.controller");

const router = express.Router();

router.get("/locatarios", getLocatarios);
router.get("/locatarios/:id", getLocatarioById);
router.post("/locatarios", createLocatario);
router.put("/locatarios/:id", updateLocatario);
router.delete("/locatarios/:id", deleteLocatario);

module.exports = router;
