import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import CryptoContext from "../context/CryptoContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import AuthModal from "./AuthModal";
import UserSidebar from "./UserSidebar";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  flexGrow: 1,
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "Montserrat",
}));

const Header = ({ handleClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { currency, setCurrency, user } = useContext(CryptoContext);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.header,
        }}
        position="static"
      >
        <Container>
          <Toolbar>
            <StyledTypography
              theme={theme}
              variant="h6"
              onClick={() => navigate("/")}
            >
              CryptoPedia
            </StyledTypography>

            <IconButton color="inherent" onClick={handleClick}>
              {theme.palette.mode === "dark" ? <MdDarkMode /> : <MdLightMode />}
            </IconButton>

            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: 100,
                height: 40,
                marginRight: 10,
                marginLeft: 10,
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem selected value={"USD"}>
                USD
              </MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
