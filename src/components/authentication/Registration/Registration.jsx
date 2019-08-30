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
  const [values, setValues] = React.useState({
    login: ''
  });

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  return (
    <div className={classes.wrapper}>
      <Card>
        <form className={classes.container} noValidate autoComplete="off">

          <TextField
            id="outlined-login"
            label="Login"
            className={classes.textField}
            value={values.name}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-password-1"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password-1"
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-password-2"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password-2"
            margin="normal"
            variant="outlined"
          />

          <Button variant="contained" color="primary" className={classes.button}>
            Register
          </Button>

        </form>
      </Card>
    </div>
  );
}