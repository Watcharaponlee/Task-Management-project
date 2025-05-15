const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authenticate, authController.getProfile);
router.put("/profile/:id", authenticate, authController.updateProfile);
router.delete("/profile/:id", authenticate, authController.deleteProfile);

module.exports = router;
