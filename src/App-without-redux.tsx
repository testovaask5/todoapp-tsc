import './App.css';
import { Task, TaskDTO } from './types';
import TasksList from './components/TasksList-without-redux';
import NewTask from './components/NewTask-without-redux';
import { makeStyles } from '@material-ui/core';
import { patch, post, remove, useFetchTasks } from './services/api';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    margin: "1rem auto",
    minWidth: 300,
    maxWidth: 800
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }
})

function App() {
  const classes = useStyles()

  const fetchResult = useFetchTasks('/api/tasks')
  const [tasks, setTasks] = fetchResult.result
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const error = fetchResult.error
  const loading = fetchResult.loading

  const errorHandler = (message: string, fallback = true) => {
    if (fallback) setTasks(tasks)
    setToggleError(true)
    setErrorMessage(message)
    setTimeout(() => setToggleError(false), 5000)
  }

  const addTask = async (task: Task) => {
    const response = await post('/api/task', task)
    if (response.ok) {
      setTasks([...tasks, await response.json()])
    }
  }

  const toggleTask = async (task: TaskDTO) => {
    const newTasks = tasks.map((oldTask) => {
      if (oldTask.id !== task.id) return oldTask
      else return ({ ...task, completed: !task.completed })
    })
    setTasks(newTasks)
    const response = await patch(`/api/task/${task.id}`, { completed: !task.completed })
    if (!response.ok) {
      errorHandler("Can't toggle on the server")
    }
  }

  const editTask = async (task: TaskDTO) => {
    const newTasks = tasks.map((oldTask) => {
      if (oldTask.id !== task.id) return oldTask
      else return ({ ...task })
    })
    setTasks(newTasks)
    const response = await patch(`/api/task/${task.id}`, task)
    if (!response.ok) {
      errorHandler("Can't edit this task on the server")
    }
  }

  const removeTask = async (id: number) => {
    if (!window.confirm('Are you sure?')) return;
    const newTasks = tasks.filter(task => id !== task.id)
    setTasks(newTasks)
    const response = await remove(`/api/task/${id}`)
    if (!response.ok && response.status !== 404) {
      errorHandler("Can't remove task on the server")
    } else if (response.status === 404) {
      errorHandler("Can't find this task on the server", false)
    }
  }

  if (error) return <Alert severity="error">{error.message}</Alert>
  if (loading) return <CircularProgress className={classes.loader} />

  return (
    <div className={classes.root}>
      {toggleError && <Alert severity="error">{errorMessage}</Alert>}
      <NewTask addTask={addTask} />
      <TasksList tasks={tasks}
        toggleTask={toggleTask}
        editTask={editTask}
        removeTask={removeTask} />
    </div>
  );
}

export default App;


// let test: string | number
// test = 'World'
// test = 4

// type Stringfunc = (str: string) => string

// const capitalize: Stringfunc = (str) => {
//   return str.toUpperCase()
// }

// console.log(capitalize('Hello'))