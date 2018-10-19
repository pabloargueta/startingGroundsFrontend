import React, { Component } from 'react'
import { connect } from 'react-redux'

class Horoscope extends Component {

  // componentDidMount() {
  //   this.getHoroscope()
  // }
  // componentDidUpdate() {
  //   this.getHoroscope()
  // }

  // getHoroscope() {
  //   if (this.props.user) {

  //     fetch(`https://aztro.sameerkumar.website/?sign=${this.props.user.horoscope}&day=today`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'Application/JSON'
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(horoscopeData => this.props.setHoroscope(horoscopeData))
  //   }
  // }


  render() {
    if (this.props.horoscope) {
      return (
        <div>
          <h1>We are in the Horoscope Component</h1>
          <h2>Date: {this.props.horoscope.current_date}</h2>
          <p>{this.props.horoscope.description}</p>
        </div>
      )
    } else {
      return null
    }
  }
}


function mapStateToProps(state) {
  return {
    horoscope: state.horoscope
  }
}



function mapDispatchToProps(dispatch) {
  return {
    setHoroscope: (horoscopeData) => {
      dispatch({ type: 'SETHOROSCOPE', payload: horoscopeData })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Horoscope)