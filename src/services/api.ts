import { useEffect, useState } from "react";
import { Task } from "../types";

type postTaskDTO = Task

type patchTaskDTO = {
    text?: string
    completed: boolean
}

export function useFetchTasks(url: string) {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetch(url).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Response is not ok')
        }).then((tasksFromServer: Task[]) => {
            setTasks(tasksFromServer)
        }).catch(error => console.error(error))
    }, [])

    const result: [Task[], typeof setTasks] = [tasks, setTasks]
    return result
}

export function post(url: string, body: postTaskDTO) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export function patch(url: string, body: patchTaskDTO) {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}