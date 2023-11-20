import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import connectDB from "./config/db.js";
import express from "express";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
