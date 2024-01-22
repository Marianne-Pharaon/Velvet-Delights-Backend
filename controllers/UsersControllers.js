const bcrypt = require('bcrypt');
const User = require('../models/Users');
const { generateToken } = require('../extra/token');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    console.log('req.params._id', req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    console.log('query result', user);

    res.status(200).json({
      success: true,
      message: 'user retreived successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: ' user not found',
      error: error.message,
    });
  }
};

const getUsersByRole = async (req, res) => {
  const role = req.params.role.toLowerCase();

  try {
    const users = await User.find({ role });

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: `${role} not found` });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `${role} not found` });
    }

    res.status(500).send('Server Error');
  }
};

const addUser = async (req, res) => {
  try {
    const role = 'user';

    const {  fullName,age, email, password, phoneNumber, address } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      
      fullName,
      age,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User added successfully.',
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error while trying to register a new user.',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.params._id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'user updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'failed to update user',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.findOneAndDelete(user_id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to delete User',
      error: error.message,
    });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).maxTimeMS(10000);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} not found`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: 'Wrong password.',
      });
    }

    const token = generateToken(user._id, user.role);
    return res.status(200).json({
      success: true,
      message: `User with email ${email} logged in successfully.`,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Unable to login.',
      error: error.message,
    });
  
  }
};
const addAdmin = async (req, res) => {
  try {
    const role = 'admin';
    const {  fullName, email, age, password, phoneNumber } = req.body;
    const checkPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      age,
      password: checkPassword,
      phoneNumber,

      role,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const getAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: 'admin' });
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  getUsersByRole,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  addAdmin,
  getAdmins,
};
