import express from 'express'
import { GetAllTasks, GetTaskById } from './controllers/task.controller'

const app = express()

app.get('/api/tasks', GetAllTasks)
app.get('/api/tasks/:id', GetTaskById)

app.listen(4000, () => {
    console.log('Server: http://localhost:4000')
})