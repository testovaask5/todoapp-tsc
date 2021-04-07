import List from "@material-ui/core/List"
import { TaskDTO, MapArrayToJSX } from "../types"
import TaskComponent from "./TaskComponent"

type TasksListProps = {
    tasks: TaskDTO[],
    toggleTask: (task: TaskDTO) => void
    editTask: (task: TaskDTO) => void
    removeTask: (id: number) => void
}
export default function TasksList ({tasks, toggleTask, editTask, removeTask}: TasksListProps) {
    const mapCallback: MapArrayToJSX<TaskDTO> = (task) => {
        return <TaskComponent 
            key={task.id} 
            task={task} 
            toggleTask={toggleTask}
            editTask={editTask}
            removeTask={removeTask}
             />
    }
    return (
        <List component="ul">
            {tasks.map(mapCallback)}
        </List>
    )
}