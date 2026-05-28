import { Router } from "express";
import {createEmployee, deleteEmployee, getEmployees, updateEmployee} from '../controllers/employeeController.js'  

const employeeRouter = Router();


employeeRouter.get("/", getEmployees)
employeeRouter.post("/", createEmployee)
employeeRouter.put("/", updateEmployee)
employeeRouter.delete("/", deleteEmployee)

//07:26