import {
  controllerGetAllUser,
  controllerPostUser,
  controllerPutUser,
  controllerDeleteUser,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/", controllerGetAllUser);
router.post("/", controllerPostUser);
router.put("/:id", controllerPutUser);
router.delete("/:id", controllerDeleteUser);

export { router };
