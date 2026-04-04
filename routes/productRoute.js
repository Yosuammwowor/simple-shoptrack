import {
  controllerGetAllProducts,
  controllerGetProduct,
  controllerPostProduct,
  controllerPutProduct,
  controllerDeleteProduct,
} from "../controllers/productController.js";
import express from "express";

const router = express.Router();

// GET all products
router.get("/", controllerGetAllProducts);

// GET specific product
router.get("/:id", controllerGetProduct);

// POST create new product
router.post("/", controllerPostProduct);

// PUT update product
router.put("/:id", controllerPutProduct);

// DELETE specific product
router.delete("/:id", controllerDeleteProduct);

export { router };
