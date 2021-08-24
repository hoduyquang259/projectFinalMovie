const bcryptjs = require("bcryptjs");
const { User } = require("../models");
let userList = [
  {
    taiKhoan: "123@admin",
    hoTen: "Nguyễn Tân Testt",
    email: "ffstring@gmail.com",
    soDt: "53543588",
    matKhau: "123456",
    maLoaiNguoiDung: "KhachHang",
  },
  {
    taiKhoan: "1234",
    hoTen: "Vũ Duy Anh Đẹp Trai",
    email: "qwt@gmail.com",
    soDt: "2222588",
    matKhau: "1234",
    maLoaiNguoiDung: "QuanTri",
  },
];
//Get All
const getListUsers = async (req, res) => {
  try {
    let userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Get Detail
const getDetailUser = async (req, res) => {
  const { taiKhoan } = req.params;
  try {
    const userDetail = await user.findByPk(taiKhoan);
    // const userDetail = userList.find((user) => user.taiKhoan == taiKhoan);
    if (userDetail) {
      res.status(200).send(userDetail);
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Create
const createUser = async (req, res) => {
  const { taiKhoan, hoTen, email, soDt, matKhau, maLoaiNguoiDung } = req.body;

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(matKhau, salt);
    const newUser = await User.create({
      taiKhoan,
      hoTen,
      email,
      soDt,
      matKhau: hashPassword,
      maLoaiNguoiDung,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update
const updateUser = async (req, res) => {
  const { taiKhoan } = req.params;
  console.log(taiKhoan);
  const { hoTen, email, soDt, matKhau, maLoaiNguoiDung } = req.body;
  try {
    const [countUpdate] = await User.update({
      hoTen,
      email,
      soDt,
      matKhau,
      maLoaiNguoiDung,
    });
    if (countUpdate > 0) {
      res.status(200).send("Cập nhật thành công!");
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Delete
const deleteUser = async (req, res) => {
  const { taiKhoan } = req.params;
  console.log(taiKhoan);
  try {
    const userDelete = await User.findByPk(taiKhoan);
    if (userDelete) {
      await User.detroy({
        where: {
          taiKhoan,
        },
      });
      res.status(200).send("Xóa User thành công!");
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { file } = req;
  const urlImage = `http://localhost:7000/${file.path}`;
  try {
    const userDetail = await User.findByPk(tokenDecode.taikhoan);
    userDetail.avatar = urlImage;
    await userDetail.save();
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getListUsers,
  getDetailUser,
  createUser,
  deleteUser,
  updateUser,
  uploadAvatar,
};
