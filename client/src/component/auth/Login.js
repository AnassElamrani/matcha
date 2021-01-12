import React, { Component } from "react";
import Axios from "axios";
import {
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  CssBaseline,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import history from "../../history/history";
const instance = Axios.create({ withCredentials: true });

// import imgMatcha from '../../assets/images/img.png';

const useStyles = (theme) => ({
  root: {
    height: "94vh",
  },
  image: {
    backgroundImage:
      "url(https://raw.githubusercontent.com/hassanreus/img/master/taboo-2017-005-tom-hardy-006-in-water.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  state = {
    errMsg: {},
    userName: "",
    password: "",
    redirect: null,
    data: [],
    disabled: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async (e) => {
    e.preventDefault();
    await instance
      .post("http://localhost:3001/users/login", {
        userName: this.state.userName,
        password: this.state.password,
      })
      .then((response) => {
        // console.log(response)
        if (response.data.status === "fail")
          this.setState({ errMsg: response.data.toSend });
        else if (response.data.status === "success") {
          this.setState({ redirect: "/" });
        }
      });
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/users/checkLogin", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.jwt) this.setState({ redirect: "/" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.props.login();
      history.push("/");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item container>
        <Grid container component='main' className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlined />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <Typography variant='subtitle2' gutterBottom color='secondary'>
                {this.state.errMsg.errorGlobal}
              </Typography>
              <form
                method='POST'
                className={classes.form}
                onSubmit={this.login}
              >
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='inputUserName'
                  label='User Name'
                  name='userName'
                  autoComplete='userName'
                  autoFocus
                  onChange={this.onChange.bind(this)}
                  value={this.state.userName}
                  helperText={this.state.errMsg.validUserNameErr}
                  error={this.state.errMsg.validUserNameErr !== undefined}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='inputPassword'
                  autoComplete='current-password'
                  onChange={this.onChange.bind(this)}
                  value={this.state.password}
                  helperText={this.state.errMsg.validPassErr}
                  error={this.state.errMsg.validPassErr !== undefined}
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Typography variant='body2'>
                      <Link to='/sendForget'>Forgot password?</Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>
                      <Link to='/Sign-up'>
                        "Don't have an account? Sign Up"
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(Login);
