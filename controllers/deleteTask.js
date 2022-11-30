import TaskModel from "../models/TaskModel";

export default (req, res) => {
  const userId = req.user;
  const taskId = req.body.taskId;

  TaskModel.deleteOne({ userId, _id: taskId })
    .then(() => res.status(200).send("Successfully Deleted"))
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
};
