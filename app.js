import { router as userRouter } from "./routes/userRoute.js";
import { router as categoryRouter } from "./routes/categoryRoute.js";
import { router as productRouter } from "./routes/productRoute.js";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Invalid, no route found",
  });
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
