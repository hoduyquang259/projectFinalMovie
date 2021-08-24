const { Movie } = require("../models");
/**
 * Data
 */

let moviesList = [
  {
    maPhim: 1321,
    tenPhim: "Ted2",
    biDanh: "ted2",
    trailer: "https://www.youtube.com/embed/S3AVcCggRnU",
    hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/ted2_gp08.jpg",
    moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
    maNhom: "GP08",
    ngayKhoiChieu: "2021-07-29T09:57:20.087",
    danhGia: 10,
  },
  {
    maPhim: 1336,
    tenPhim: "Trainwreck",
    biDanh: "trainwreck",
    trailer: "https://www.youtube.com/embed/2MxnhBPoIx4",
    hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/trainwreck.jpg",
    moTa: "Having thought that monogamy was never possible, a commitment-phobic career woman may have to face her fears when she meets a good guy.",
    maNhom: "GP08",
    ngayKhoiChieu: "2019-07-29T00:00:00",
    danhGia: 5,
  },
  {
    maPhim: 1351,
    tenPhim: "Inside Out",
    biDanh: "inside-out",
    trailer: "https://www.youtube.com/embed/seMwpP0yeu4",
    hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/insideout.jpg",
    moTa: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
    maNhom: "GP08",
    ngayKhoiChieu: "2019-07-29T00:00:00",
    danhGia: 5,
  },
];
//Get All
const getMovieList = async (req, res) => {
  try {
    const moviesList = await Movie.findAll();
    res.status(200).send(moviesList);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Get Detail
const getMovieDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const movieDetail = await Movie.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(movieDetail);
    if (movieDetail) {
      res.status(200).send(movieDetail);
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Create
const createMovie = async (req, res) => {
  const {
    tenPhim,
    biDanh,
    trailer,
    hinhAnh,
    moTa,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = req.body;
  try {
    const newMovie = await Movie.create({
      maPhim: Math.floor(Math.random() * 10000),
      tenPhim,
      biDanh,
      trailer,
      hinhAnh,
      moTa,
      maNhom,
      ngayKhoiChieu,
      danhGia,
    });
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update Movie
const updateMovie = async (req, res) => {
  const { maPhim } = req.params;
  const {
    tenPhim,
    biDanh,
    trailer,
    hinhAnh,
    moTa,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = req.body;
  //update movie
  try {
    let movieUpdate = await Movie.findOne({
      where: {
        maPhim,
      },
    });
    if (movieUpdate) {
      movieUpdate.tenPhim = tenPhim;
      movieUpdate.biDanh = biDanh;
      movieUpdate.trailer = trailer;
      movieUpdate.hinhAnh = hinhAnh;
      movieUpdate.moTa = moTa;
      movieUpdate.maNhom = maNhom;
      movieUpdate.ngayKhoiChieu = ngayKhoiChieu;
      movieUpdate.danhGia = danhGia;
      await movieUpdate.save();
      res.status(200).send(movieUpdate);
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Delete Movie
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    let movieDelete = await Movie.findOne({
      where: {
        id,
      },
    });
    if (movieDelete) {
      Movie.destroy({
        where: { id },
      });
      res.status(200).send(movieDelete);
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getMovieList,
  getMovieDetail,
  createMovie,
  updateMovie,
  deleteMovie,
};
