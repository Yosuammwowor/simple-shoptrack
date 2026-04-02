import {
  controllerGetAllUser,
  controllerPostUser,
  controllerPutUser,
  controllerDeleteUser,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await controllerGetAllUser(res);
  return result;
});

router.post("/", async (req, res) => {
  const result = await controllerPostUser(req.body, res);
  return result;
});

router.put("/:id", async (req, res) => {
  const result = await controllerPutUser(req.params.id, req.body, res);
  return result;
});

router.delete("/:id", async (req, res) => {
  const result = await controllerDeleteUser(req.params.id, res);
  return result;
});

export { router };
