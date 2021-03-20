import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Task } from './types';
import TasksList from './components/TasksList';
import NewTask from './components/NewTask';

const initTasks: Array<Task> = [{
  text: "task 1",
  completed: true
}, {
  text: "task 2",
  completed: false,
  comment: "Some comment"
}]

function App() {
  const [tasks, setTasks] = useState<Task[]>(initTasks)
  const addTask = (task: Task) => setTasks([...tasks, task])
  return (
    <div>
      <NewTask addTask={addTask} />
      <TasksList tasks={tasks} />
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