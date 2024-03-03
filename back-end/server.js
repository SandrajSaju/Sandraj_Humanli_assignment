const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes/userRoutes");
const chatRoutes = require("./routes/chatRoutes/chatRoutes");
require("dotenv").config();
const port = 3232;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Sever is Running");
});

app.listen(port, () =>
  console.log(`Server is Running on http://localhost:${port}`)
);
