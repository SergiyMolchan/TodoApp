import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function DeleteBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <IconButton aria-label="delete" className={classes.margin} onClick={props.onDelete}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}