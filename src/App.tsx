import TasksList from './components/TasksList';
import NewTask from './components/NewTask';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectToken } from './features/users/usersSlice';
import Login from './components/Login';

const useStyles = makeStyles({
  root: {
    margin: "1rem auto",
    minWidth: 300,
    maxWidth: 800
  }
})

function App() {
  const token = useSelector(selectToken)
  const classes = useStyles()

  if (token === '') {
    return <Login />
  } else return (
    <div className={classes.root}>
      <NewTask />
      <TasksList />
    </div>
  );
}

export default App;