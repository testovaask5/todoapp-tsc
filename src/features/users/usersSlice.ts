import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { post, userInfoDTO } from "../../services/api";

type LoginResponse = {
    token: string
    success: boolean
}

export const login = createAsyncThunk('user/login', async function (user: userInfoDTO, thunkAPI) {
    const response = await post('/api/user/login', user)
    if (response.ok) {
        const responseToken: LoginResponse = await response.json();
        return responseToken.token
    }
    else return thunkAPI.rejectWithValue('Incorrect name or password')
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        token: localStorage.getItem('Token') || '',
        isLogin: localStorage.getItem('Token') ? true : false,
        userError: ''
    },
    reducers: {
        logout(state) {
            state.isLogin = false
            state.token = ''
            localStorage.setItem('Token', '')
        },
        setUserError(state, action) {
            state.userError = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload
            state.isLogin = true
            state.userError = ''
            localStorage.setItem('Token', action.payload)
        })
        builder.addCase(login.rejected, (state, action) => {
            state.token = ''
            state.isLogin = false
            state.userError = action.payload as string
            localStorage.setItem('Token', '')
        })
    }
})

export default usersSlice.reducer
export const { logout, setUserError } = usersSlice.actions

export const selectToken = (state: RootState) => state.users.token
export const selectIsLogin = (state: RootState) => state.users.isLogin
export const selectUserError = (state: RootState) => state.users.userError