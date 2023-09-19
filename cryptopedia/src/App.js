import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import MissingPage from "./pages/MissingPage";
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from "./components/Footer";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFD700",
      dark: "#ffcd29",
    },
    background: {
      default: "#eee",
      secondary: "#e1e1e1",
      hover: "#c9c9c9",
      header: "#fff",
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
      dark: "#ffcd29",
    },
    background: {
      default: "#14161A",
      secondary: "#16171A",
      hover: "#131111",
      header: "#14161A",
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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
