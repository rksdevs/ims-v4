const Category = require("../models/categoryModel")

const addCategory = async (req, res) => {
    // console.log(req.user)

    try {

        const newCategory = new Category ({
            categoryName: req.body.categoryName,
            Sgst: req.body.Sgst,
            Cgst: req.body.Cgst
        })

        //check if the user is an Admin
        const admin = req.user.isAdmin;
        if(!admin) {
            return res.status(400).send({message: "User must be an admin to add a brand!"})
        }

        //check if the same brand exists
        const existingCategory = await Category.findOne({categoryName: req.body.categoryName});

        if(existingCategory) {
            return res.status(400).send({message: "Category Already Exists!"})
        }

    
        await newCategory.save();
        const {categoryName, Sgst, Cgst} = newCategory._doc;
        res.status(200).send({categoryName, Sgst, Cgst})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
        
    }

}

const editCategory = async(req,res) => {
    try {
        //check if the user is an Admin
        const admin = req.user.isAdmin;
        if(!admin) {
            return res.status(400).send({message: "User must be an admin to update a category!"})
        }

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.status(200).json(updatedCategory)
        
    } catch (error) {
        console.log(error);
        return res.send(500).json(error);
    }
}

const deleteCategory = async(req,res) =>{
    try {
     //check if the user is an Admin
     const admin = req.user.isAdmin;
     if(!admin) {
         return res.status(400).send({message: "User must be an admin to update a category!"})
     }
     
     await Category.findByIdAndDelete(req.params.id);
     res.status(200).json({msg: "Category Deleted!"})
        
    } catch (error) {
        console.log(error);
        return res.send(500).json(error)
        
    }
}

const getAllCategories = async(req,res) => {
    try {
        const verifyAdmin = req.user.isAdmin;
      if(!verifyAdmin) {
          return res.status(400).json({message: "Unauthorized!"});
      }
        const projection = {categoryName: 1, Cgst: 1, Sgst: 1}
        const allCategories = await Category.find().select(projection);
        res.status(200).json(allCategories)
        
    } catch (error) {
        console.log(error);
        return res.send(500).json(error);
        
    }
}

module.exports = {addCategory, editCategory, deleteCategory, getAllCategories}