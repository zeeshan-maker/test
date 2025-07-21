const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define("Message", {
  message_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // auto-generate UUID
    primaryKey: true,
  },
  chat_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  messageType: {
    type: DataTypes.STRING, // text, image, etc.
    defaultValue: "text",
  },
});

module.exports = Message;
