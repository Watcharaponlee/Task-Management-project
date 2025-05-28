import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Mitr",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),

    // กำหนด font weights ต่างๆ ของ Mitr
    h1: {
      fontFamily: "Mitr, sans-serif",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "Mitr, sans-serif",
      fontWeight: 500,
    },
    h3: {
      fontFamily: "Mitr, sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Mitr, sans-serif",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Mitr, sans-serif",
      fontWeight: 300,
    },
  },
});

export default theme;
