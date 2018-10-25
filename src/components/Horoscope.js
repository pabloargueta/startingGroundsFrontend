import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Horoscope extends Component {


  render() {
    if (this.props.horoscope) {
      return (
        <div>
          <Typography align='center' variant='h5'> {this.props.horoscope.current_date}</Typography>
          <br />
          <div >
            <Grid container spacing={12} align='center'>
              <Grid item xs={4}>
                <Typography>Lucky Color:     <strong>{this.props.horoscope.color}</strong></Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography>Lucky Number:     <strong>
                  {this.props.horoscope.lucky_number}
                </strong></Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography>Lucky Time:
                  <strong>
                    {this.props.horoscope.lucky_time}
                  </strong></Typography>
              </Grid>

            </Grid>
          </div>
          <br />
          <div>
            <Typography align='center' variant='h5'>
              {this.props.horoscope.description}
            </Typography>
          </div>
          <br />
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