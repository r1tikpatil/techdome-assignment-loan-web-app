const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const user = await User.findOne({ email, isAdmin });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User.create({
      email,
      isAdmin,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email: email, isAdmin: isAdmin });

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      return res.status(200).json({
        success: true,
        message: "User Successfully logged In",
        token,
        user: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        messgae: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
