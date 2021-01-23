import React, { Component } from "react";
import Axios from "axios";
import { 
  // Button, TextField, 
  Avatar, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import history from "../../history/history";
import Steps from "../helpers/stepper"
import AddImg from './fillImg'
import FillProfil from './fillProfil'


const instance = Axios.create({ withCredentials: true });

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Home extends Component {
  state = {
    id: 0,
    data: { userName: "", email: "", firstName: "", lastName: "" },
    redirect: null,
    fillProfil: null,
    isAuth: false,
    errMsg: {},
  };

  handelInput = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  home = (e, id) => {
    e.preventDefault();
    // here we will update info and redirect to another component for filling mre info
    instance
      .post(`http://localhost:3001/base/edit/${id}`, {
        userName: this.state.data.userName,
        email: this.state.data.email,
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
      })
      .then((res) => {
        if (res.data.input) this.setState({ errMsg: res.data.input });
        if (res.data === "login") this.setState({ redirect: "/Login" });
        else if (res.data.status) this.setState({ fillProfil: `/addImg/${id}` })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // still an error of login page redirection

  componentDidMount() {
    instance
      .get("http://localhost:3001/base")
      .then((res) => {
        if (res.data === "login") this.setState({ redirect: "/Login" });
        else this.setState({ data: res.data[0], id: res.data[0].id });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.redirect) history.push("/Login");
    if (this.state.fillProfil) history.push(this.state.fillProfil);
  }

  // validEmailErr validFirstNameErr validLastNameErr validUserNameErr
  render() {
    const { classes } = this.props;
    return (
      <Grid container component='main' className={classes.root}>
        <Grid item container>
          <Grid item sm={2} />
          <Grid item xs={12} sm={8}>
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Profil
            </Typography>
            <Steps img={AddImg} fill={FillProfil} id={this.state.id} />
            {/* <form
              method="POST"
              className={classes.form}
              onSubmit={(event) => this.home(event, this.state.id)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="inputUserName"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    autoFocus
                    onChange={this.handelInput}
                    value={this.state.data.userName}
                    helperText={this.state.errMsg.validUserNameErr}
                    error={this.state.errMsg.validUserNameErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handelInput}
                    value={this.state.data.email}
                    helperText={this.state.errMsg.validEmailErr}
                    error={this.state.errMsg.validEmailErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="inputFirstName"
                    label="First Name"
                    autoFocus
                    onChange={this.handelInput}
                    value={this.state.data.firstName}
                    helperText={this.state.errMsg.validFirstNameErr}
                    error={this.state.errMsg.validFirstNameErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="inputLastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    autoFocus
                    onChange={this.handelInput}
                    value={this.state.data.lastName}
                    helperText={this.state.errMsg.validLastNameErr}
                    error={this.state.errMsg.validLastNameErr !== undefined}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit
              </Button>
            </form> */}
          </Grid>
          <Grid item sm={2} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(Home);