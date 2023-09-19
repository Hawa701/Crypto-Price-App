import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import CoinChart from "../components/CoinChart";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const theme = useTheme();

  useEffect(() => {
    fetchCoin();
  }, []);

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (err) {
      console.log(err.stack);
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
      <CoinInfo coin={coin} />
      <CoinChart coin={coin} />
    </div>
  );
};

export default CoinPage;
