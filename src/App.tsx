import TasksList from './components/TasksList';
import NewTask from './components/NewTask';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsLogin, selectToken } from './features/users/usersSlice';
import Login from './components/Login';
import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { resetTasks } from './features/tasks/tasksSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1rem auto",
      minWidth: 300,
      maxWidth: 800
    },
    title: {
      flexGrow: 1,
    },
  })
)

function App() {
  const isLogin = useSelector(selectIsLogin)
  const classes = useStyles()
  const dispatch = useDispatch()

  if (isLogin) {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Tasks
            </Typography>
            <Button onClick={() => {
              dispatch(logout())
              dispatch(resetTasks())
            }} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <NewTask />
          <TasksList />
        </div>
      </div>
    )
  } else return <Login />;
}

export default App;