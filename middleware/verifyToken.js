import jwt from "jsonwebtoken";
import { httpStatusText } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeaders) {
    return res.status(401).json({
      status: httpStatusText.Fail,
      code: 401,
      message: "Unauthorized",
    });
  }
  const token = authHeaders.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (error) {
    return next(
      appError.createError("Invalid token", 401, httpStatusText.Fail)
    );
  }
};
export default verifyToken;
