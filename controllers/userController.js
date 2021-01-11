const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc Get user info
// @route GET /
// @access Private
const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    username: user.username
  });
};

// @desc Register a new user
// @route POST /users/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, username, password, passwordCheck } = req.body;

    if (!name || !email || !username || !password || !passwordCheck)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: 'Password needs to be at least 5 characters long.' });
    if (password !== passwordCheck)
      return res.status(400).json({ msg: 'Passwords must match.' });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res
        .status(400)
        .json({ msg: 'An account with this username already exists.' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: passwordHash
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Login a new user
// @route POST /users/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ msg: 'No account with this username has been registered.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get user token
// @route GET /users/tokenIsValid
// @access Public
const tokenValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUser, registerUser, loginUser, tokenValid };
