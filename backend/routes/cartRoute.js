const express = require('express');
const {createCart, deleteCart, updateCart, getAllCarts} = require("../controllers/cartController")
const {verifyAdmin} = require("../middlewares/authMiddleware")

const router = express.Router();


router.post("/newCart", verifyAdmin, createCart);
router.get("/allCarts", verifyAdmin, getAllCarts);
router.put("/updateCart/:id", verifyAdmin, updateCart);
router.delete("/deleteCart/:id", verifyAdmin, deleteCart);


module.exports = router;