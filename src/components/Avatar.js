import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import UpdateAvatarForm from './UpdateAvatarForm'

import MaterialAvatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Profile from '../Profile.css'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';






function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  avatar: {
    margin: 5,
  },
  bigAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',

    // position: 'relative'
  }
}
);

class Avatar extends Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;

    let image = this.props.user && this.props.user.hasOwnProperty('avatar_url') && this.props.user.avatar_url ?
      this.props.user.avatar_url : 'https://secure.gravatar.com/avatar/eed0bc78a6270ea8f2e11065e72dd50a?s=600&d=mm&r=g'

    return (
      <div>
        <div className={classNames(classes.avatar, classes.bigAvatar)}>
          {this.props.user ?
            <Tooltip title='Update'>
              <IconButton>
                <img onClick={this.handleOpen} className={classNames(classes.avatar, classes.bigAvatar)} src={image} style={{
                  borderRadius: '50%',
                  border: '4px solid white'
                }} />
              </IconButton>
            </Tooltip> : ''}

        </div>


        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Update Avatar
            </Typography>
            <br />
            <UpdateAvatarForm handleClose={this.handleClose} />
            <SimpleModalWrapped />
          </div>
        </Modal>

      </div>
    )
  }

}

Avatar.propTypes = {
  classes: PropTypes.object.isRequired
};


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

const SimpleModalWrapped = withStyles(styles)(Avatar);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Avatar))