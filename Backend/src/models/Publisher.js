const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publisher = sequelize.define('Publisher', {
    publisherName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "Publisher name must be between 1 and 255 characters."
            }
        }
    },
},
{
    timestamps: true 
}
);
module.exports = Publisher;