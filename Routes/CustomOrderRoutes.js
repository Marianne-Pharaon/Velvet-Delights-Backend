const express = require('express');
const router = express.Router();

const {
    
    createCustomOrder,
    getAllCustomOrders,
    getCustomOrderById,
    updateCustomOrderById,
    deleteCustomOrderById,
  } = require("../controllers/CustomOrderControllers");

router.post('/addcustomOrders', createCustomOrder);
router.get('/getcustomOrders', getAllCustomOrders);
router.get('/getcustomOrders/:userId', getCustomOrderById);
router.put('/updatecustomOrders/:userId', updateCustomOrderById);
router.delete('/deletecustomOrders/:userId', deleteCustomOrderById);

module.exports = router;
