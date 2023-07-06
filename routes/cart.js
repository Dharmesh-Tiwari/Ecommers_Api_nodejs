const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.post("/", async (req, res) => {
  try {
    const newCart = new Cart({
      userId: req.body.userId,
      products: req.body.products,
    });

    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save cart" });
  }
});

module.exports = router;
