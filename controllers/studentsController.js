import { validationResult } from "express-validator";
import Student from "../models/student.model.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import AppError from "../utils/appError.js";

const formatErrors = (errors) =>
  errors.array().map((error) => ({
    [`error of ${error.path}`]: error.msg,
  }));

const getAllStudents = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const students = await Student.find({}, { __v: 0 }).limit(limit).skip(skip);

  res.json({
    status: httpStatusText.Success,
    data: { students },
  });
});

const getStudentById = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      AppError.createError(formatErrors(errors), 400, httpStatusText.Fail)
    );
  }

  const student = await Student.findById(req.params.id ,{ __v: 0 });
  if (!student) {
    return next(
      AppError.createError("Student not found", 404, httpStatusText.Fail)
    );
  }

  res.json({
    status: httpStatusText.Success,
    data: { student },
  });
});

const createStudent = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      AppError.createError(formatErrors(errors), 404, httpStatusText.Fail)
    );
  }

  const newStudent = await Student.create(req.body);
  res.status(201).json({
    status: httpStatusText.Success,
    data: { student: newStudent },
  });
});

const updateStudent = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      AppError.createError(formatErrors(errors), 404, httpStatusText.Fail)
    );
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedStudent) {
    return next(
      AppError.createError("Student not found", 404, httpStatusText.Fail)
    );
  }

  res.json({
    status: httpStatusText.Success,
    data: { student: updatedStudent },
  });
});

const deleteStudent = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      AppError.createError(formatErrors(errors), 404, httpStatusText.Fail)
    );
  }

  const id = req.params.id;
  const result = await Student.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return next(
      AppError.createError("Student not found", 404, httpStatusText.Fail)
    );
  }

  res.json({
    status: httpStatusText.Success,
    message: "Student deleted",
  });
});

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
