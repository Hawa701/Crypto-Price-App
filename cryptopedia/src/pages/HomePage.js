import React from "react";
import Banner from "../components/Banner";
import { useTheme } from "@mui/system";

const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      <Banner />
    </>
  );
};

export default HomePage;
