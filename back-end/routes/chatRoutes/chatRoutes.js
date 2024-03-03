const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authMiddleware");

const {
  createChat,
} = require("../../controllers/chatControllers/chatControllers");

router.post("/", verifyToken, createChat);

module.exports = router;
