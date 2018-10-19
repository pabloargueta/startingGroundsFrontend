import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.state })
    })
      .then(resp => resp.json())
      .then(token => this.props.login(token.jwt))
  }

  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState(state => {
      state[name] = value
      return state
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='username' type='text' onChange={this.handleChange} />
          <input name='password' type='password' onChange={this.handleChange} />
          {/* <input type='file' name='avatar' /> */}
          <input type='submit' value="Log in" />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (token) => {
      dispatch({ type: 'LOGIN', payload: token })
    }
  }
}



export default connect(null, mapDispatchToProps)(Login);