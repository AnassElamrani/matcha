import React from "react";
import { withRouter, Switch, Route } from "react-router-dom"
// import "../../../../src/history/history";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { MenuItem } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

import { About } from "./About"
import { Home } from "./Home"
import Axios from "axios";

const instance = Axios.create({ withCredentials: true });


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex"
      },
      drawer: {
        [theme.breakpoints.up("sm")]: {
          width: drawerWidth,
          flexShrink: 0
        }
      },
      appBar: {
        [theme.breakpoints.up("sm")]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth
        }
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          display: "none"
        }
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3)
      }
}));

const handelLogout = (logout) => {
    instance.post("http://localhost:3001/logout");
    logout();
};

const testAlert = (ok) => {
  alert(ok);
}

const ResponsiveDrawer =  (props) => {
    console.log(props);
    const { history } = props;
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const itemsListOne = [{text: "Home", icon : < FaHome/>, onClick : () => history.push("/")}, 
                      {text: "About", icon :< FaInfoCircle/>, onClick : () => history.push("/about")}];
    const itemsListTwo = [{text: "Logout", icon : < RiLogoutCircleLine />, onClick : () => history.push("/logout")}];
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {itemsListOne.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText primary={text} />
                {
                  icon && 
                  <ListItemIcon>{icon}</ListItemIcon>
                }
              </ListItem>
            );
          })}
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
        <Divider />
        <List>
        {itemsListTwo.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText primary={text} />
                {
                  icon && 
                  <ListItemIcon>{icon}</ListItemIcon>
                }
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  
    const container =
      window !== undefined ? () => window().document.body : undefined;
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Matcha
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            {/* <Button onClick={alert('ok')}>alert</Button> */}
                <Switch>
                  {/* fillImg -> fiilProfil */}
                  <Route exact path="/about" component={About} />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/logout" component={() => { handelLogout()}} />
                </Switch>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dode */}
          </Typography>
        </main>
      </div>
    );
  }
  
  ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
  };

export default withRouter(ResponsiveDrawer);
// export default withStyles(useStyles)({ MenuItemCollapse1, MenuItemCollapse2})