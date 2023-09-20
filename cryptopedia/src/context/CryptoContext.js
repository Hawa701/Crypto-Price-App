import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState(`&dollar;`);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    currency === "USD" ? setSymbol("$") : setSymbol("€");
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
  });

  const fetchCoins = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        setCoins,
        isLoading,
        fetchCoins,
        alert,
        setAlert,
        user,
        setUser,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
