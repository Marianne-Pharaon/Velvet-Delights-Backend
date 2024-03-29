const express = require("express");
const router = express.Router();

const {
  getCheckoutByID,
    getAllCheckouts,
    deleteCheckout,
    addCheckout,
  } = require("../controllers/CheckoutControllers");


router.get("/getcheckouts", getAllCheckouts);
router.delete("/deletecheckouts/:user_id", deleteCheckout);
router.post("/addcheckouts", addCheckout);
router.get("/getCheckoutById", getCheckoutByID);

module.exports = router;
