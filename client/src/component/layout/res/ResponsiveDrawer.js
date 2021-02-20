import React from "react"
import Axios from "axios"
import { withRouter, Switch, Route } from "react-router-dom"
import PropTypes from "prop-types"
import "../../../start/styles.css"
import {
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  List,
  IconButton,
  Hidden,
  Drawer,
  ListItemText,
  ListItemIcon,
  ListItem,
  // Badge
} from "@material-ui/core"
import {
  Menu as MenuIcon,
  // LocationOn
} from "@material-ui/icons"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { FaHome, FaInfoCircle, FaHistory, FaHotjar, FaRegSun } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri"
import { MdAccountCircle } from "react-icons/md"

import { About } from "./About"
import Browsing from "../../browsing/browsing"
import Home from "../../profil/Home"
import EditProfil from "../../profil/editProfill"
import Setting from "../../profil/setting"
import History from "../../history/history"
import ImgTest from "../../browsing/fetchImg"

const instance = Axios.create({ withCredentials: true });

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  ty: {
    flexGrow: 1,
    fontFamily: "Comfortaa",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ResponsiveDrawer = (props) => {
  const { history, window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [lat, setLat] = React.useState(false);
  const [long, setLong] = React.useState(false);
  const [requiredProfilInfo, setRPI] = React.useState("");
  const [route, setRoute] = React.useState('/');

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });
  const func = async () => {
    await instance
    .get("http://localhost:3001/base")
    .then((response) => {
      console.log('Id from response ----->', response.data.user.id)
      if (response.data.user.id !== undefined) {
        setId(response.data.user.id);
      }
    }, (err) => {})
    if (id !== "") {
      console.log('id', id)
      instance.post("http://localhost:3001/user/userInfoVerification", { userId: id })
      .then((res) => {
        if (res.data.status === true) {
          setRPI(true)
        }
        else
        setRPI(false)
      }, (err) => {})
    }
  }
  
  React.useEffect(() => {
    func();
    console.log('Myuseffect')
    if(requiredProfilInfo)
    console.log('RPI', requiredProfilInfo);
  });
  
  const getLocIp = React.useCallback(() => {
    // get locallization with help of ip
    Axios.get('https://api.ipify.org?format=json').then(async (res) => {
      // console.log(res.data.ip)
      await Axios.get(`http://ip-api.com/json/${res.data.ip}`).then(res => {
        console.log(res.data)
        setLat(res.data.lat);
        setLong(res.data.lon);
      })
      if (id) Axios.post(`base/localisation/${id}`, { lat: lat, long: long });
    })
  }, [id, lat, long])

  React.useEffect(() => {
    // save the localization here
    if (lat === false && long === false){
      // hta l push after enablet
      // getLocIp()
    }else
      if (id) Axios.post(`base/localisation/${id}`, { lat: lat, long: long });
  }, [id, lat, long, getLocIp]);

  const handelLogout = () => {
    instance.post("http://localhost:3001/logout");
    props.logout();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const itemsListOne = [
    {
      text: "Fill Profile",
      icon: <FaHome />,
      onClick: () => history.push("/"),
      disabled: requiredProfilInfo,
      hidden: true
    },
    {
      text: "browsing",
      icon: <FaHotjar />,
      onClick: () => history.push(`/browsing/${id}`),
      disabled: !requiredProfilInfo
    },
    {
      text: "Profile",
      icon: <MdAccountCircle />,
      onClick: () => history.push(`/edit/${id}`),
      disabled: !requiredProfilInfo
    },
    {
      text: "History",
      icon: <FaHistory />,
      onClick: () => history.push(`/history/${id}`),
      disabled: !requiredProfilInfo
    },

    // {
    //   text: "Setting",
    //   icon: <FaRegSun />,
    //   onClick: () => history.push("/setting"),
    //   disabled: !requiredProfilInfo
    // },
    {
      text: "About",
      icon: <FaInfoCircle />,
      onClick: () => history.push("/about"),
      disabled: !requiredProfilInfo
    },
  ];
  const itemsListTwo = [
    {
      text: "Logout",
      icon: <RiLogoutCircleLine />,
      onClick: () => {
        handelLogout();
      },
    },
  ];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {itemsListOne.map((item, index) => {
          const { text, icon, onClick, disabled, hidden } = item;
          if(!hidden)
          {
          return (
              <ListItem button key={text} disabled={disabled}  onClick={onClick}>
              <ListItemText primary={text} />
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              </ListItem>
          );
        }
        })}
      </List>
      <Divider />
      <List>
        {itemsListTwo.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              <ListItemText primary={text} />
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
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
          <Typography className={classes.ty} variant="h6" noWrap>
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
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
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
        <Switch>
          <Route exact path="/edit/:id" component={EditProfil} />
          <Route exact path="/browsing/:id" component={Browsing} />
          <Route exact path="/ImgTest/:id" render={(props) => <ImgTest id={id} />} />
          <Route exact path="/history/:id" component={History} />
          <Route exact path="/setting" component={(props) => <Setting id={id} />}/>
          <Route exact path="/about" component={About} />
          {
            (requiredProfilInfo === true ) ?
            <Route exact path="/" component={About}  />
            :
            <Route exact path="/" render={(props) => <Home id={id} />} />
          }
        </Switch>
      </main>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
