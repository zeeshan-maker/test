const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Chat = sequelize.define("Chat", {
  chat_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // auto-generate UUID
    primaryKey: true,
  },
   user1Id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user2Id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Chat;
