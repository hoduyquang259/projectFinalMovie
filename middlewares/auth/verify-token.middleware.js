const jwt = require("jsonwebtoken");

//xác thực xem đăng nhập hay chưa
const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const secretKey = "quangHD";
    const decode = jwt.verify(token, secretKey);
    req.tokenDecode = decode;
    next();
  } catch (error) {
    res.status(401).send("Bạn chưa đăng nhập!");
  }
};
//Phân quyền thao tác sau khi đăng nhập
/**
 * userTypeArray = ["QuanTri","KhachHang"]
 * 1. "QuanTri" --> "QuanTri" = user.userTypee ==>next()
 * 2. "KhachHang" --> "KhachHang" = user.userTypee ==>next()
 */
//truyen phan loai
const authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { tokenDecode } = req;
    req.send(tokenDecode);
    const condition =
      userTypeArray.findIndex((type) => {
        //trả về data
        return type === tokenDecode.maLoaiNguoiDung;
      }) > -1;
    if (condition) {
      return next();
    } else {
      res
        .status(403)
        .send({ message: "Bạn đã đăng nhập nhưng không có đủ quyền" });
    }
  };
};

module.exports = {
  authenticate,
  authorize,
};
