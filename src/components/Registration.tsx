import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { SyntheticEvent, useState } from "react";
import { post } from "../services/api";

export default function Registration() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function submitHandler(event: SyntheticEvent) {
    event.preventDefault();
    const response = await post('/api/user', { name, password });
    if (response.ok) {
      const userFromDb = await response.json()      
    }
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
      <Button type="submit" variant="contained" color="primary">Registration</Button>
    </form>
  )
}