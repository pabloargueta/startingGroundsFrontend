import React, { Component } from 'react'
import Profile from './Profile'
import Avatar from './Avatar'
import Horoscope from './Horoscope';

class ProfileContainer extends Component {

  render() {
    return (
      <div>
        <Horoscope />
        <Avatar />
        <Profile />
      </div>
    )
  }

}

export default ProfileContainer