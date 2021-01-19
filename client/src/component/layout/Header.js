import React from "react";
import {
  IconButton,
  Switch,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, Brightness4, Brightness7 } from "@material-ui/icons";
import { Item1 } from "./res/menuItemcollapse"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btnColor: {
    background: (props) =>
      props.darkMode
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    marginRight: theme.spacing(2),
    borderRadius: 3,
    boxShadow: (props) =>
      props.darkMode === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    padding: "0 20px",
  },
  appBar: {
    background: (props) =>
      props.darkMode
        ? "linear-gradient(45deg, #333333 30%, #333333 90%)"
        : "linear-gradient(45deg, #0000ff 30%, ##1976d2 90%)",
    height: 50,
  },
  marginTopOver: {
    marginTop: theme.spacing(-1),
  },
}));

const HeaderLoggedin = (props) => {
  const classes = useStyles(props);
  return (
      <Item1 btnColor={classes.btnColor} logout={props.logout}/>
  );
};

const HeaderLoggout = (props) => {
  const classes = useStyles(props); 

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.marginTopOver}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          <Switch
            checked={props.darkMode}
            onChange={() => props.setDarkMode(!props.darkMode)}
            />
          {props.darkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>

            {/* import all staff here  */}
          <Item1 btnColor={classes.btnColor} />

        </Toolbar>
      </AppBar>
    </div>
  );
};

export { HeaderLoggedin, HeaderLoggout };
