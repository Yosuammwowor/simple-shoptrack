import { controllerGetAllUser } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await controllerGetAllUser();

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export { router };
