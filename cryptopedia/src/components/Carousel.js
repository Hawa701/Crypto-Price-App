import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import CryptoContext from "../context/CryptoContext";
import { TrendingCoins } from "../config/api";
import AliceCarousel from "react-alice-carousel";

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}&nbsp;
          <span
            style={{ color: profit > 0 ? "green" : "red", fontWeight: 500 }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h.toFixed(2) + "%"}
          </span>
        </span>
        <span className="coinPrice">
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
