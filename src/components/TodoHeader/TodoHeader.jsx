import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>
          <Button onClick={() => props.logout()} color="inherit" component={Link} to="/Auth">Log out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state){
  return {
    tasks: state.tasksCRUD.tasks,
    loading: state.tasksCRUD.loading
  }
}

function mapDispatchToProps(dispatch){
  return{
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);