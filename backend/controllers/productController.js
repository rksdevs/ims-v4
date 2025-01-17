const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
// const Category = require("../models/categoryModel");
// const Attributes = require("../models/attributeModel");

//add product

const addProduct = async(req, res) => {
    try {
       
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        }

        const newProduct = new Product({
            productName: "Sample Product",
            image: '/image/Sample.jpg',
            size: "0",
            quantity: 0,
            price: 0,
            description: "Describe Product...",
            brand: "657b1f20521b35e921690088",
            category: "657749a7ca0a55e2c007937b",
            color: "Color"
        })

        const createdProduct = await newProduct.save();
        res.status(200).json(createdProduct);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
}

//delete product

const deleteProduct = async(req,res) => {
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        } 
        
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Product deleted!"})

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
}

//update product

const editProduct = async(req,res) => {
    const {productName, description, image, quantity, price, size, color, brand, category} = req.body;
    try {
        //verify admin
        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        } 
        
        const productToUpdate = await Product.findById(req.params.id);

        if (productToUpdate) {
            productToUpdate.productName = productName;
            productToUpdate.description = description;
            productToUpdate.image = image;
            productToUpdate.quantity = quantity;
            productToUpdate.price = price;
            productToUpdate.size = size;
            productToUpdate.color = color;
            productToUpdate.brand = brand;
            productToUpdate.category = category;
        }

        const updatedProduct = await productToUpdate.save();

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
}

//get one product

const getSpecificProduct = async(req,res) => {
    try {

        const verifyAdmin = req.user.isAdmin;
        if(!verifyAdmin) {
            return res.status(400).json({message: "Unauthorized!"});
        } 

        let product = await Product.findById(req.params.id);
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error); 
    }
}

//get all products

const getAllProducts = async(req,res) => {
    try {
      //verify admin
      const verifyAdmin = req.user.isAdmin;
      if(!verifyAdmin) {
          return res.status(400).json({message: "Unauthorized!"});
      };
      
    //   const allProducts = await Product.find();
    //   res.status(200).json(allProducts);
    
    let products;
    const qNewest = req.query.newest;
    const qCategory = req.query.category;
    const qBrand = req.query.brand;

    if(qNewest) {
        products = await Product.find().sort({createdAt: -1}).limit(1).populate('brand category');
    } else if (qCategory) {
        products = await Product.find({
            category: {
                $in: [qCategory],
            }
        }).populate('brand category')
    } else if (qBrand) {
        products = await Product.find({qBrand}).populate('brand category')
    } else {
        products = await Product.find().select("productName _id image quantity price size color brand category").populate('brand category');
    }


    const modifiedProduct = products.map((product)=>({
        ...product._doc,
        id: product._id
    }))

    res.status(200).json(modifiedProduct);
     
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
}

module.exports = {addProduct, deleteProduct, editProduct, getAllProducts, getSpecificProduct}