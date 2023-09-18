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
    },
    secondary: {
      main: "#F50057",
    },
    background: {
      default: "#FFFFFF",
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
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

function App() {
  const [themeMode, setThemeMode] = useState("dark");

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <div className="app">
        <Header />
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
