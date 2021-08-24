const express = require("express");
const { User } = require("../models");
const {
  getListUsers,
  getDetailUser,
  createUser,
  deleteUser,
  updateUser,
  uploadAvatar,
} = require("../controllers/user.controllers");
const { logger } = require("../middlewares/log/logger.middlewares");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const {
  uploadImage,
} = require("../middlewares/uploads/upload-images.middlewares");
const {
  checkExist,
} = require("../middlewares/validations/checkExist.middlewares");

const userRouters = express.Router();

//Chuẩn restFullApi
/**
 * api: lấy tất cả người dùng
 * url: "/api/users/get-list-user"
 * method: get
 */
userRouters.get(
  "/",
  logger("lấy tất cả người dùng"),
  checkExist(User),
  getListUsers
);

//Get Detail User
userRouters.get("/:taiKhoan", checkExist(User), getDetailUser);

//Create User
userRouters.post("/", authenticate, authorize(["QuanTri"]), createUser);
//Update  User
userRouters.put("/:taiKhoan", checkExist(User), updateUser);

//Delete User
userRouters.delete("/:taiKhoan", checkExist(User), deleteUser);

//upload image avatar
userRouters.post(
  "/upload-avatar",
  authenticate,
  uploadImage("avatar"),
  uploadAvatar
);
module.exports = { userRouters };
