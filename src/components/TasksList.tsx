import List from "@material-ui/core/List"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks, selectAllTasks, selectError, selectStatus } from "../features/tasks/tasksSlice"
import { TaskDTO, MapArrayToJSX } from "../types"
import TaskComponent from "./TaskComponent"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    loader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    }
  })

export default function TasksList() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const tasks = useSelector(selectAllTasks)
    const tasksStatus = useSelector(selectStatus)
    const error = useSelector(selectError)

    useEffect(() => {
        if (tasksStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [tasksStatus, dispatch])

    const mapCallback: MapArrayToJSX<TaskDTO> = (task) => {
        return <TaskComponent
            key={task.id}
            task={task}
        />
    }
    if (tasksStatus === 'loading') {
        return <CircularProgress className={classes.loader} />
    } else if (tasksStatus === 'succeeded') {
        return (
            <List component="ul">
                {tasks.map(mapCallback)}
            </List>
        )
    } else if (tasksStatus === 'failed') {
        return <Alert severity="error">{error}</Alert>
    } else {
        return null
    }
}