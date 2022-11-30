import generateToken from "../middleware/auth/generate";
import UserModel from "../models/UserModel";

export default (req, res) => {
  const { email, password } = req.body;

  UserModel.create({ email, password })
    .then((newUser) => {
        const token = generateToken(newUser);
        return res.status(201).json({ token });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500);
    });
};
