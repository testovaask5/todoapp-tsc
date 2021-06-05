import { Button, ListItemText, makeStyles } from "@material-ui/core"
import ListItem from "@material-ui/core/ListItem"
import React from "react"
import { useDispatch } from "react-redux"
import { editTask, removeTask } from "../features/tasks/tasksSlice"
import { TaskDTO } from "../types"
import EditTask from "./EditTask"
import ModalUI from "./Modal"

const useStyles = makeStyles({
  root: {
    gap: '.5rem'
  }
})

type TaskProps = {
  task: TaskDTO
}
export default function TaskComponent({ task }: TaskProps) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  return (
    <>
      <ListItem button className={classes.root}>
        <ListItemText onClick={() => {
          dispatch(editTask({ ...task, completed: !task.completed }))
        }} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </ListItemText>
        <Button variant="contained" color="primary"
          onClick={() => setOpen(true)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary"
          onClick={() => { dispatch(removeTask(task.id)) }}>
          Remove
        </Button>
      </ListItem>
      {open && <ModalUI open={open} setOpen={setOpen} >
        <EditTask editTask={(editedTask) => { dispatch(editTask(editedTask)) }} task={task} setOpen={setOpen} />
      </ModalUI>}
    </>
  )
}