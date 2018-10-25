import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from './Avatar'
import Horoscope from './Horoscope';
import BodyContent from './BodyContent';
import Navbar from './Navbar'
import '../Profile.css'

// Material imports=================================

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';




const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  Paper: {
    marginTop: 10, marginBottom: 10, height: 225, overflow: 'auto'
    // padding: theme.spacing.unit,
    // textAlign: "center",
    // color: theme.palette.text.secondary,
    // whiteSpace: "nowrap",
    // marginBottom: theme.spacing.unit
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class ProfileContainer extends Component {


  componentDidMount() {
    this.getProfile()
    // this.getHoroscope()

  }

  componentDidUpdate() {
    this.getHoroscope()
  }

  getHoroscope() {

    if (this.props.user && !this.props.horoscope) {

      fetch(`https://aztro.sameerkumar.website/?sign=${this.props.user.horoscope}&day=today`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        }
      })
        .then(resp => resp.json())
        .then(horoscopeData => this.props.setHoroscope(horoscopeData))
    }
  }

  getProfile() {
    // debugger
    fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(resp => resp.json())
      .then(data => this.props.setUser(data))

    // this.getHoroscope()

  }


  render() {
    const { classes } = this.props; //Material
    let fullName = this.props.user ? (`${this.props.user.first_name.charAt(0).toUpperCase() + this.props.user.first_name.slice(1)} ${this.props.user.last_name.charAt(0).toUpperCase() + this.props.user.last_name.slice(1)}`) : ''

    // https://www.theme-junkie.com/wp-content/uploads/Coding-Programming-Background-5.jpg


    let backgroundImage = this.props.profile && this.props.background_url == '' ?
      this.props.user.background_url : 'https://backgroundcheckall.com/wp-content/uploads/2017/12/generic-background-5.jpg'

    return (
      <div>




        <main>

          <div style={{
            width: '100%',
            height: '300px',
            backgroundImage: `url(${backgroundImage})`
          }}>
          </div>
          <div className="container icons">
            <div className="big-icon">
              <Avatar />
            </div>
            <div className="rate">

            </div>
            <div className="add">

            </div>
          </div>




          <div className="details">
            <Typography variant='h3' align='center'>{fullName}</Typography>
          </div>



          <div >
            <div align='center'>
              <Typography variant='h6'>{this.props.user ? this.props.user.horoscope.toUpperCase() : ''} </Typography>
            </div>

            <hr />
            <Horoscope />



            <BodyContent />

          </div>
        </main>

      </div >
    )
  }

}

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
    horoscope: state.horoscope,
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch({ type: 'SETUSER', payload: user })
    },
    setHoroscope: (horoscopeData) => {
      dispatch({ type: 'SETHOROSCOPE', payload: horoscopeData })
    }
  }
}

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileContainer))

