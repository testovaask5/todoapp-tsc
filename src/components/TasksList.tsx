import List from "@material-ui/core/List"
import { Task, MapArrayToJSX } from "../types"
import TaskComponent from "./TaskComponent"

type TasksListProps = {
    tasks: Task[],
    toggleTask: (task: Task) => void
}
export default function TasksList ({tasks, toggleTask}: TasksListProps) {
    const mapCallback: MapArrayToJSX<Task> = (task) => {
        return <TaskComponent key={task.id} task={task} toggleTask={toggleTask} />
    }
    return (
        <List component="ul">
            {tasks.map(mapCallback)}
        </List>
    )
}