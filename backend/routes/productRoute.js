const express = require('express');
const {addProduct, deleteProduct, editProduct, getAllProducts, getSpecificProduct} = require("../controllers/productController")
const {verifyAdmin} = require("../middlewares/authMiddleware")

const router = express.Router();


router.post("/addProduct", verifyAdmin, addProduct);
router.get("/allProducts", verifyAdmin, getAllProducts);
router.get("/specificProducts/:id", getSpecificProduct);
router.put("/updateProduct/:id", verifyAdmin, editProduct);
router.delete("/deleteProduct/:id", verifyAdmin, deleteProduct);


module.exports = router;