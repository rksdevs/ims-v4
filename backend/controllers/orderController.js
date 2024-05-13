const Order = require("../models/orderModel");
const mongoose = require("mongoose")

const sequenceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

// Function to get the next sequence value and increment it
async function getNextSequenceValue(sequenceName) {
  const sequenceDoc = await Sequence.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const nextSeq = sequenceDoc.seq;
  const billPrefix = process.env.BILL_NO_PREFIX
  return `${billPrefix}${nextSeq}`;
}

// Initialize the sequence collection with an initial value
 const initializeSequence = async() => {
  await Sequence.findOneAndUpdate(
    { _id: 'billNumber' },
    { $setOnInsert: { seq: 0 } },
    { upsert: true }
  );
  console.log("Initialized sequence!")
}

//create Order
const createOrder = async (req, res) => {
    const billNumber = await getNextSequenceValue('billNumber')
    // const newOrder = req.body;
    const { items, custName, custAddress, custPhone, discount, netAmount, methodOfPayment, itemsPrice} = req.body;
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        if (items && items.length === 0) {
        return res.status(400).json({message: "No order items"})
        } else {
        const order = new Order({
            items: items.map((x)=>({
                ...x,
                productId: x._id,
                _id: undefined
            })),
            custName,
            custAddress,
            custPhone,
            discount,
            netAmount,
            methodOfPayment,
            billNumber,
            itemsPrice
        })

        const savedOrder = await new Order(order).save();

        res.status(200).json(savedOrder);
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Update Order
const updateOrder = async (req, res) => {
    const { items, custName, custAddress, custPhone, discount, netAmount, methodOfPayment, itemsPrice} = req.body;
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        const orderToUpdate = await Order.findById(req.params.id);

        if (orderToUpdate) {
            if (items && items.length === 0) {
        return res.status(400).json({message: "No order items"})
        } else {
            orderToUpdate.items= items
            orderToUpdate.custName = custName
            orderToUpdate.custAddress = custAddress
            orderToUpdate.custPhone = custPhone
            orderToUpdate.discount = discount
            orderToUpdate.netAmount = netAmount
            orderToUpdate.methodOfPayment = methodOfPayment
            orderToUpdate.itemsPrice = itemsPrice

        const updatedOrder = await orderToUpdate.save();

        res.status(200).json(updatedOrder);
        }
    }   
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
                createdAt: 1,
                custAddress: 1,
                items: { $arrayElemAt: ['$itemDetails.productName', 0] },
              },
            },
          ]);

        const formatDate = (dateInput) => {
           const originalDate = new Date(dateInput);
           

           const formattedDate = ('0' + originalDate.getDate()).slice(-2) + '-' + ('0' + (originalDate.getMonth() + 1)).slice(-2) + '-' + originalDate.getFullYear();

           return formattedDate;
        }

        const orderDetailsToSend = allOrders.map((order)=>(
            {...order,date: formatDate(order.createdAt)}
        ))

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        function getSalesForMonthYear(salesData, month, year) {
         return salesData.filter(sale => {
            const saleDate = new Date(sale.createdAt);
            return saleDate.getMonth() + 1 === month && saleDate.getFullYear() === year;
            });
        } 

        function getSalesForYear(salesData, month, year) {
         return salesData.filter(sale => {
            const saleDate = new Date(sale.createdAt);
            return saleDate.getFullYear() === year;
            });
        }

        const salesForCurrentMonth = getSalesForMonthYear(orderDetailsToSend, currentMonth, currentYear)
        const salesForCurrentYear = getSalesForYear(orderDetailsToSend, currentMonth, currentYear)
        

        res.status(200).json({allOrders: orderDetailsToSend, salesForCurrentMonth, salesForCurrentYear});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getSpecificOrder = async (req, res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        // const allOrders = await Order.find().select(projection).populate('items.productId', 'productName');
        //the above line with the help of populate we are including the product name of from the reference product schema in the items.productId field

        // const allOrders = await Order.aggregate([
        //     {
        //       $lookup: {
        //         from: 'products', // Assuming the name of the 'Product' collection is 'products'
        //         localField: 'items.productId',
        //         foreignField: '_id',
        //         as: 'itemDetails',
        //       },
        //     },
        //     {
        //       $project: {
        //         _id: 1,
        //         billNumber: 1,
        //         custName: 1,
        //         custPhone: 1,
        //         netAmount: 1,
        //         date: 1,
        //         custAddress: 1,
        //         items: { $arrayElemAt: ['$itemDetails.productName', 0] },
        //       },
        //     },
        //   ]);

        const formatDate = (dateInput) => {
           const originalDate = new Date(dateInput);
           

           const formattedDate = ('0' + originalDate.getDate()).slice(-2) + '-' + ('0' + (originalDate.getMonth() + 1)).slice(-2) + '-' + originalDate.getFullYear();

           return formattedDate;
        }

        // const orderDetailsToSend = allOrders.map((order)=>(
        //     {...order,date: formatDate(order.date)}
        // ))
        // console.log(orderDetailsToSend)

        const order = await Order.findById(req.params.id);

        const orderDetailsToSend = {
            ...order._doc,
            date: formatDate(order.createdAt)
        }

        res.status(200).json(orderDetailsToSend);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// Monthly Income
const monthWiseOrders = async (req, res) => {

}


module.exports = {createOrder, getAllOrder, deleteOrder, updateOrder, getSpecificOrder, initializeSequence}