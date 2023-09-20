import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import CryptoContext from "../context/CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { setAlert } = useContext(CryptoContext);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords don't match!",
        type: "error",
      });
      return;
    }
    if (!email || !password || !confirmPassword) {
      setAlert({
        open: true,
        message: "All fields are required!",
        type: "warning",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (err) {
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" size="large" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
