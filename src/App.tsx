import TasksList from './components/TasksList';
import NewTask from './components/NewTask';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: "1rem auto",
    minWidth: 300,
    maxWidth: 800
  }
})

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NewTask />
      <TasksList />
    </div>
  );
}

export default App;