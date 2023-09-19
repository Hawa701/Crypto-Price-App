import { useTheme } from "@emotion/react";
import React, { useState } from "react";

const Button = ({ name, onClick, selected }) => {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState(selected);

  return (
    <button
      className="btn"
      onClick={onClick}
      style={{
        color: isSelected ? "black" : theme.palette.text.primary,
        fontWeight: isSelected ? 700 : 500,
      }}
    >
      {name}
    </button>
  );
};

export default Button;
