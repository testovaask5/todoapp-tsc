import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        users: usersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store