const express = require('express');
const {createOrder, getAllOrder, deleteOrder, updateOrder, getSpecificOrder} = require("../controllers/orderController")
const {verifyAdmin} = require("../middlewares/authMiddleware")

const router = express.Router();


router.post("/createOrder", verifyAdmin, createOrder);
router.get("/allOrders", verifyAdmin, getAllOrder);
router.get("/specificOrder/:id", verifyAdmin, getSpecificOrder);
router.put("/updateOrder/:id", verifyAdmin, updateOrder);
router.delete("/deleteOrder/:id", verifyAdmin, deleteOrder);


module.exports = router;