const { Chat } = require("../../database/config");

const createChat = async (req, res) => {
  try {
    const userId1 = req.user;
    const { userId2 } = req.body;

    const existingChats = await Chat.where("members", "array-contains-any", [
      userId1,
      userId2,
    ]).get();

    for (let doc of existingChats.docs) {
      const chat = doc.data();
      if (
        chat.members.length === 2 &&
        chat.members.includes(userId1) &&
        chat.members.includes(userId2)
      ) {
        res.status(400).json({ message: "Chat already exists" });
        return;
      }
    }

    const chatData = await Chat.add({
      members: [userId1, userId2],
    });

    if (chatData) {
      res.status(201).json({ message: "Chat created", data: chatData.id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error creating chat");
  }
};

module.exports = {
  createChat,
};
