import asyncHandler from "express-async-handler";
import Task from "../models/todoModel.js";

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTask = await Task.create({
      title,
      description,
      status,
    });
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task Create Successfully", Task: newTask });
  } catch (error) {
    throw new Error({ message: "Failed to create a task" });
  }
});

const getTasks = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body;

    if (page && limit) {
      const tasks = await Task.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (tasks.length > 0) {
        const availableTasks = tasks.filter((task) => task.status === "ToDo");
        const completedTasks = tasks.filter((task) => task.status === "Done");

        res
          .status(200)
          .json({ message: "Tasks found!", availableTasks, completedTasks });
      } else {
        res.status(404).json({ message: "There are zero tasks as of now." });
      }
    } else {
      res.status(400).json({ message: "Invalid page or limit parameters." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

const searchTasks = asyncHandler(async (req, res) => {
  const { query } = req.body;
  try {
    if (query) {
      const result = await Task.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });
      res
        .status(200)
        .json({
          message: "Something matched your search query",
          SearchResults: result,
        });
    } else {
      res.status(404).json({
        message: "Nothing found as per your search value",
      });
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;

  try {
    if (taskId) {
      await Task.findByIdAndDelete(taskId);
      res.status(401).json({ message: "Task Deleted Successfully" });
    } else {
      res.status(401).json({ message: "Task not found" });
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId, title, description, status } = req.body;

  try {
    if (title || description || status) {
      const updateFields = {};

      if (title) updateFields.title = title;
      if (description) updateFields.description = description;
      if (status) updateFields.status = status;

      // Update the task in the database
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: updateFields },
        { new: true }
      );

      if (updatedTask) {
        res.status(200).json({ message: "Task update successfuly", updatedTask: updatedTask});
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } else {
      res.status(400).json({ message: "No valid fields provided for update" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export { createTask, searchTasks, getTasks, deleteTask, updateTask };
