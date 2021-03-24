import { RequestHandler, Request } from "express";
import Task from "../models/task";

interface IRequest extends Request {
    params: {
        id: string
    }
}

export const GetAllTasks: RequestHandler = async (req, res) => {
    const tasks = await Task.findAll()
    res.send(tasks)
}

export const GetTaskById: RequestHandler = async ({params: {id: taskId}}: IRequest, res) => {
    const task = await Task.findByPk(taskId)
    if (task == null) return res.status(404).send('Can\'t find this task')
    res.send(task)
}