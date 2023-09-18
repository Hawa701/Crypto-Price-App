import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import MissingPage from "./pages/MissingPage";
import { createTheme, ThemeProvider } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFD700",
      dark: "#EEBC1D",
    },
    secondary: {
      main: "#F50057",
    },
    background: {
      default: "#FFFFFF",
      secondary: "#f1f1f1",
      hover: "#d9d9d9",
    },
    text: {
      primary: "#000000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD700",
    },
    secondary: {
      main: "#F50057",
    },
    background: {
      default: "#14161A",
      secondary: "#16171A",
      hover: "#131111",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

function App() {
  const [themeMode, setThemeMode] = useState("dark");

  const handleClick = () => {
    themeMode === "dark" ? setThemeMode("light") : setThemeMode("dark");
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <div className="app">
        <Header handleClick={handleClick} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
