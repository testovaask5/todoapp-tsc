import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Task } from './types';
import TasksList from './components/TasksList';
import NewTask from './components/NewTask';

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  
  useEffect(() => {
    fetch('/api/tasks').then(response => {
      if (response.ok) return response.json();
      else throw new Error('Response is not ok')
    }).then((tasksFromServer: Task[]) => {
      setTasks(tasksFromServer)
    }).catch(error => console.error(error))
  }, [])

  const addTask = async (task: Task) => {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    if (response.ok) {
      setTasks([...tasks, await response.json()])
    }
  }
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