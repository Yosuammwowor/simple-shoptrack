import { router as userRouter } from "./routes/userRoute.js";
import express from "express";

const app = express();

app.use(express.json());
app.use("/users", userRouter);

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
