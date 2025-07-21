const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Get messages for a specific chat
router.get("/:chat_id", messageController.getMessagesByChatId);

// Optional: Save message via API
// router.post("/send", messageController.sendMessage);

module.exports = router;
