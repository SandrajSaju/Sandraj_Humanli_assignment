const Chat = require('../../models/chatModel')
const User = require('../../models/userModel')
const Message = require('../../models/messageModel')

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.userId] }
    })
      .sort({ updatedAt: -1 })
      .exec()
    const userArray = [];
    if (chats) {
      for (const chat of chats) {
        for (const member of chat.members) {
          if (member.toString() !== req.params.userId.toString()) {
            const person = await User.findById(member);
            userArray.push(person);
          }
        }
      }
    }
    res.status(200).json({ users: userArray })
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message)
  }
}

const addMessage = async (req, res) => {
  try {
      const { chatId, senderId, text } = req.body;
      const message = new Message({
          chatId,
          senderId,
          text
      });
      const result = await message.save();

      const chat = await Chat.findById(chatId);
      chat.updatedAt = Date.now();
      await chat.save()
      
      res.status(200).json(result)
  } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message)
  }
}

const userGetMessage = async (req, res) => {
  try {
      const chatId = req.params.chatId;
      const message = await Message.find({ chatId });
      res.status(200).json(message)
  } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message)
  }
}

module.exports = {
  getAllChats,
  addMessage,
  userGetMessage
}