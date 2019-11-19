import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

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
    width: 200,
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState( '' );
  const [password, setPassword] = React.useState( '' );
  const [repeatPassword, setRepeatPassword] = React.useState( '' );

  async function SubmitForm(){
    const url = 'http://localhost:4000/api/auth/registration';
    const data = {name: name, password: password, repeatPassword: repeatPassword};
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(url, {
        method: 'POST',
        cors: 'no-cors',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(JSON.stringify(data));
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Card>
        <form className={classes.container} noValidate autoComplete="off">

        <TextField
            //error
            //helperText="Incorrect entry."
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

          <Button onClick={()=> SubmitForm()} variant="contained" color="primary" className={classes.button}>
            Register
          </Button>

        </form>
      </Card>
    </div>
  );
}