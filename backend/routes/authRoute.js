const express = require("express");
const {registerUser, loginUser, logoutUser} = require("../controllers/authControllers")


const router = express.Router(); //instance of express router

//login route
router.post("/login", loginUser)

//register route
router.post("/register", registerUser)

router.post("/logout", logoutUser)


module.exports = router;