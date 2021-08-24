const logger = (message) => (req, res, next) => {
  console.log(message);
  // res
  //   .status(400)
  //   .send("Không chạy tiếp middlewares, mà phản hồi về cho client");
  next();
};

module.exports = {
  logger,
};
