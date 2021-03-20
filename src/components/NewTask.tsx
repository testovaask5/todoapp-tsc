import React, { useState } from "react"
import { Task } from "../types"

type NewTaskProps = {
    addTask: (task: Task) => void
}

export default function NewTask({addTask}: NewTaskProps) {
    const [inputValue, setInputValue] = useState('')
    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()
        if (inputValue === '') return;
        addTask({
            text: inputValue,
            completed: false
        })
        setInputValue('')
    }
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    return (
        <form onSubmit={submitHandler}>
            <input value={inputValue} onChange={inputHandler} type="text" />
            <button type="submit">Add task</button>
        </form>
    )
}