import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import MenuCollapse from "./menucollapse";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Axios from "axios";
const instance = Axios.create({ withCredentials: true });

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        right: 0
    },
    buttonBar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        margin: "10px",
        paddingLeft: "16px",
        right: 0,
        position: "relative",
        width: "100%",
        background: "transparent"
    }
}));

const handelLogout = (logout) => {
    instance.post("http://localhost:3001/logout");
    logout();
};

const Item1 = (props) => {
    const classes = useStyles(props)
    return (
        <div className={classes.root}>
            <MenuCollapse>
                <MenuItem>
                    <Button className={props.btnColor}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            {" "}
                        Home{" "}
                        </Link>
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button className={props.btnColor} onClick={() => handelLogout(props.logout)}>
                        <Link to="/Login" style={{ textDecoration: "none" }}>
                            {" "}
                            logout{" "}
                        </Link>
                    </Button>
                </MenuItem>
            </MenuCollapse>
            <div className={classes.buttonBar} id="appbar-collapse">
                <Button className={props.btnColor}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        {" "}
                        Home{" "}
                    </Link>
                </Button>
                <Button className={props.btnColor} onClick={() => handelLogout(props.logout)}>
                    <Link to="/Login" style={{ textDecoration: "none" }}>
                        {" "}
                        logout{" "}
                    </Link>
                </Button>
            </div>
        </div>
    );
}

const Item2 = (props) => {
    const classes = useStyles(props)
    return (

        <div className={classes.root}>
            <MenuCollapse>
                <MenuItem>
                    <Button className={props.btnColor}>
                        <Link to="/Login" style={{ textDecoration: "none" }}>
                            {" "}
                        Login{" "}
                        </Link>
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button className={props.btnColor}>
                        <Link to="/Sign-up" style={{ textDecoration: "none" }}>
                            {" "}
                            Sign-up{" "}
                        </Link>
                    </Button>
                </MenuItem>
            </MenuCollapse>
            <div className={classes.buttonBar} id="appbar-collapse">
                <Button className={props.btnColor}>
                    <Link to="/Login" style={{ textDecoration: "none" }}>
                        {" "}
                        Login{" "}
                    </Link>
                </Button>
                <Button className={props.btnColor}>
                    <Link to="/Sign-up" style={{ textDecoration: "none" }}>
                        {" "}
                        Sign-up{" "}
                    </Link>
                </Button>
            </div>
        </div>
    )
};

export {Item1, Item2}
// export default withStyles(useStyles)({ MenuItemCollapse1, MenuItemCollapse2})