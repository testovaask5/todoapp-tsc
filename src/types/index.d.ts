export type Task = {
    text: string
    completed: boolean
}

export type TaskDTO = Task & {
    id: number
}

export type MapArrayToJSX<T> = {
    (el: T, index?: number): JSX.Element
} 