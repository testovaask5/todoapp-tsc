import { Button, makeStyles, TextField } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import React, { useState } from "react"
import { Task, TaskDTO } from "../types"

const useStyles = makeStyles({
    root: {
        display: 'flex',
        gap: '.5rem',
        padding: '0 16px'
    },
    input: {
        flexGrow: 1
    }
})

type EditTaskProps = {
    editTask: (task: TaskDTO) => void
    task: TaskDTO
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditTask({ editTask, task, setOpen }: EditTaskProps) {
    const classes = useStyles()
    const [inputValue, setInputValue] = useState(task.text)
    const [checked, setChecked] = useState(task.completed)
    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()
        if (inputValue === '') return;
        editTask({
            id: task.id,
            text: inputValue,
            completed: checked
        })
        setOpen(false)
    }
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    return (
        <form onSubmit={submitHandler} className={classes.root}>
            <TextField className={classes.input} value={inputValue} onChange={inputHandler} label="Task" variant="outlined" />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        color="primary"
                    />
                }
                label="Completed"
            />
            <Button type="submit" variant="contained" color="primary">Save task</Button>
        </form>
    )
}