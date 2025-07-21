const { Chat } = require("../models");

exports.createChat = async (req, res) => {
  const { user1_id, user2_id } = req.body;
  
  try {
    const existing = await Chat.findOne({
      where: {
        user1Id:user1_id,
        user2Id:user2_id,
      },
    });
    
    if (existing) return res.status(200).json(existing);

    const newChat = await Chat.create({ user1Id:user1_id, user2Id:user2_id });
   return res.status(201).json({message:"create chat",newChat});
  } catch (err) {
    res.status(500).json({ error: "Failed to create chat" });
  }
};
