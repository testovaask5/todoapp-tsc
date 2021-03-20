import { Task, MapArrayToJSX } from "../types"

type TasksListProps = {
    tasks: Task[]
}
export default function TasksList ({tasks}: TasksListProps) {
    const mapCallback: MapArrayToJSX<Task> = (task, index) => {
        return <li key={index} 
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
        </li>
    }
    return (
        <ul>
            {tasks.map(mapCallback)}
        </ul>
    )
}