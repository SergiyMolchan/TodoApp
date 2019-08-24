import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './MyAccount.sass'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MyAccount(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    props.onCalculate();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p onClick={handleOpen}>MyAccount</p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="MyAccount_header">
              <h2 id="transition-modal-title">MyAccount</h2>
            </div>
            <div className="MyAccount_stats">
              <h3>Stats</h3>
              <div className="MyAccount_stats-wrapper">
                <p>{`Tasks all: ${props.stats.all}`}</p>
                <p>{`Completed: ${props.stats.completed}`}</p>
                <p>{`Actively: ${props.stats.actively}`}</p>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

MyAccount.protTypes = {
  onCalculate: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired
 }