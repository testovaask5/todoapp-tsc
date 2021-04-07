import { Button, ListItemText, makeStyles } from "@material-ui/core"
import ListItem from "@material-ui/core/ListItem"
import React from "react"
import { TaskDTO } from "../types"

const useStyles = makeStyles({
    root: {
        gap: '.5rem'
    }
})

type TaskProps = {
    task: TaskDTO
    toggleTask: (task: TaskDTO) => void
    editTask: (task: TaskDTO) => void
    removeTask: (id: number) => void
}
export default function TaskComponent({ task, toggleTask, editTask, removeTask }: TaskProps) {
    const classes = useStyles()
    return (
        <ListItem button className={classes.root}>
            <ListItemText onClick={() => toggleTask(task)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </ListItemText>
            <Button variant="contained" color="primary">Edit</Button>
            <Button variant="contained" color="secondary" 
                onClick={() => removeTask(task.id)}>
                    Remove
            </Button>
        </ListItem>
    )
}