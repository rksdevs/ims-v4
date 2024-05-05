const Cart = require("../models/cartModel");

//create cart

const createCart = async (req,res) => {
    const newCart = req.body;
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

       const savedCart = await new Cart(newCart).save(); // need to test this

       res.status(200).json(savedCart);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const updateCart = async(req,res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new:true}) 
        res.status(200).json(updatedCart);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteCart = async(req,res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        await Cart.findByIdAndDelete(req.params.id) 
        res.status(200).json({message: "Cart Deleted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
} 

const getAllCarts = async(req,res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

       const allCarts = await Cart.find() 
        res.status(200).json(allCarts);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {createCart, updateCart, deleteCart, getAllCarts}