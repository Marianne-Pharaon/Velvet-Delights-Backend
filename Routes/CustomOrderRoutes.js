const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {
    
    createCustomOrder,
    getAllCustomOrders,
    getCustomOrderById,
    updateCustomOrderById,
    deleteCustomOrderById,
  } = require("../controllers/CustomOrderControllers");

router.post('/addcustomOrders',upload.single('image'), createCustomOrder);
router.get('/getcustomOrders', getAllCustomOrders);
router.get('/getcustomOrders/:userId', getCustomOrderById);
router.put('/updatecustomOrders/:userId', updateCustomOrderById);
router.delete('/deletecustomOrders/:userId', deleteCustomOrderById);

module.exports = router;
