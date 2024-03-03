const { User } = require("../../database/config");
const { generateToken } = require("../../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const user = await User.where("email", "==", email).get();
    if (!user.empty) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const result = await User.add({ name, email, phoneNumber, password });
      res.status(201).json({ message: "Signup successful", data: result.id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while Signup");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.where("email", "==", email).get();
    if (!userData.empty) {
      const user = userData.docs[0].data();
      if (user.password === password) {
        const token = generateToken(res, userData.docs[0].id);
        const { password, ...otherData } = user;
        res.status(200).json({
          message: "Logged in successful",
          data: { id: userData.docs[0].id, token, ...otherData },
        });
      } else {
        res.status(404).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(404).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error while login");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userId = req.user
    const data = await User.get();
    let usersList = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    usersList = usersList.filter(user => user.id !== userId)
    res.status(200).json(usersList);
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
