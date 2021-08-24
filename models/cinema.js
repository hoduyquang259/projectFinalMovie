"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cineplex }) {
      // define association here
      //định nghĩa 1 Cinema thuộc về 1 Cineplex
      this.belongsTo(Cineplex);
      // this.hasOne(Cineplex, { foreignKey: "cineplexId" });
    }
  }
  Cinema.init(
    {
      tenRap: DataTypes.STRING,
      diaChi: DataTypes.STRING,
      hinhAnh: DataTypes.STRING,
      cineplexId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};
