import supplierLGModel from "../models/supplierLGModel.js";
import fs from "fs";
import slugify from "slugify";

export const createSupplierLGController = async (req, res) => {
  try {
    const { name, address, phonenumber1, phonenumber2, email1 , email2 } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !address:
        return res.status(500).send({ error: "Address is Required" });
      case !phonenumber1:
        return res.status(500).send({ error: "Phonenumber1 is Required" });
      case !phonenumber2:
        return res.status(500).send({ error: "Phonenumber2 is Required" });
      case !email1:
        return res.status(500).send({ error: "Email1 is Required" });
      case !email2:
        return res.status(500).send({ error: "Email2 is Required" });  
    }

    const existingUser = await testModel.findOne({name})
        console.log(existingUser)
           
        //existing user
        
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'already register'
            })
        }

        //save
        const supplier = await new supplierLGModel({
            name,address,phonenumber1, phonenumber2, email1, email2
        }).save()

        res.status(201).send({
            success:true,
            message:'supplier register successfully',
            supplier,
        }).save

       
    //const suppliers = new supplierLGModel({ ...req.fields, slug: slugify(name) });
    /*if (photo) {
      suppliers.photo.data = fs.readFileSync(photo.path);
      suppliers.photo.contentType = photo.type;
    }*/
    /*await suppliers.save();
    res.status(201).send({
      success: true,
      message: "Supplier Created Successfully",
      suppliers,
    });*/

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating supplier",
    });
  }
};

//get all suppliers
export const getSupplierLGController = async (req, res) => {
  try {
    const suppliers = await supplierLGModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: suppliers.length,
      message: "ALlsuppliers ",
      suppliers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting suppliers",
      error: error.message,
    });
  }
};
// get single supplier
export const getSingleSupplierLGController = async (req, res) => {
  try {
    const supplier = await supplierLGModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single supplier Fetched",
      supplier,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getting single supplier",
      error,
    });
  }
};

// get photo
/*
export const productPhotoController = async (req, res) => {
  try {
    const product = await productLGModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
*/

//delete controller
export const deleteSupplierLGController = async (req, res) => {
  try {
    await supplierLGModel.findByIdAndDelete(req.params.pid)//.select("-photo");
    res.status(200).send({
      success: true,
      message: "supplier Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting supplier",
      error,
    });
  }
};

//upate supplier
export const updateSupplierLGController = async (req, res) => {
  try {
    const { name, address, phonenumber1, phonenumber2, email1 , email2 } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !address:
          return res.status(500).send({ error: "Address is Required" });
        case !phonenumber1:
          return res.status(500).send({ error: "Phonenumber1 is Required" });
        case !phonenumber2:
          return res.status(500).send({ error: "Phonenumber2 is Required" });
        case !email1:
          return res.status(500).send({ error: "Email1 is Required" });
        case !email2:
          return res.status(500).send({ error: "Email2 is Required" });  
      }

    const suppliers = await supplierLGModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
        suppliers.photo.data = fs.readFileSync(photo.path);
        suppliers.photo.contentType = photo.type;
    }
    await suppliers.save();
    res.status(201).send({
      success: true,
      message: "supplier Updated Successfully",
      suppliers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte supplier",
    });
  }
};