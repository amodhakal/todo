import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401);
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401);
      req.user = decoded.userId;
      next();
    });
  }
};
