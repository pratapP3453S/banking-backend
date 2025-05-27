
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Account = sequelize.define('Account', {
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Accounts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

User.hasMany(Account, { foreignKey: 'user_id' });
Account.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Account;
