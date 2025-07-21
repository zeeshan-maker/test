const { Message } = require("../models");

exports.getMessagesByChatId = async (req, res) => {
  const { chat_id } = req.params;
  
  try {
    const messages = await Message.findAll({
      where: { chat_id }
    });
    return res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
