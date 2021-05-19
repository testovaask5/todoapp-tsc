import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUserError, setUserError } from "../features/users/usersSlice";
import { post } from "../services/api";
import createStyle from "../styles/jss/loginStyle";
import Card from "./Card";

const useStyles = createStyle('/img/bg7.jpg')

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [cardAnimaton, setCardAnimation] = useState(false);
  setTimeout(() => setCardAnimation(true), 700);
  const classes = useStyles();
  const userError = useSelector(selectUserError)

  async function submitHandler(event: SyntheticEvent) {
    event.preventDefault();
    dispatch(login({ name, password }))
  }

  async function registration() {
    if (name.length > 2 && password.length > 3) {
      const response = await post('/api/user', { name, password })
      if (response.ok) {
        dispatch(login({ name, password }))
      } else {
        try {
          const { message } = await response.json()
          dispatch(setUserError(message))
        } catch (error) {
          dispatch(setUserError('Server error'))
        }
      }
    } else {
      dispatch(setUserError('Name or password is very short'))
    }
  }

  return (
    <div className={classes.pageHeader}>
      <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
          <Card className={cardAnimaton ? '' : classes.cardHidden}>
            <form onSubmit={submitHandler}>
              <div className={classes.cardHeader}>
                <h2>Login</h2>
              </div>
              <div className={classes.cardBody}>
                {userError && <Alert severity="error">{userError}</Alert>}
                <TextField value={name}
                  onChange={event => setName(event.target.value)}
                  label="User name"
                  variant="outlined" />
                <TextField type="password" value={password}
                  onChange={event => setPassword(event.target.value)}
                  label="Password"
                  variant="outlined" />
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <Button onClick={registration} variant="contained" color="secondary">Registration</Button>
              </div>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}