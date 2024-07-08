const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genres = sequelize.define('Genres', {
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Genre name must be between 1 and 255 characters."
            }
        }
    },
},{
    timestamps: true 
}
);
sequelize.sync()
module.exports = Genres;