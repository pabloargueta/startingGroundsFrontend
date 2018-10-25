import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Login from './components/Login'
// import Profile from './components/Profile'
import ProfileContainer from './components/ProfileContainer'
import Navbar from './components/Navbar'




class App extends Component {

  componentDidMount() {
    if (localStorage.token) {
      this.props.login(localStorage.token)
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <React.Fragment>

            <Route exact path='/' render={() => (
              !this.props.token ? (
                <Login />
              ) : (
                  <ProfileContainer />
                )

            )
            } />

          </React.Fragment>
        </Router>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (token) => {
      dispatch({ type: 'LOGIN', payload: token })
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



// <Route exact path="/" render={() => (
//   loggedIn ? (
//     <Redirect to="/dashboard" />
//   ) : (
//       <PublicHomePage />
//     )
// )} />