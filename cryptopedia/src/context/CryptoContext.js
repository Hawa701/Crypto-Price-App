import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState(`&dollar;`);
  const [coins, setCoins] = useState([]);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    try {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
          console.log(coin.data().coins);
        } else {
          console.log("No Items in Watchlist!");
        }
        return () => {
          unsubscribe();
        };
      });
    } catch (err) {
      console.log(err.message);
    }
  }, [user]);

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
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
