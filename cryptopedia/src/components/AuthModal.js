import React, { useContext, useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Tabs,
  Tab,
  AppBar,
} from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { useTheme } from "@emotion/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import CryptoContext from "../context/CryptoContext";

const bx1Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};
const bx2Style = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 2,
  p: 3,
  paddingTop: 0,
  fontSize: 20,
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const googleProvider = new GoogleAuthProvider();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setAlert } = useContext(CryptoContext);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAlert({
          open: true,
          message: `Welcome ${result.user.displayName || result.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: 85, height: 40 }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={bx1Style}>
            <AppBar
              position="static"
              style={{ color: "white", backgroundColor: "transparent" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 0 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box sx={bx2Style}>
              <span style={{ color: theme.palette.text.primary }}>OR</span>
              <GoogleButton
                style={{ outline: "none", width: "100%", borderRadius: 5 }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
