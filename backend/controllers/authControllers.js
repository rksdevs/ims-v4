const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")

const registerUser = async (req,res) => {
    // console.log(req.body)

    try {
        const salt = bcrypt.genSaltSync(10); //salt rounds for hashing
        const hash = bcrypt.hashSync(req.body.password, salt); //password hashing

        //new instance of user
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            img: req.body.img,
            isAdmin: req.body.isAdmin, // will set admin feature later
        });

        //before we create a new user, we need to check if there are existing users

        const existingUser = await User.findOne({username: req.body.username});
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists!",
                ...req.body
            })
        }

        await newUser.save();

        const {password, isAdmin, ...otherDetails} = newUser._doc;
        res.status(200).send({
            details: {...otherDetails},
            isAdmin,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const loginUser = async (req,res) => {
// const {username, password} = req.body
try {
    const user = await User.findOne({username: req.body.username});

    //if no user found
    if(!user) {
        return res.status(400).send({
            message: "No user found, please register!"
        });
    }

    //if user found check password
    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    if(!validatePassword) {
        return res.status(400).send({
            message: "Incorrect Password!"
        });
    }

    //if password is correct, create jwt token

    const token = jwt.sign(
        {id: user._id, isAdmin: user.isAdmin}, 
        process.env.JWT_SECRET
        )
    
    console.log("token :" + token)
    //destructure the user object to send only required info
    const {password, isAdmin, ...otherDetails} = user._doc;

    res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails, isAdmin})

    // console.log(req.cookies.access_token)
    
    
} catch (error) {
    console.log(error);
    return res.status(500).json(error)
    
}

}


module.exports= {registerUser, loginUser}