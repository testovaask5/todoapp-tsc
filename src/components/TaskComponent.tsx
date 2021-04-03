import { Button, ListItemText, makeStyles } from "@material-ui/core"
import ListItem from "@material-ui/core/ListItem"
import React from "react"
import { Task } from "../types"

const useStyles = makeStyles({
    root: {
        gap: '.5rem'
    }
})

type TaskProps = {
    task: Task
    toggleTask: (task: Task) => void
}
export default function TaskComponent({ task, toggleTask }: TaskProps) {
    const classes = useStyles()
    return (
        <ListItem button className={classes.root}>
            <ListItemText onClick={() => toggleTask(task)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </ListItemText>
            <Button variant="contained" color="primary">Edit</Button>
            <Button variant="contained" color="secondary">Remove</Button>
        </ListItem>
    )
}