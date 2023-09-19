import { useTheme } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

const MissingPage = () => {
  const theme = useTheme();

  return (
    <main
      className="missingPage"
      style={{
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <h1>404 Page not Found!</h1>
      <p>Looks like the page doesn't exist.</p>
      <Link to="/">Go back to Homepage</Link>
    </main>
  );
};

export default MissingPage;
