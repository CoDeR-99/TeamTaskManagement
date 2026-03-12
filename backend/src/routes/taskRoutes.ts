import express, {Request, Response, NextFunction} from 'express'
import {
    getTasks,
    createTask,
    deleteTask
} from '../controllers/taskController'

const taskRoute = express.Router()

const verifyDeleteHeader = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["x-delete-auth"];
    if(header != 'delete-task'){
        return res.status(403).json({
            message: 'Unauthorized delete request.'
        })
    }
    next()
}

taskRoute.get('/', getTasks)
taskRoute.post('/', createTask)
taskRoute.delete('/:id', verifyDeleteHeader, deleteTask)

export default taskRoute