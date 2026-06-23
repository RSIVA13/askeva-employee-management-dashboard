import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, getEmployees)
  .post(isAuthenticated, createEmployee);

router
  .route("/:id")
  .put(isAuthenticated, updateEmployee)
  .delete(isAuthenticated, deleteEmployee);

export default router;