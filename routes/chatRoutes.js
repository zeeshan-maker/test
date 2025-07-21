const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Create a new chat
router.post("/", chatController.createChat);

// Get all chats for a user
// router.get("/user/:userId", chatController.getChatsForUser);

module.exports = router;
