const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Create new user
    const newUser = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = user.password === password;
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .json({
        status: 200,
        token,
        user: { user_id: user.user_id, name: user.name, email: user.email },
        message:"Login successfully."
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.getUser = async (req, res)=>{
  try {
    const users = await User.findAll();
    return res.status(200).json({users})
  } catch (error) {
    return res.status(500).json({error:error})
  }
}