import React, { useContext } from "react";
import { Drawer, Button, Avatar } from "@mui/material";
import CryptoContext from "../context/CryptoContext";
import { useTheme } from "@emotion/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert } = useContext(CryptoContext);
  const theme = useTheme();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "Logout Successful!",
      type: "success",
    });
    toggleDrawer();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
            style={{ backgroundColor: theme.palette.primary.main }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="sidebar">
              <div className="profile">
                <Avatar
                  className="picture"
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />

                <span className="userName">
                  {user.displayName || user.email}
                </span>

                <div className="watchList">
                  <span>Watchlist</span>
                </div>
              </div>

              <Button
                variant="contained"
                className="logoutBtn"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
