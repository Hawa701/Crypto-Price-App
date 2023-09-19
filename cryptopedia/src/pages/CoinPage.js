import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import CoinChart from "../components/CoinChart";
import CoinInfo from "../components/CoinInfo";
import { CircularProgress } from "@mui/material";

const CoinPage = () => {
  const [coin, setCoin] = useState();
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    fetchCoin();
  }, []);

  const fetchCoin = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setIsLoading(false);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
    <div
      className="coinPage"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {fetchError && <p className="errorMsg SingleCoin">Error: {fetchError}</p>}
      {!fetchError && isLoading && (
        <CircularProgress
          id="progress"
          className="SingleCoinProgress"
          size={100}
          thickness={1}
        />
      )}
      {!isLoading && !fetchError && (
        <>
          <CoinInfo coin={coin} />
          <CoinChart coin={coin} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
