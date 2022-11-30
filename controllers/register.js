import generateToken from "../middleware/auth/generate";
import UserModel from "../models/UserModel";

export default (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((duplicateUser) => {
    if (duplicateUser) {
      res.send({ error: "User already exists" });
    } else {
      UserModel.create({ email, password })
        .then((newUser) => {
          const token = generateToken(newUser._id);
          return res.status(201).json({ token });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500);
        });
    }
  });
};
