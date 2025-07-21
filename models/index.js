const sequelize = require("../config/db");

const User = require("./user");
const Chat = require("./chat");
const Message = require("./message");

// 1. User and Message (sender)
User.hasMany(Message, { foreignKey: "sender_id", onDelete: "CASCADE" });
Message.belongsTo(User, { foreignKey: "sender_id" });

// 2. Chat and Message
Chat.hasMany(Message, { foreignKey: "chat_id", onDelete: "CASCADE" });
Message.belongsTo(Chat, { foreignKey: "chat_id" });

// 3. Chat belongs to two Users (user1 and user2)
Chat.belongsTo(User, { as: "user1", foreignKey: "user1Id", onDelete: "CASCADE" });
Chat.belongsTo(User, { as: "user2", foreignKey: "user2Id", onDelete: "CASCADE" });

User.hasMany(Chat, { foreignKey: "user1Id", as: "chatsAsUser1", onDelete: "CASCADE" });
User.hasMany(Chat, { foreignKey: "user2Id", as: "chatsAsUser2", onDelete: "CASCADE" });

module.exports = {
  sequelize,
  User,
  Chat,
  Message,
};
