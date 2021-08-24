//Khởi tạo ứng dụng với expressjs
const express = require("express");
const { rootRouters } = require("./routers/root.routers");
const app = express();

/**
 * Khởi tạo một router và một controller basic
 *      - router: http://localhost:3000  URL
 *      - controller: () =>{} : Hàm xử lý
 */

//setup app sử dụng data dạng JSON
app.use(express.json());

//req(request): yêu cầu của client gửi lên server; res(response) là server phản ứng về cho client
app.get("/", (req, res) => {
  res.send("Hello Quang");
});

//Sử dụng rootRouters và tạo url thành (http://localhost:7000/api/v1)
app.use("/api/v1", rootRouters);

//lắng nghe ứng dụng chạy trên port 7000
const port = 7000;
app.listen(port, () => {
  console.log(`App listening on port: ${port} !`);
});
