import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoContext from "../context/CryptoContext";
import axios from "axios";
import { CoinList } from "../config/api";
import { numberWithCommas } from "./Carousel";
import { useTheme } from "@mui/system";
import {
  Container,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currency, symbol } = useContext(CryptoContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

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

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>

          <TextField
            label="Search For a Crypto Currency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 20, width: "100%" }}
          />
          <TableContainer>
            {isLoading ? (
              <LinearProgress
                variant="determinate"
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              />
            ) : (
              <>
                <Table>
                  <TableHead
                    style={{ backgroundColor: theme.palette.primary.dark }}
                  >
                    <TableRow>
                      {["Coin", "Price", "24h Change", "Market Cap"].map(
                        (head) => (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: "700",
                              fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                          >
                            {head}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch().map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className="coinRow"
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div className="coinFullname">
                              <span className="symbol">{row.symbol}</span>
                              <span className="coinName">{row.name}</span>
                            </div>
                          </TableCell>

                          <TableCell align="right">
                            {symbol}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "green" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2) + "%"}
                          </TableCell>

                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            ) + "M"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default CoinsTable;
