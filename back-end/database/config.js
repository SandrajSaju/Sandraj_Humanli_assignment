var admin = require("firebase-admin");

var serviceAccount = require("./fir-project-68a88-firebase-adminsdk-i8kbh-09151ca9d3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const User = db.collection("Users");
const Chat = db.collection("Chats");
const Message = db.collection("Messages");

module.exports = { User, Chat, Message };
