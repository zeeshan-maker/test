const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const { sequelize } = require("./models/index");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { Server } = require("socket.io");



const app = express();
const server = http.createServer(app);

// After `server` is created
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// Authentication middleware (Optional: using userId)
io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("Authentication failed"));
  }
  socket.userId = userId;
  next();
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.userId);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.userId);
  });
});

// Body parser
app.use(express.json());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "Welcome To Chat Application" });
});


// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  server.listen(process.env.PORT, () => {
    console.log("Server running at http://localhost:" + process.env.PORT);
  });
});
