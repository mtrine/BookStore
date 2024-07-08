const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: {
        args: [6, 20], // Độ dài tối thiểu là 6 và tối đa là 20 ký tự
        msg: "Username must be between 6 and 20 characters."
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: {
        args: [10, 50], // Độ dài tối thiểu là 10 và tối đa là 50 ký tự
        msg: "Email must be between 10 and 50 characters."
      },
      isEmail: {
        msg: "Must be a valid email address."
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [6, undefined], // Độ dài tối thiểu là 6 ký tự
        msg: "Password must be at least 6 characters long."
      }
    }
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
},{
    timestamps: true 
}
);

module.exports = Users;
