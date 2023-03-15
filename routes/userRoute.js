const {
  createUser,
  getAllUser,
  editUser,
  deleteUser,
  getUserById,
  loginUser,
} = require("../controllers/userController");
const userRouter = require('express').Router();
  const verifyToken = require('../middleware/auth');

userRouter.post("/create", createUser)
userRouter.get("/", getAllUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id/update", verifyToken, editUser);
userRouter.delete("/:id/delete", verifyToken, deleteUser);
userRouter.get("/:id", getUserById);


module.exports = userRouter;
