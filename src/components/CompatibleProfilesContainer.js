import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from "@material-ui/core/styles";

import NonUserProfileCard from './NonUserProfileCard'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class CompatibleProfilesContainer extends Component {



  getProfiles() {
    if (this.props.user && this.props.horoscope) {
      fetch('http://localhost:3000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          horoscope: {
            compatibility: this.props.horoscope.compatibility
          }
        })
      })
        .then(resp => resp.json())
        .then(data => this.props.setProfiles(data.profiles))
    }
  }

  render() {

    const { classes } = this.props

    if (this.props.profiles.length < 1) {
      this.getProfiles()
    }


    return (
      <div className={classes.root}>

        <div style={{
          paddingBottom: '20px'
        }}>
          <Grid container spacing={24}>
            <Grid item xs>
              <NonUserProfileCard user={this.props.profiles[0]} />
            </Grid>

            <Grid item xs>
              <NonUserProfileCard user={this.props.profiles[1]} />
            </Grid>

            <Grid item xs>
              <NonUserProfileCard user={this.props.profiles[2]} />
            </Grid>
          </Grid>
        </div>

        <div>
          <Grid container spacing={24}>
            <Grid item xs>
              <NonUserProfileCard user={this.props.profiles[3]} />
            </Grid>

            <Grid item xs>
              <NonUserProfileCard user={this.props.profiles[4]} />
            </Grid>

            <Grid item xs>
              <NonUserProfileCard user={this.props.profiles[5]} />
            </Grid>
          </Grid>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    profiles: state.compatibleProfiles,
    user: state.user,
    horoscope: state.horoscope,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProfiles: (profiles) => {
      dispatch({ type: 'SETCOMPATIBLEUSERS', payload: profiles })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompatibleProfilesContainer))