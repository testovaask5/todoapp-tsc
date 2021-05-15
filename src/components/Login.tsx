import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/users/usersSlice";

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  async function submitHandler(event: SyntheticEvent) {
    event.preventDefault();
    dispatch(login({name, password}))    
  }

  return (
    <form onSubmit={submitHandler}>
      <TextField value={name}
        onChange={event => setName(event.target.value)}
        label="User name"
        variant="outlined" />
      <TextField value={password}
        onChange={event => setPassword(event.target.value)}
        label="Password"
        variant="outlined" />
      <Button type="submit" variant="contained" color="primary">Login</Button>
    </form>
  )
}