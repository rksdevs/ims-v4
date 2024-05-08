const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyAdmin = async (req,res, next) => {
    let token;
    try {

        //find the authorization token
        token = req.cookies.access_token;
        // console.log(token)

        if(!token) {
            return res.status(400).send({message:"No Authorization Cookie Found!"})
        }

        jwt.verify(token, process.env.JWT_SECRET, async(error, decoded)=>{
            if(error) {
                return res.status(400).send({message: "Unauthorized!"})
            } else {
                req.user = await User.findById(decoded.id).select("-password");
                next();
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
        
    }
}

module.exports= {verifyAdmin}