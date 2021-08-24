//query
const { Cinema, Cineplex, sequelize } = require("../models");
const getAll = async (req, res) => {
  try {
    const cinemaList = await Cinema.findAll({
      //object: include: [{}]
      //mỗi dữ liệu trả ra kèm theo 1 cineplex
      include: [
        {
          model: Cineplex,
        },
      ],
    });
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};
// get cinemas by Cineplex
const getCinemasByCineplex = async (req, res) => {
  //   const { id } = req.params;
  //dùng để query nhanh, id hoặc tên
  const { id, name } = req.query;
  console.log(id, name);
  try {
    // chuỗi trong string template là code MySQL copy vào:
    //bóc tách [result] trong data trả về
    const [result] = await sequelize.query(`
        select cinemas.name, cinemas.image from cinemas
        inner join cineplexes
        on cineplexes.id = cinemas.cineplexId 
        where cineplexes.id = ${id}
`);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAll,
  getCinemasByCineplex,
};
