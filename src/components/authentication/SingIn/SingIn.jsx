import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {login} from '../../../actions/auth';
import {Redirect} from 'react-router';

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

function OutlinedTextFields(props) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState( '' );

  function SubmitForm(){
    props.login(name, password, true);
  }

  if(!props.isAuth){
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
            error={props.error === 'Invalid password.' ? true : false}
            helperText={props.error === 'Invalid password.' ? props.error : false}
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
          <Button onClick={() => SubmitForm()} variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
  } else {
    return <Redirect to='/'/>
  }
}

function mapStateToProps(state){
  return {
    isAuth: !!state.auth.token,
    error: state.auth.error
  }
}

function mapDispatchToProps(dispatch){
  return{
    login: (name, password) => dispatch(login(name, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlinedTextFields);