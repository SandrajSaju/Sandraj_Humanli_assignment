const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authMiddleware");

const {
  createChat,
  addMessage,
  findChat,
  userGetMessage
} = require("../../controllers/chatControllers/chatControllers");

router.post("/createchat/:id", verifyToken, createChat);
router.post("/addmessage",verifyToken, addMessage);
router.get('/find/:userId/:otherUserId', findChat);
router.get('/user/message/:chatId', userGetMessage)

module.exports = router;
