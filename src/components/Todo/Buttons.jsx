import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  margin: {
    margin: theme.spacing(1),
  },
  // extendedIcon: {
  //   marginRight: theme.spacing(1),
  // },
}));

export function AddBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={props.onAddTask}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export function DeleteBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <IconButton aria-label="delete" className={classes.margin} onClick={props.onDelete}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export function SaveBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" size="small" className={classes.button} type="submit" onClick={props.onSaveTask}>
        <SaveIcon className={(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    </div>
  );
}

export function EditBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <IconButton className={classes.button} aria-label="Edit" onClick={props.onEditTask}>
        <Edit />
      </IconButton>
    </div>
  )}