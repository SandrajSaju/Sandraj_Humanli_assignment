const { generateToken } = require("../../utils/generateToken");
const User = require('../../models/userModel');
const Chat = require('../../models/chatModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords doesnt match" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const newUser = new User({
        name,
        email,
        phoneNumber,
        password: hashedPassword
      })
      await newUser.save()
      res.status(200).json({ newUser })
    } else {
      return res.status(400).json({ error: "User Already Registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while Signup");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (isPasswordMatch) {
        const userToken = generateToken(res, user._id)
        res.status(200).json({ user, userToken })
      } else {
        return res.status(400).json({ error: "Email or password does not match" });
      }
    } else {
      return res.status(400).json({ error: "You are not Registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error while login");
  }
};

const getAllUsers = async (req, res) => {
  try {
    // const userId = req.userId;
    // const chats = await Chat.find({ members: { $in: [userId] } }).sort({ updatedAt: -1 }).exec();
    // const memberArray = [];
    // if (chats) {
    //   for (const chat of chats) {
    //     for (const member of chat.members) {
    //       if (member.toString() !== userId.toString()) {
    //         const person = await User.findById(member);
    //         memberArray.push(person);
    //       }
    //     }
    //   }
    // }
    // const users = await User.find({_id:{$ne:userId}});
    // const combinedUsers = memberArray.concat(users)
    // res.status(200).json(combinedUsers)
    const userId = req.userId;
    const chats = await Chat.find({ members: { $in: [userId] } }).sort({ updatedAt: -1 }).exec();
    const memberArray = [];
    if (chats) {
      for (const chat of chats) {
        for (const member of chat.members) {
          if (member.toString() !== userId.toString() && !memberArray.some(m => m._id.toString() === member.toString())) {
            const person = await User.findById(member);
            memberArray.push(person);
          }
        }
      }
    }
    const users = await User.find({ _id: { $ne: userId, $nin: memberArray.map(m => m._id) } });
    const combinedUsers = memberArray.concat(users);

    res.status(200).json(combinedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting all users");
  }
};

const userData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.doc(userId).get();
    if (!user.data()) {
      throw new Error("No user found");
    } else {
      res.status(200).json({ id: user.id, ...user.data() });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting userdata");
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await User.doc(id).update(data);
    const user = await User.doc(id).get();
    if (!user.exists) {
      throw new Error("No user found");
    } else {
      res.status(200).json({
        message: "updated succesfully",
        data: { id: user.id, ...user.data() },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.doc(id).delete();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting user");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("userToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while logout");
  }
};

module.exports = {
  signup,
  getAllUsers,
  userData,
  updateUser,
  deleteUser,
  login,
  logout
};
