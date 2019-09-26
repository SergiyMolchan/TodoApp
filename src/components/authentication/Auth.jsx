import React from 'react';
import PropTypes from 'prop-types';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import SingIn from './SingIn/SingIn'
import Registration from './Registration/Registration'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '25px'
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <AppBar position="static">
          <Tabs value={window.location.href === `${window.location.origin}/Login` ? 0 : window.location.href === `${window.location.origin}/Registration` ? 1 : 0} onChange={handleChange} aria-label="simple tabs example" centered>
              <Tab
                className={classes.tabLink} 
                label="Login" 
                {...a11yProps(0)} 
                component={Link}  
                to="/Login" 
              />
              <Tab  
                className={classes.tabLink} 
                label="Registration" 
                {...a11yProps(1)} 
                component={Link}  
                to="/Registration"
              /> 
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} component={Switch}>
          <Route path="/Login" component={SingIn} />
          <Route path="/Registration" component={Registration} />
        </TabPanel>
      </BrowserRouter>
      
    </div>
  );
}