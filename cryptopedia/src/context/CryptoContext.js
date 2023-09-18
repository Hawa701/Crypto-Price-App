import React, { createContext, useState, useEffect } from "react";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState(`&dollar;`);

  useEffect(() => {
    currency === "USD" ? setSymbol("$") : setSymbol("€");
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
