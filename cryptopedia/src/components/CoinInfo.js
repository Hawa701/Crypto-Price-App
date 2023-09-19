import { LinearProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import CryptoContext from "../context/CryptoContext";
import parse from "html-react-parser";
import { numberWithCommas } from "./Carousel";
import { useTheme } from "@emotion/react";

const CoinInfo = ({ coin }) => {
  const { symbol, currency } = useContext(CryptoContext);
  const theme = useTheme();

  {
    if (!coin) {
      return (
        <LinearProgress
          style={{ backgroundColor: theme.palette.primary.main }}
        />
      );
    }
  }

  return (
    <aside className="coinInfo">
      <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{ marginBottom: 20 }}
      />
      <Typography
        variant="h3"
        style={{
          fontWeight: "bold",
          fontFamily: "Montserrat",
          marginBottom: 20,
        }}
      >
        {coin?.name}
      </Typography>

      <Typography
        style={{
          fontFamily: "Montserrat",
          width: "100%",
          padding: 25,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify",
        }}
      >
        {parse(coin?.description.en.split(". ")[0])}.
      </Typography>

      <div className="marketData">
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className="rank name">
            Rank:
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5" className="rank number">
            {coin?.market_cap_rank}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5" className="rank name">
            Current Price:
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5" className="rank number">
            {symbol}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5" className="rank name">
            Market Cap:
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5" className="rank number">
            {symbol}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            ) + "M"}
          </Typography>
        </span>
      </div>
    </aside>
  );
};

export default CoinInfo;
