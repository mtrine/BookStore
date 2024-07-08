const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CartBooks=sequelize.define('CartBooks',{
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // You can set a default value if needed
    }
},
{
    timestamps: true,
}
);
sequelize.sync()
module.exports = CartBooks;