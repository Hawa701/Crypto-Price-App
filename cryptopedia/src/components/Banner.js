import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "../components/Carousel";

const Banner = () => {
  return (
    <div className="banner">
      <Container className="bannerContainer">
        <div className="tagLine">
          <Typography
            variant="h2"
            style={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            CryptoPedia
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "white",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favorite Crypto Currency
          </Typography>
        </div>

        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
