import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7 days" });
};
