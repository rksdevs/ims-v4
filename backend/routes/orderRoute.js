const express = require('express');
const {createOrder, getAllOrder, deleteOrder, updateOrder} = require("../controllers/orderController")
const {verifyAdmin} = require("../middlewares/authMiddleware")

const router = express.Router();


router.post("/createOrder", verifyAdmin, createOrder);
router.get("/allOrders", verifyAdmin, getAllOrder);
router.put("/updateOrder/:id", verifyAdmin, updateOrder);
router.delete("/deleteOrder/:id", verifyAdmin, deleteOrder);


module.exports = router;