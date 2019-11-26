import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
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
    width: 200,
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState( '' );
  const [password, setPassword] = React.useState( '' );
  const [repeatPassword, setRepeatPassword] = React.useState( '' );
  const [error, errorHandler] = React.useState('');
  const [registered, regHandler] = React.useState('');

  async function SubmitForm(){
    const url = '/api/auth/registration';
    const data = {name: name, password: password, repeatPassword: repeatPassword};
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

      if(res.status === 409){
        errorHandler(json.message);
      }
      if(res.status === 201){
        regHandler(json.message);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Card>
        <form className={classes.container} noValidate autoComplete="off">

        <TextField
            error={error === 'Enter your name.' || error === 'Name is already taken.' ? true : false}
            helperText={error === 'Enter your name.' || error === 'Name is already taken.' ? error : false}
            onChange={ e => setName(e.target.value)}
            required
            id="outlined-login-Register"
            label="Login"
            className={classes.textField}
            type="text"
            margin="normal"
            autoComplete="current-login-Register"
            variant="outlined"
          />  

          <TextField
            error={error === 'Enter your password more 6 symbols.' ? true : false}
            helperText={error === 'Enter your password more 6 symbols.' ? error : false}
            onChange={ e => setPassword(e.target.value)}
            required
            id="outlined-password-1"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password-1"
            margin="normal"
            variant="outlined"
          />

          <TextField
            error={error === 'Passwords must be identical.' ? true : false}
            helperText={error === 'Passwords must be identical.' ? error : false}
            required
            onChange={ e => setRepeatPassword(e.target.value)}
            id="outlined-password-2"
            label="Repeat password"
            className={classes.textField}
            type="password"
            autoComplete="current-password-2"
            margin="normal"
            variant="outlined"
          />

          <Button onClick={()=> SubmitForm()} disabled={registered === 'Registered.' ? true : false} variant="contained" color="primary" className={classes.button}>
          {registered === 'Registered.' ? 'Registered' : 'Register'}
          </Button>
        </form>
      </Card>
    </div>
  );
}