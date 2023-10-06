import Task from "../models/Task.js"
import {StatusCodes} from 'http-status-codes'
import NotFoundError from '../errors/not-found.js'
import BadRequestError from '../errors/bad-request.js'


const getTask = async (req,res) => {
    const { userId } = req.user
    const { id:todoId } = req.params

    const todo = await Task.findOne({createdBy : userId, _id : todoId})

    if(!todo){
        throw new NotFoundError('No task found matching the id' + todoId)
    }

    res.status(StatusCodes.OK).json({todo})
}

const getAllTasks = async (req,res) => {
    const { userId } = req.user
    const todo = await Task.find({createdBy : userId})
    res.status(StatusCodes.OK).json({todo})
}

const createTask = async (req,res) => {
    const { userId } = req.user

   req.body.createdBy = userId

   const todo = await Task.create(req.body)

    res.status(StatusCodes.OK).json({todo})
}

const editTask = async (req,res) => {
    const { userId} = req.user
    const { id : todoId } = req.params
    const { title, description } = req.body

    if(!title || !description){
        throw new BadRequestError('Some values are empty')
    }
    
    const todo = await Task.findByIdAndUpdate({createdBy : userId, _id : todoId}, req.body, {runValidators : true, new : true})

    if(!todo){
        throw new NotFoundError('No task with id ' + todoId)
    }

    res.status(StatusCodes.ACCEPTED).json({todo})
}

const deleteTask = async (req,res) => {
    const { userId } = req.user
    const { id : todoId } = req.params

    const todo = await Task.findOneAndDelete({createdBy : userId, _id : todoId })

    if(!todo){
        throw new NotFoundError('No todo with id ' + todoId)
    }
    
    res.status(StatusCodes.OK).send('Task deleted')
}

export {getTask, getAllTasks, createTask, editTask,deleteTask}
