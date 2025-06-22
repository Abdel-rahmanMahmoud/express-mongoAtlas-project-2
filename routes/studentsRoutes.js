import express from "express";
import studentsController from "../controllers/studentsController.js";
import {
  idParamValidation,
  createStudentValidation,
} from "../middleware/studentValidation.js";
import verifyToken from "../middleware/verifyToken.js";
import allowRoles from "../middleware/allowRoles.js";
import userRoles from "../utils/userRoles.js";

const route = express.Router();

// زي اختصار للمعرف الاي دي بدل ما تكتبها كل مرة
// route.param('id', idParamValidation);

route.get("/", verifyToken ,allowRoles(userRoles.ADMIN, userRoles.MANGER),studentsController.getAllStudents);

route
  .route("/:id")
  .get(idParamValidation, studentsController.getStudentById)
  .patch(idParamValidation, allowRoles(userRoles.ADMIN, userRoles.MANGER),studentsController.updateStudent)
  .delete(idParamValidation, verifyToken ,allowRoles(userRoles.ADMIN), studentsController.deleteStudent);

route.post(
  "/newStudent",
  createStudentValidation,
  studentsController.createStudent
);

export default route;
