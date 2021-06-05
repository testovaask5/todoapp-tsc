import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { patch, post, remove } from "../../services/api";
import { Task, TaskDTO } from "../../types";

interface TasksState {
    status: string
    error: null | string | undefined
    tasks: TaskDTO[]
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async function (arg, thunkAPI) {
    const state = thunkAPI.getState() as RootState
    const response = await fetch('/api/tasks', { headers: {        
        'authorization': state.users.token
    }})
    if (response.ok) {
        const tasksFromServer: TaskDTO[] = await response.json();
        return tasksFromServer
    }
    else throw new Error('Response is not ok')
})

export const createTask = createAsyncThunk('tasks/createTask', async function(newTask: Task, thunkAPI) {
    const state = thunkAPI.getState() as RootState
    const response = await post('/api/task', newTask, state.users.token)
    if (response.ok) {
        const taskFromServer: TaskDTO = await response.json();
        return taskFromServer
    }
    else throw new Error('Response is not ok')
})

export const editTask = createAsyncThunk('tasks/editTask', async function(editedTask: TaskDTO, thunkAPI) {
    const state = thunkAPI.getState() as RootState
    const response = await patch('/api/task/' + editedTask.id, editedTask, state.users.token)
    if (response.ok) {
        return editedTask
    }
    else throw new Error('Response is not ok')
})

export const removeTask = createAsyncThunk('tasks/removeTask', async function(id: number, thunkAPI) {
    const state = thunkAPI.getState() as RootState
    const response = await remove('/api/task/' + id, state.users.token)
    if (response.ok) {
        return id
    }
    else throw new Error('Response is not ok')
})

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        status: 'idle',
        error: null,
        tasks: []
    } as TasksState,
    reducers: {
        resetTasks(state) {
            state.status = 'idle'
            state.error = null
            state.tasks = []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.tasks = state.tasks.concat(action.payload)
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload)
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            // state.tasks.push(action.payload)
            const newTasks = state.tasks.filter(task => {
                return task.id !== action.payload
            })
            state.tasks = newTasks
        })
        builder.addCase(editTask.fulfilled, (state, action) => {
            const editedTask = state.tasks.find(task => task.id === action.payload.id)
            if (editedTask) {
                editedTask.completed = action.payload.completed
                editedTask.text = action.payload.text
            }
        })
    }
})

export const { resetTasks } = tasksSlice.actions

export default tasksSlice.reducer

export const selectAllTasks = (state: RootState) => state.tasks.tasks

export const selectStatus = (state: RootState) => state.tasks.status

export const selectError = (state: RootState) => state.tasks.error