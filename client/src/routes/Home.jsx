import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import Task from "../components/Task";

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Form Inputs
  const [formTask, setFormTask] = useState("");

  // Verify Token
  useEffect(() => {
    const token = cookie.get("token");
    if (!token) {
      navigate("/login");
    }
  });

  // Add Tasks
  function addTask() {
    axios
      .post("/api/addTask", {
        task: formTask,
        token: cookie.get("token"),
      })
      .then(() => {
        setFormTask("");
      });
  }

  // Get Tasks
  useEffect(() => {
    axios
      .post("/api/getTasks", { token: cookie.get("token") })
      .then((res) => setTasks(res.data));
  });

  return (
    <>
      <button onClick={() => cookie.remove("token")}>Logout</button>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add task"
          value={formTask}
          onChange={(e) => setFormTask(e.target.value)}
        />
        <button type="submit">Add!</button>
      </form>

      {tasks.map((task) => (
        <Task props={task} />
      ))}
    </>
  );
}
