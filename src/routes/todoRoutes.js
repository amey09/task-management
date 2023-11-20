import express from "express";
import {
  getTasks,
  searchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/", getTasks);
router.patch("/update", updateTask);
router.delete("/delete", deleteTask);
router.post("/search", searchTasks);

export default router;
