const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Books = sequelize.define('Books', {
    bookName:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [1, 255],
                msg: "Book name must be between 1 and 255 characters."
            }
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: {
                args: [0],
                msg: "Price must be greater than 0."
            }
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
    timestamps: true
}
);
sequelize.sync({ force: false }) // Đặt `force: true` nếu muốn xóa và tạo lại bảng mỗi lần chạy
.then(() => {
  console.log('Database & tables created!');
})
.catch((err) => {
  console.error('Unable to sync database:', err);
});
module.exports = Books;