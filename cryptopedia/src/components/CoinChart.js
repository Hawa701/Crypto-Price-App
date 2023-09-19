import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import CryptoContext from "../context/CryptoContext";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { chartDays } from "../config/data";
import Button from "./Button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CoinChart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = useContext(CryptoContext);
  const theme = useTheme();
  const { id } = useParams();

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricalData(data.prices);
    } catch (err) {
      console.log(err.stack);
    }
  };

  return (
    <main className="coinChart">
      {!historicalData ? (
        <CircularProgress
          sx={{ color: theme.palette.primary.main }}
          size={150}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                    : `${date.getHours()}:${date.getMinutes()}AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => {
                    return coin[1];
                  }),
                  label: `Price ( Past ${days} Days) in ${currency}`,
                  borderColor: theme.palette.primary.main,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="buttonContainer">
            {chartDays.map((day) => (
              <Button
                key={day.value}
                name={day.lable}
                onClick={() => setDays(day.value)}
                selected={day.lable === day}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default CoinChart;
