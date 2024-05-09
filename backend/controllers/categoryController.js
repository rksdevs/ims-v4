const Category = require("../models/categoryModel")

const addCategory = async (req, res) => {
    // console.log(req.user)

    try {

        //check if the user is an Admin
        const admin = req.user.isAdmin;
        if(!admin) {
            return res.status(400).send({message: "User must be an admin to add a brand!"})
        }
        const category = new Category({
            categoryName: "Sample Category",
            Sgst: 0,
            Cgst: 0
        })

    
        const newCategory = await category.save();
        res.status(200).json(newCategory)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
        
    }

}

const editCategory = async(req,res) => {
    const {categoryName, Sgst, Cgst} = req.body
    try {
        //check if the user is an Admin
        const admin = req.user.isAdmin;
        if(!admin) {
            return res.status(400).send({message: "User must be an admin to update a category!"})
        }

        const categoryToUpdate = await Category.findById(req.params.id);

        if (categoryToUpdate) {
            categoryToUpdate.categoryName = categoryName;
            categoryToUpdate.Sgst = Sgst;
            categoryToUpdate.Cgst = Cgst;
        }

        const updatedCategory = await categoryToUpdate.save()

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

const getSpecificCategory = async(req,res) => {
    try {
        const verifyAdmin = req.user.isAdmin;
      if(!verifyAdmin) {
          return res.status(400).json({message: "Unauthorized!"});
      }
        const projection = {categoryName: 1, Cgst: 1, Sgst: 1}
        const specificCategory = await Category.findById(req.params.id).select(projection);
        res.status(200).json(specificCategory)
        
    } catch (error) {
        console.log(error);
        return res.send(500).json(error);
        
    }
}

module.exports = {addCategory, editCategory, deleteCategory, getAllCategories, getSpecificCategory}