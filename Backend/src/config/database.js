const { Sequelize } = require('sequelize');
require('dotenv').config({path:'./src/.env'});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  sequelize.sync() // Đặt `force: true` nếu muốn xóa và tạo lại bảng mỗi lần chạy
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
module.exports = sequelize;