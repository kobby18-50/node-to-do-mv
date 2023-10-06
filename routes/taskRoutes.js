
import express from 'express'
import { createTask, getTask, getAllTasks, deleteTask, editTask} from '../controllers/taskController.js'

const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)

router.route('/:id').get(getTask).delete(deleteTask).patch(editTask)

export default router