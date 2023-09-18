import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { CryptoProvider } from "./context/CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CryptoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CryptoProvider>
  </React.StrictMode>
);
