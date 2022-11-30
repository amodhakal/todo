import generateToken from "../middleware/auth/generate";
import UserModel from "../models/UserModel";

export default (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email, password })
    .then((foundUser) => {
        if (!foundUser) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = generateToken(foundUser);
        return res.status(200).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
};
