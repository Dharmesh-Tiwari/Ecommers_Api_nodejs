const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an order by ID
router.put('/:orderId', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: req.body },
      { new: true }  
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete an order by ID
router.delete('/:orderId', async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.orderId);
    res.status(200).json('Order deleted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // Create a new order
// router.post("/", async (req, res) => {
//     try {
//       const newOrder = new Order(req.body);
//       const savedOrder = await newOrder.save();
//       res.status(200).json(savedOrder);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Failed to create order" });
//     }
//   });

//   //UPDATE
//   //verifyTokenAndAdmin, 
// router.put("/:id", async (req, res) => {
//     try {
//       const updatedOrder = await Order.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedOrder);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   //DELETE
//   router.delete("/:id", async (req, res) => {
//     try {
//       await Order.findByIdAndDelete(req.params.id);
//       res.status(200).json("Order has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   //GET USER ORDERS
//   router.get("/find/:userId",  async (req, res) => {
//     try {
//       const orders = await Order.find({ userId: req.params.userId });
//       res.status(200).json(orders);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  
//   // Get all orders
//   router.get("/", async (req, res) => {
//     try {
//       const orders = await Order.find();
//       res.status(200).json(orders);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Failed to retrieve orders" });
//     }
//   });
  
//   module.exports = router;
