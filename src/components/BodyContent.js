import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Profile from './Profile'

// import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import CompatibleProfilesContainer from './CompatibleProfilesContainer'

import Dates from './Dates'




function TabContainer(props) {
  // console.log(props)
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class BodyContent extends Component {

  state = {
    value: 0
  }

  handleChange = (e) => {
    // console.log(e.target.innerText)
    switch (e.target.innerText) {
      case 'TODAYS COMPATIBLE PROFILES':
        this.setState({ value: 0 })
        this.props.updateBodyContent('TODAYS COMPATIBLE PROFILES')
        break;
      case 'PROFILE':
        this.setState({ value: 1 })
        this.props.updateBodyContent('PROFILE')
        break;
      case 'DATES':
        this.setState({ value: 2 })
        this.props.updateBodyContent('DATES')
        break;
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Tabs
            onChange={this.handleChange}
            value={this.state.value}
            // indicatorColor="primary"
            // textColor="primary"
            centered
          >
            <Tab label="TODAYS COMPATIBLE PROFILES" />
            <Tab label="PROFILE" />
            <Tab label="DATES" />
          </Tabs>

        </AppBar>

        {this.props.bodyContent === "TODAYS COMPATIBLE PROFILES" && <TabContainer><CompatibleProfilesContainer /></TabContainer>}

        {this.props.bodyContent === "PROFILE" && <TabContainer><Profile /></TabContainer>}

        {this.props.bodyContent === "DATES" && <TabContainer><Dates /></TabContainer>}



      </div>
    )
  }

}

BodyContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateBodyContent: (bodyContent) => {
      dispatch({ type: 'SETBODYCONTENT', payload: bodyContent })
    }
  }
}


function mapStateToProps(state) {
  return {
    bodyContent: state.bodyContent
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BodyContent))