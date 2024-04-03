import express from 'express';
import { allTask, deleteTask, editTask, newTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middleware/auth.js';

const router=express.Router();

router.post("/newtask",isAuthenticated,newTask)
router.get("/all",isAuthenticated,allTask)
router.put("/edit/:id",isAuthenticated,editTask)
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router