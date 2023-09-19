import { useTheme } from "@emotion/react";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  const date = new Date();
  return (
    <footer
      style={{
        background: theme.palette.background.header,
        color: theme.palette.primary.main,
      }}
    >
      <p>Copyrights&copy;{date.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
