import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/users/usersSlice";
import { Task, TaskDTO } from "../types";

type postTaskDTO = Task

type patchTaskDTO = {
    text?: string
    completed: boolean
}

export type userInfoDTO = {
    name: string
    password: string
}

export function useFetchTasks(url: string) {
    const [tasks, setTasks] = useState<TaskDTO[]>([])       
    const [error, setError] = useState<Error | null>(null)       
    const [loading, setLoading] = useState(true)
    const token = useSelector(selectToken)  

    useEffect(() => {
        fetch(url, { headers: {
            'authorization': token
        }}).then(response => {            
            if (response.ok) return response.json();
            else throw new Error('Response is not ok')
        }).then((tasksFromServer: TaskDTO[]) => {
            setTasks(tasksFromServer)
            setLoading(false)
        }).catch((err: Error) => {
            console.error(err)
            setError(err)
        })
    }, [])

    const result: [TaskDTO[], typeof setTasks] = [tasks, setTasks]
    return {loading, error, result}
}

export function post(url: string, body: postTaskDTO | userInfoDTO) {
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

export function remove(url: string) {
    return fetch(url, {
        method: 'DELETE'
    })
}