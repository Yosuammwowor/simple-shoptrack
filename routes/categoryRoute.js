import {
  controllerGetAllCategories,
  controllerGetCategory,
  controllerPostCategory,
  controllerPutCategory,
  controllerDeleteCategory,
} from "../controllers/categoryController.js";
import express from "express";

const router = express.Router();

router.get("/", controllerGetAllCategories);
router.get("/:id", controllerGetCategory);
router.post("/", controllerPostCategory);
router.put("/:id", controllerPutCategory);
router.delete("/:id", controllerDeleteCategory);

export { router };
