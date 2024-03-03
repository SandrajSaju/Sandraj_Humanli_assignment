const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes/userRoutes");
const chatRoutes = require("./routes/chatRoutes/chatRoutes");
require("dotenv").config();
const { configureSocket } = require('./socket');
const connectDB = require('./config/connect')
const PORT = process.env.PORT

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const io = require('socket.io')(8080, {
  cors: {
      origin: "http://localhost:3000"
  }
})
configureSocket(io);

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Sever is Running");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((e) => {
    console.log('cannot connect to the network', e.message);
  })
