import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom'



import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../logo.png'


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Navbar extends Component {

  handleLogout = () => {
    this.props.logout()

  }

  render() {

    const { classes } = this.props;


    return (

      <AppBar position="static">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography color="inherit" className={classes.grow}>
            <img className={classes.headerImage} src={Logo} />
          </Typography>
          {localStorage.token ? <Button color="inherit" onClick={this.handleLogout}>Logout</Button> : <div></div>}

        </Toolbar>
      </AppBar>

    )
  }
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({ type: 'LOGOUT', payload: null })
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar))


