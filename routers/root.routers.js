const express = require("express");
const rootRouters = express.Router();
const { movieRouters } = require("../routers/movie.routers");
const { userRouters } = require("../routers/user.routers");
const { authRouter } = require("./auth.routers");
const { cinemaRouter } = require("./cinema.routers");
rootRouters.use("/movies", movieRouters);
rootRouters.use("/users", userRouters);
rootRouters.use("/cinemas", cinemaRouter);
rootRouters.use("/auth", authRouter);
module.exports = {
  rootRouters,
};
