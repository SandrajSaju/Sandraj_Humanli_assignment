const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authMiddleware");

const {
  signup,
  getAllUsers,
  userData,
  updateUser,
  deleteUser,
  login,
  logout
} = require("../../controllers/userController/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getallusers", verifyToken, getAllUsers);
router.get("/:userId", verifyToken, userData);
router.patch("/update/:id", verifyToken, updateUser);
router.delete("/:id",verifyToken, deleteUser);
router.post("/logout", logout)

module.exports = router;
