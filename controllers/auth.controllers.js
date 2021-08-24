const bcryptjs = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

//SIGN UP
const signUp = async (req, res) => {
  const { taiKhoan, hoTen, email, soDt, matKhau } = req.body;
  //ma hoa password
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(matKhau, salt);
  try {
    const user = await User.create({
      taiKhoan,
      hoTen,
      email,
      soDt,
      matKhau: hashPassword,
      maLoaiNguoiDung: "KhachHang",
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

//SIGN IN
const signIn = async (req, res) => {
  const { email, matKhau } = req.body;
  try {
    const userLogin = await User.findOne({
      where: { email },
    });
    if (userLogin) {
      const isAuth = bcryptjs.compareSync(matKhau, userLogin.matKhau);
      if (isAuth) {
        //tham số 1 trong payload: data
        const payload = {
          email: userLogin.email,
          maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
        };
        //tham số 2: bảo mật
        const secretKey = "quangHD";
        //tham số 3: expiresIN
        const token = jwt.sign(payload, secretKey, {
          expiresIn: 365 * 24 * 60 * 60,
        });
        res
          .status(200)
          .send({ message: "Đăng nhập thành công!", token: token });
      } else {
        res.status(400).send({ message: "Mật khẩu không đúng!" });
      }
    } else {
      res.status(404).send({ message: "Không tìm thấy email phù hợp" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
