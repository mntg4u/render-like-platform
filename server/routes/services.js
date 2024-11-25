const express = require("express");
const {
  createService,
  getServices,
  deployService,
} = require("../controllers/serviceController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createService);
router.get("/", authMiddleware, getServices);
router.post("/deploy/:id", authMiddleware, deployService);

module.exports = router;
