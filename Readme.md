Node.js CRUD Task Management API
This repository contains a simple Node.js CRUD API for task management. The API allows users to perform basic operations such as creating, reading, updating, and deleting tasks. The tasks are stored in a MongoDB database.

You can test the app via postman refer to API endpoints. Append the endpoint to vercel's baseURL (deployment link)

Prerequisites
Before running the application, make sure you have the following installed:

Node.js
MongoDB
npm or yarn

Add following .env variables
PORT=5000
MONGO_URI=your_mongodb_connection_string

To initialize the server
npm run server

API Endpoints
GET /api/tasks
Retrieve a list of tasks.

POST /api/tasks/create
Create a new task. Requires a JSON payload with title, description, and status.

PATCH /api/tasks/update
Update an existing task. Requires a JSON payload with taskId, and optional fields title, description, and status.

DELETE /api/tasks/delete
Delete an existing task. Requires a JSON payload with taskId.

POST /api/tasks/search
Search for tasks based on a query. Requires a JSON payload with query.

Data Model
Task
title (String, required): The title of the task.
description (String, required): The description of the task.
status (String, required, enum: ["ToDo", "InProgress", "Done"]): The status of the task.
createdAt (Timestamp): The timestamp when the task was created.
updatedAt (Timestamp): The timestamp when the task was last updated.
Error Handling
The API handles common errors such as 404 Not Found and 500 Internal Server Error. The error messages are returned in JSON format.

Middlewares
notFound
Handles 404 errors by sending a JSON response with a "Not Found" message.

errorHandler
Handles general errors and sends an appropriate JSON response with error details.

Controllers
createTask
Create a new task. Requires title, description, and status in the request body.

getTasks
Retrieve a list of tasks. Supports pagination with optional page and limit parameters.

searchTasks
Search for tasks based on a query. Requires query in the request body.

deleteTask
Delete an existing task. Requires taskId in the request body.

updateTask
Update an existing task. Requires taskId and optional fields (title, description, status) in the request body.

Database Connection
connectDB
Connect to the MongoDB database. The connection string is read from the .env file.