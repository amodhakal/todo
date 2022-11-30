import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import validate from "./middleware/auth/validate.js";
import login from "./controllers/login.js";
import register from "./controllers/register.js";
import getTasks from "./controllers/getTasks.js";
import addTask from "./controllers/addTask.js";
import deleteTask from "./controllers/deleteTask.js";
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.get("/api", (req, res) => res.send("API Running!"));

app.post("/api/login", login);
app.post("/api/register", register);

app.get("/api/getTasks", validate, getTasks);
app.post("/api/addTask", validate, addTask);
app.post("/api/deleteTask", validate, deleteTask);

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Production
    if (process.env.NODE_ENV === "PRODUCTION") {
      app.use(express.static(path.join(path.resolve(), "client/build")));
      app.get("*", (req, res) =>
        res.sendFile(path.join(path.resolve(), "client/build/index.html"))
      );
    }

    // Deployment
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log("Server Running"));
  })
  .catch((err) => console.error(err));
