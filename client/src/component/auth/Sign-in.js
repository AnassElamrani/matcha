import React, { Component } from 'react'
import Axios from 'axios'
import {
  Chip,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  Container,
  CssBaseline,
  // Link as Links,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { LockOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import ImgIcons from '../helpers/icon'
import FacebookIcon from '@material-ui/icons/Facebook'
// import TwitterIcon from '@material-ui/icons/Twitter'
import history from '../../history/history'
import Size from '../helpers/size'

const useStyles = (theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spaceGrid: {},
})

class Signup extends Component {
  state = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    cnfrmPassword: '',
    errMsg: {},
    redirect: null,
    valid: false,
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  signup = (e) => {
    e.preventDefault()
    Axios.post('users/signup', {
      email: this.state.email,
      userName: this.state.userName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      cnfrmPassword: this.state.cnfrmPassword,
    }).then((response) => {
      this.setState({ errMsg: response.data })
      if (response.data.status === 'success') this.setState({ valid: true })
    })
    // Object.keys(this.state.errMsg).length !== 0 ? this.setState({valid: false}) : console.log("nothting")
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/users/checkLogin', {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.jwt) this.setState({ redirect: '/' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidUpdate() {
    if (this.state.redirect) history.push('/')
    if (this.state.valid) history.push('/Login')
  }

  render() {
    const concat1 =
      this.state.errMsg.emailErr === undefined &&
      this.state.errMsg.validEmailErr === undefined
        ? ''
        : `${this.state.errMsg.emailErr} ${this.state.errMsg.validEmailErr}`.replace(
            'undefined',
            ''
          )
    const concat2 =
      this.state.errMsg.userNameErr === undefined &&
      this.state.errMsg.validUserNameErr === undefined
        ? ''
        : `${this.state.errMsg.userNameErr} ${this.state.errMsg.validUserNameErr}`.replace(
            'undefined',
            ''
          )
    const concat3 =
      this.state.errMsg.passErr === undefined &&
      this.state.errMsg.validCnfpErr === undefined
        ? ''
        : `${this.state.errMsg.passErr} ${this.state.errMsg.validCnfpErr}`.replace(
            'undefined',
            ''
          )
    const { classes } = this.props
    return (
      <Size>
        <Container className={classes.copy} component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <a href="http://localhost:3001/auth/google">
                  <Chip
                      icon={<ImgIcons />}
                      label="Google"
                      // onClick={this.handelGoogle}
                      color="primary"
                      variant="outlined"
                      clickable
                  />
                </a>
              </Grid>
              <Grid item xs={12} sm={4}>
              <a href="http://localhost:3001/auth/facebook">
                  <Chip
                      icon={<FacebookIcon />}
                      label="Facebook"
                      // onClick={this.handelGoogle}
                      color="primary"
                      variant="outlined"
                      clickable
                  />
                </a>
              </Grid>
              <Grid item xs={12} sm={4}>
              <a href="http://localhost:3001/auth/42">
                  <Chip
                      icon={<FacebookIcon />}
                      label="42"
                      // onClick={this.handelGoogle}
                      color="primary"
                      variant="outlined"
                      clickable
                  />
                </a>
              </Grid>
            </Grid>
            <form className={classes.form} method='POST' onSubmit={this.signup}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='uname'
                    name='userName'
                    variant='outlined'
                    required
                    fullWidth
                    id='inputUserName'
                    label='User Name'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.userName}
                    helperText={concat2}
                    error={
                      this.state.errMsg.userNameErr !== undefined ||
                      this.state.errMsg.validUserNameErr !== undefined
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='fname'
                    name='firstName'
                    variant='outlined'
                    required
                    fullWidth
                    id='inputFirstName'
                    label='First Name'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.firstName}
                    helperText={this.state.errMsg.validFirstNameErr}
                    error={this.state.errMsg.validFirstNameErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='inputLastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='lname'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.lastName}
                    helperText={this.state.errMsg.validLastNameErr}
                    error={this.state.errMsg.validLastNameErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.email}
                    helperText={concat1}
                    error={
                      this.state.errMsg.emailErr !== undefined ||
                      this.state.errMsg.validEmailErr !== undefined
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='inputPassword'
                    autoComplete='current-password'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.password}
                    helperText={this.state.errMsg.validPassErr}
                    error={this.state.errMsg.validPassErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='cnfrmPassword'
                    type='password'
                    id='inputCnfrmPassword'
                    autoComplete='current-password'
                    label='Confirm Password'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.cnfrmPassword}
                    helperText={concat3}
                    error={
                      this.state.errMsg.passErr !== undefined ||
                      this.state.errMsg.validCnfpErr !== undefined
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value='allowExtraEmails' color='primary' />
                    }
                    label='I want to receive notification and updates via email.'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify='flex-end'>
                <Grid item>
                  <Typography variant='body2'>
                    <Link to='/Login'>Already have an account? Sign in</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Size>
    )
  }
}

export default withStyles(useStyles)(Signup)
