'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenPhim: {
        type: Sequelize.STRING
      },
      biDanh: {
        type: Sequelize.STRING
      },
      trailer: {
        type: Sequelize.STRING
      },
      hinhAnh: {
        type: Sequelize.STRING
      },
      moTa: {
        type: Sequelize.STRING
      },
      maNhom: {
        type: Sequelize.STRING
      },
      ngayKhoiChieu: {
        type: Sequelize.STRING
      },
      danhGia: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};