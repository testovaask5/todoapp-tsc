import './App.css';
import { Task } from './types';
import TasksList from './components/TasksList';
import NewTask from './components/NewTask';
import { makeStyles } from '@material-ui/core';
import { patch, post, useFetchTasks } from './services/api';

const useStyles = makeStyles({
  root: {
    margin: "1rem auto",
    minWidth: 300,
    maxWidth: 800
  }
})

function App() {
  const classes = useStyles()
  const [tasks, setTasks] = useFetchTasks('/api/tasks')

  const addTask = async (task: Task) => {
    const response = await post('/api/task', task)
    if (response.ok) {
      setTasks([...tasks, await response.json()])
    }
  }
  const toggleTask = async (task: Task) => {
    const response = await patch(`/api/task/${task.id}`, { completed: !task.completed })
    if (response.ok) {
      const newTasks = tasks.map((oldTask) => {
        if (oldTask.id !== task.id) return oldTask
        else return ({...task, completed: !task.completed})
      })
      setTasks(newTasks)
    }
  }
  return (
    <div className={classes.root}>
      <NewTask addTask={addTask} />
      <TasksList tasks={tasks} toggleTask={toggleTask} />
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