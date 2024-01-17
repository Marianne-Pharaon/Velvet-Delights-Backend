const Price = require('../models/Custom_Orders');
const express = require('express');
const router = express.Router();

// Endpoint to calculate the price
router.post('/calculatePrice', async (req, res) => {
    try {
        // receive user selections in the request body
        const { flavor, filling, topping, size } = req.body;

        // You should implement your own logic to calculate the price based on the selections
        // This is just a placeholder, replace it with your actual calculation logic
        const basePrice = 6; 
        const additionalCost = flavor.length + filling.length + topping.length + size.length;

        const totalPrice = basePrice + additionalCost;

        // You might also save the order with the calculated price to the database
        const newOrder = new CustomOrder({
            flavor,
            filling,
            topping,
            size,
            totalPrice,
        });

        await newOrder.save();

        // Send the calculated price back to the frontend
        res.status(200).json({ price: totalPrice });
    } catch (error) {
        console.error('Error calculating price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
