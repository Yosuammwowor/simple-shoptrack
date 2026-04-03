import {
  controllerGetAllUser,
  controllerPostUser,
  controllerPutUser,
  controllerDeleteUser,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

// GET all users
router.get("/", controllerGetAllUser);

// POST create new user
router.post("/", controllerPostUser);

// PUT update user
router.put("/:id", controllerPutUser);

// DELETE specific user
router.delete("/:id", controllerDeleteUser);

export { router };
