const express = require("express");
const router = express.Router();
const {addBrand, editBrand, deleteBrand, getAllBrands} = require("../controllers/brandControllers");
const {verifyAdmin} = require("../middlewares/authMiddleware")


router.get("/allBrands", verifyAdmin, getAllBrands)
router.post("/addBrand",verifyAdmin, addBrand);
router.put("/updateBrand/:id",verifyAdmin, editBrand);
router.delete("/deleteBrand/:id", verifyAdmin, deleteBrand);


module.exports = router;