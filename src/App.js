import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Login from './components/Login'
// import Profile from './components/Profile'
import ProfileContainer from './components/ProfileContainer'



class App extends Component {
  render() {
    return (
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
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(App);



// <Route exact path="/" render={() => (
//   loggedIn ? (
//     <Redirect to="/dashboard" />
//   ) : (
//       <PublicHomePage />
//     )
// )} />