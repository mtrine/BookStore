const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Genres = require('./Genres');
const Publisher = require('./Publisher');
const Books = sequelize.define('Books', {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Book name must be between 1 and 255 characters."
            }
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "Price must be an integer."
            }
        }
    },
    releaseYear:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isDate: {
                msg: "Release date must be a date."
            }
        }
    
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
},
{
    timestamps: true 
}
);
Books.belongsToMany(Genres, { through: 'BooksGenres' });
Books.belongsTo(Publisher);
Publisher.hasMany(Books);
sequelize.sync()
module.exports = Books;