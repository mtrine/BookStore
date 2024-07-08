const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Books = require('./Books');
const User = require('./User');
const CartBooks = require('./CartBooks');
const Cart = sequelize.define('Cart', {
},
{
    timestamps: true 
}
);
Cart.belongsToMany(Books,{through: CartBooks});
Books.belongsToMany(Cart, { through: CartBooks });
Cart.belongsTo(User);
User.hasOne(Cart);
sequelize.sync()
module.exports = Cart;