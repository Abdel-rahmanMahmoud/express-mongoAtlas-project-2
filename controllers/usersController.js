import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateJWT from "../utils/genrateJWT.js";

const formatErrors = (errors) =>
  errors.array().map((error) => ({
    [`error of ${error.path}`]: error.msg,
  }));

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: 0, password: 0 })
    .limit(limit)
    .skip(skip);

  res.json({
    status: httpStatusText.Success,
    data: { users },
  });
});

const register = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      AppError.createError(formatErrors(errors), 400, httpStatusText.Fail)
    );
  }

  const { firstName, lastName, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      AppError.createError("Email already exists", 400, httpStatusText.Fail)
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // في حال بدي احفظ التوكن بقاعدة البينات ولكن ليست الممارسة الصحيحة
  // const newUser = await new User({   firstName, lastName,email, password: hashedPassword });

  // // Generate JWT token
  // const token = generateJWT({  email:newUser.email , userId: newUser._id });
  // newUser.token = token;
  // await newUser.save();

  // في حال بدي احفظ التوكن في الذاكرة فقط
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file ? req.file.filename : './uploads/profile.png',
  });

  const token = generateJWT({
    email: newUser.email,
    userId: newUser._id,
    role: newUser.role,
  });

  res.status(201).json({
    status: httpStatusText.Success,
    data: {
      user: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        avatar: newUser.avatar,
      },
      token,
    },
  });
});

// Login user
const login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      AppError.createError(formatErrors(errors), 400, httpStatusText.Fail)
    );
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { _id, firstName, lastName, role, avatar } = user;
  if (!user) {
    return next(
      AppError.createError("Invalid email ", 401, httpStatusText.Fail)
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(
      AppError.createError("Invalid  password", 401, httpStatusText.Fail)
    );
  }

  const token = generateJWT({
    email: user.email,
    userId: user._id,
    role: user.role,
  });

  res.json({
    status: httpStatusText.Success,
    data: {
      token,
      user: { id: _id, firstName, lastName, role, avatar },
    },
  });
});

export default {
  getAllUsers,
  register,
  login,
};
