import {
  controllerGetAllUser,
  controllerPostUser,
  controllerPutUser,
} from "../controllers/userController.js";
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

router.post("/", async (req, res) => {
  const result = await controllerPostUser(req.body, res);
  return result;
});

router.put("/:id", async (req, res) => {
  const result = await controllerPutUser(req.params.id, req.body, res);
  return result;
});

export { router };
