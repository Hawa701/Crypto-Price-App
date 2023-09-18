import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import CryptoContext from "../context/CryptoContext";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  flexGrow: 1,
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "Montserrat",
}));

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { currency, setCurrency, symbol } = useContext(CryptoContext);

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <StyledTypography
              theme={theme}
              variant="h6"
              onClick={() => navigate("/")}
            >
              CryptoPedia
            </StyledTypography>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
              }}
            >
              <MenuItem selected value={"USD"}>
                USD
              </MenuItem>
              <MenuItem value={"ETB"}>ETB</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
