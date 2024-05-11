const mongoose = require("mongoose");
// const AutoIncreament = require("mongoose-sequence")(mongoose)
// const productSchema = require("./productModel")


//quantity subdocument to calculate the total price based on every product & its quantity added
// const quantitySchema = new mongoose.Schema({
//     product: {
//         type: productSchema,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         default: 1
//     },
//     rate: {
//         type: Number,
//         required: true,
//     },
//     amount: {
//         type: Number,
//         required: true,
//     }
// })

// sub-document for bill auto increament

// const billSchema = new mongoose.Schema ({
//     bill: {
//         type: String,
//         required: true,
//     }
// })

// billSchema.plugin(AutoIncreament, {
//     inc_field: 'bill',
//     prefix: 'BILL-',
//     separator: '-',
//     start_seq: 1000
// })


const orderSchema = new mongoose.Schema({

    
    billNumber: {
        // type: billSchema,
        type: String,
        required: true,
    },
    custName: {
        type: String,
        required: true,
    },
    custAddress: {
        type: String,
        required: true,
    },
    custPhone: {
        type: Number,
        required: true,
    },
    items: [
        {   
            productName: {
                type: String,
                required: true,
            },
            productId: {
                // type: String,
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true
            },
            Sgst: {
                type: Number,
                required: true
            },
            Cgst: {
                type: Number,
                required: true
            }
        }
    ],
    // date: {
    //     type: Date,
    //     default: Date.now,
    //     required: true,
    // },
    
    // Sgst: {
    //     type: Number,
    //     requried: true,
    // },
    // Cgst: {
    //     type: Number,
    //     requried: true,
    // },
    // Igst: {
    //     type: Number,
    //     requried: true,
    // },
    // Ugst: {
    //     type: Number,
    //     requried: true,
    // },
    discount: {
        type: Number,
        requried: true,
        default: 0
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    netAmount: {
        type: Number,
        requried: true,
    },
    methodOfPayment: {
        type: String,
        requried: true,
        enum: ["Cash", "UPI", "Card", "Credit"],
        default: "Cash",
    },
    // to have quantity field for every products in the order page, 
    // that quantity will be multiplied to the respective product's price for total amount
    // the add product controller should also update the total quantity of the products
    // if the order is placed successfully
}, {timestamps:true})

module.exports = mongoose.model("Order", orderSchema)