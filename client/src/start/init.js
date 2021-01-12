import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { HeaderLoggedin, HeaderLoggout } from "../component/layout/Header";
import Home from "../component/Home";
import Login from "../component/auth/Login";
import Signup from "../component/auth/Sign-in";
import Valid from "../component/auth/Valid";
import SendForget from "../component/forget/sendForget";
import Forget from "../component/forget/forget";
import FillProfil from "../component/profil/fillProfil";
import Footer from "../component/layout/Footer";
import Error from "../component/helpers/404";

const Init = (props) => {
  const [loggedin, setLoggedin] = useState(false);
  const login = () => {
    setLoggedin(!loggedin);
  };
  const logout = () => {
    setLoggedin(!loggedin);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/users/checkLogin", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.jwt) setLoggedin(true);
        else setLoggedin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container direction="column">
        <Grid item>
          {loggedin && (
            <HeaderLoggedin
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              logout={logout}
            />
          )}
          {!loggedin && (
            <HeaderLoggout darkMode={darkMode} setDarkMode={setDarkMode} />
          )}
        </Grid>
        <Grid item container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/confirm/:cnfId" component={Valid} />
            <Route path="/Sign-up" component={Signup} />
            <Route path="/Login" component={() => <Login login={login} />} />
            <Route path="/sendForget" component={SendForget} />
            <Route path="/forget/:frgId" component={Forget} />
            <Route path="/fillProfil/:id" component={FillProfil} />
            <Route path="*" component={() => <Error isAuth={loggedin} />} />
          </Switch>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Init;
