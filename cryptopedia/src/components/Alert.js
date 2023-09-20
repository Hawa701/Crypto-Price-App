import React, { useContext } from "react";
import CryptoContext from "../context/CryptoContext";
import { Snackbar, AlertTitle, Alert as AT } from "@mui/material";

const Alert = () => {
  const { alert, setAlert } = useContext(CryptoContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <AT
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </AT>
    </Snackbar>
  );
};

export default Alert;
