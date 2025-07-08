// index.js
const express = require('express');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
  res.status(200).json({status:200,message:"Welcome to Test API."});
});




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
