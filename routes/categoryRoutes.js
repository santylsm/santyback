import express from "express";
import { createCategoryController,
    categoryControlller,
    deleteCategoryCOntroller,
    singleCategoryController,
    updateCategoryController,
    } from "../controllers/categoryController.js";

const router = express.Router()

//routes 
//create category
router.post('/create-category',createCategoryController)

//update category
router.put(
    "/update-category/:id",
    updateCategoryController
  );
  
  //getALl category
  router.get("/get-category", categoryControlller);
  
  //single category
  router.get("/single-category/:slug", singleCategoryController);
  
  //delete category
  router.delete(
    "/delete-category/:id",
    deleteCategoryCOntroller
  );

export default router
