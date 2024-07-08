const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Books = require('./Books');
const Authors = sequelize.define('Authors', {
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Author name must be between 1 and 255 characters."
            }
        }
    },
},
{
    timestamps: true 
}
);
Authors.hasMany(Books); // Establishing relationship from Authors to Books
Books.belongsTo(Authors); // Establishing relationship from Books to Authors
sequelize.sync()
module.exports = Authors;
