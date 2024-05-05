const Order = require("../models/orderModel");

//create Order

const createOrder = async (req, res) => {
    const newOrder = req.body;
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        const savedOrder = await new Order(newOrder).save();

        res.status(200).json(savedOrder);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Update Order
const updateOrder = async (req, res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});

        res.status(200).json(updatedOrder);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


//Delete order
const deleteOrder = async (req, res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({message: "Order deleted!"});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


// Get all orders

const getAllOrder = async (req, res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        // const allOrders = await Order.find().select(projection).populate('items.productId', 'productName');
        //the above line with the help of populate we are including the product name of from the reference product schema in the items.productId field

        const allOrders = await Order.aggregate([
            {
              $lookup: {
                from: 'products', // Assuming the name of the 'Product' collection is 'products'
                localField: 'items.productId',
                foreignField: '_id',
                as: 'itemDetails',
              },
            },
            {
              $project: {
                _id: 1,
                billNumber: 1,
                custName: 1,
                custPhone: 1,
                netAmount: 1,
                date: 1,
                items: { $arrayElemAt: ['$itemDetails.productName', 0] },
              },
            },
          ]);

        res.status(200).json(allOrders);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// Monthly Income


module.exports = {createOrder, getAllOrder, deleteOrder, updateOrder}