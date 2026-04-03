import {
  controllerGetAllCategories,
  controllerGetCategory,
  controllerPostCategory,
  controllerPutCategory,
  controllerDeleteCategory,
} from "../controllers/categoryController.js";
import express from "express";

const router = express.Router();

// GET all categories
router.get("/", controllerGetAllCategories);

// GET specific category
router.get("/:id", controllerGetCategory);

// POST create new category
router.post("/", controllerPostCategory);

// PUT update category
router.put("/:id", controllerPutCategory);

// DELETE specific category
router.delete("/:id", controllerDeleteCategory);

export { router };
