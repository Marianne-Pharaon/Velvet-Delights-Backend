const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuth");

const {
  getAllUsers,
  getUserById,
  getUsersByRole,
  addUser,
  addAdmin,
  updateUser,
  deleteUser,
  loginUser,
  getAdmins,
} = require('../controllers/UsersControllers');

router.get('/getusers', getAllUsers);
router.get('/getusersid/:id', getUserById);
router.get('/getusers/role/:role', getUsersByRole);
router.post('/addusers', addUser);
router.post("/addAdmin", addAdmin);
router.get("/getAdmin", getAdmins);
router.put('/updateusers/:id',isAuthenticated(["organizer", "admin"]), updateUser);
router.delete('/deleteusers/:id', deleteUser);
router.post('/loginusers', loginUser);

module.exports = router;
