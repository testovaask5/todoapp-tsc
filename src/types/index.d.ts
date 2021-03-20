export type Task = {
    text: string
    completed: boolean
    comment?: string
}

export type MapArrayToJSX<T> = {
    (el: T, index?: number): JSX.Element
} 