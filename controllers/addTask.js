import TaskModel from "../models/TaskModel";

export default (req, res) => {
  const userId = req.user;
  const task = req.body.task;

  TaskModel.create({ userId, task })
    .then(() => res.status(201).send("Successfully Added"))
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
};
