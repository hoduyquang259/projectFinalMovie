const express = require("express");
const { logger } = require("../middlewares/log/logger.middlewares");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const movieRouters = express.Router();

const {
  getMovieList,
  getMovieDetail,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controllers");
const {
  uploadImage,
} = require("../middlewares/uploads/upload-images.middlewares");

/**
 * RestFul APIs
 *
 */
/**Lấy danh sách phim */
movieRouters.get("/", logger("logger"), getMovieList);

/**Lấy chi tiết phim */
movieRouters.get("/:id", getMovieDetail);

/**Create phim */
movieRouters.post(
  "/",
  authenticate,
  authorize(["QuanTri"]),
  uploadImage("poster"),
  createMovie
);

//Update Movie
movieRouters.put("/:id", updateMovie);

//Delete Movie
movieRouters.delete("/:id", deleteMovie);

module.exports = {
  movieRouters,
};
