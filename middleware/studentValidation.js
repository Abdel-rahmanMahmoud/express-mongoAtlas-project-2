import { body, param } from "express-validator";

export const createStudentValidation = [
  body("name")
    .notEmpty()
    .withMessage("Student name is required")
    .isString()
    .withMessage("Student name must be a string"),

  body("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Grade must be a number between 0 and 100"),
];

export const idParamValidation = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId() // Check if the ID is a valid MongoDB ObjectId
    .withMessage("ID must be a valid MongoDB ID"),
];
