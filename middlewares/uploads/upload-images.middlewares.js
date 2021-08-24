const mkdirp = require("mkdirp");
const multer = require("multer");
const uploadImage = (type) => {
  //tạo cấu trúc thư mục
  mkdirp.sync(`./public/images/${type}`);
  //set đường dẫn lưu file => trả về callback
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      //Add Date.now() để tránh trùng tên file
      callback(null, Date.now() + "_" + file.originalname); //đặt lại tên file
    },
  });
  //set upload file
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const extensionImageList = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImageList.includes(extension);
      if (check) {
        callback(null, true);
      } else {
        callback(new Error("extension không hợp lệ!"));
      }
    },
  });
  //upload file
  return upload.single(type);
};
module.exports = {
  uploadImage,
};
