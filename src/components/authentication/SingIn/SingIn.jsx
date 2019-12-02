import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: '20px 10px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 250,
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  let history = useHistory();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState( '' );
  const [error, errorHandler] = React.useState('');

  async function SubmitForm(){
    const url = '/api/auth/login';
    const data = {name: name, password: password};
    try {
      const res = await fetch(url, {
        method: 'POST',
        cors: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if(res.status === 200){
        localStorage.setItem('jwt-token', json.token);
        return true;
      }
      if(res.status === 401){
        errorHandler(json.message);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Card>
        <form className={classes.container} noValidate autoComplete="on">

          <TextField
            onChange={ e => setName(e.target.value)}
            required
            id="outlined-login-SindIn"
            label="Login"
            className={classes.textField}
            type="text"
            margin="normal"
            autoComplete="current-login-SindIn"
            variant="outlined"
          />  

          <TextField
            error={error === 'Invalid password.' ? true : false}
            helperText={error === 'Invalid password.' ? error : false}
            required
            onChange={ e => setPassword(e.target.value)}
            id="outlined-password-SindIn"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password-SindIn"
            margin="normal"
            variant="outlined"
          />
          <Button onClick={ async () => {if(await SubmitForm()) history.push("/")}} variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}