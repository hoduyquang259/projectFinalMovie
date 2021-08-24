const express = require("express");
const authRouter = express.Router();
const { signUp, signIn } = require("../controllers/auth.controllers");
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);

module.exports = {
  authRouter,
};
