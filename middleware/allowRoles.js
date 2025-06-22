import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.currentUser.role)) {
      return next(
        appError.createError("This role is not authorized", 401, httpStatusText.Fail)
      );
    }
    next();
  };
};

export default allowRoles;
