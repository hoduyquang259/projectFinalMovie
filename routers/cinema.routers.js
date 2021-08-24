const { Router } = require("express");
const {
  getAll,
  getCinemasByCineplex,
} = require("../controllers/cinema.controllers");
const cinemaRouter = Router();
cinemaRouter.get("/", getAll);
cinemaRouter.get("/byCineplex", getCinemasByCineplex);
module.exports = {
  cinemaRouter,
};
