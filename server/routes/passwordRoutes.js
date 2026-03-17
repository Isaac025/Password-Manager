const express = require("express");
const {
  addPassword,
  getPasswords,
  deletePassword,
  editPassword,
} = require("../controllers/passwordController.js");

const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, addPassword);
router.get("/", protect, getPasswords);
router.delete("/:id", protect, deletePassword);
router.patch("/:id", protect, editPassword);

module.exports = router;
