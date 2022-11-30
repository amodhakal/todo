import TaskModel from "../models/TaskModel";

export default (req, res) => {
  const userId = req.user;

  TaskModel.find({ userId })
    .then((foundTasks) => {
      return res.status(200).json(foundTasks);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
};
