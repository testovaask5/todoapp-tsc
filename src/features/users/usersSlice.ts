import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { post, userInfoDTO } from "../../services/api";

type LoginResponse = {
    token: string
    success: boolean
}

export const login = createAsyncThunk('user/login', async function (user: userInfoDTO) {
    const response = await post('/api/user/login', user)
    if (response.ok) {
        const responseToken: LoginResponse = await response.json();
        return responseToken.token
    }
    else throw new Error('Response is not ok')
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        token: localStorage.getItem('Token') || ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload
            localStorage.setItem('Token', action.payload)
        })
    }
})

export default usersSlice.reducer

export const selectToken = (state: RootState) => state.users.token