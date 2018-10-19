import React, { Component } from 'react'
import { connect } from 'react-redux'

class Avatar extends Component {

  addImage(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    // console.log(this)
    // debugger
    fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      body: data
    })
      .then(resp => resp.json())
      .then(url => this.props.setAvatarURL(url.image))
  }

  render() {
    return (
      <div>
        {this.props.user ? <img src={this.props.user.avatar_url} /> : ''}
        <h1>We are in the Avatar Component</h1>
        <form onSubmit={e => this.addImage(e)}>
          <input type='file' name='image' />
          <input type='submit' />
        </form>
      </div>
    )
  }

}




function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAvatarURL: (url) => {
      dispatch({ type: 'SETAVATARURL', payload: url })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)