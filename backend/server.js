const express = require("express");
const connectToDb = require("./config/db");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
require('dotenv').config();
const morgan = require('morgan')


const authRoute = require("./routes/authRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const categoryRoute = require("./routes/categoryRoute");

const app = express();
const PORT = 3300;

//middlewares
app.use(morgan('dev'))
app.use(express.json()); // parses json payload and makes them available in the req.body
app.use(express.static("public")); //serves static files from public directory
app.use(cookieParser());

//mongodb connection integration check
mongoose.connection.on("connected", ()=>{
    console.log("DB is connected!");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("DB is disconnected!");
})
//mongodb connection integration check

//routes - home page, when we send a get request to the home page, it triggers the callback function which sends the data inside the code
app.get("/", (req,res)=>{
    res.send("Hello, this is home!")
})



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your React app's URL
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use("/api/auth", authRoute);
app.use("/api/brands", brandRoute);
app.use("/api/cart", cartRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);

//server
app.listen(PORT, ()=>{
    connectToDb()
    console.log("Server is running on port: " + PORT)
})

