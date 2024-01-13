const express = require('express');
const router = express.Router();



const {
    getAllCarts,
    getCartsById,
    deleteCart,
    deleteCartsByUserId,
    addCarts,
   
  } = require("../controllers/CartControllers");


router.get('/getcarts', getAllCarts);
router.get('/getcarts/:id', getCartsById);
router.post('/addcarts', addCarts);
router.delete('/deletecarts/user/:user_id', deleteCart);
router.delete('/deleteallcarts/user/:user_id', deleteCartsByUserId);

module.exports = router;
