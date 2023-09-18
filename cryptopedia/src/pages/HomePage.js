import React from "react";
import Banner from "../components/Banner";
import CoinsTable from "../components/CoinsTable";
import { useTheme } from "@mui/system";

const HomePage = () => {
  const theme = useTheme();

  return (
    <main className="homePage">
      <Banner />
      <CoinsTable />
    </main>
  );
};

export default HomePage;
