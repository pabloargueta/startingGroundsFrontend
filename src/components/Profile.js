import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {


  componentDidMount() {
    this.getProfile()
    // this.getHoroscope()

  }

  componentDidUpdate() {
    this.getHoroscope()
  }

  getHoroscope() {
    if (this.props.user) {

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

  // addImage(e) {
  //   e.preventDefault()
  //   const data = new FormData(e.target)
  //   // console.log(this)
  //   // debugger
  //   fetch('http://localhost:3000/profile', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${this.props.token}`
  //     },
  //     body: data
  //   })
  //     .then(resp => resp.json())
  //     .then(url => this.props.setAvatarURL(url.image))
  // }


  render() {
    if (this.props.user) {
      return (
        <div>
          <h1>We are in the profile Component</h1>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)