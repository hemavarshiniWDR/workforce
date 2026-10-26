import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#19D27C",
    },

    background: {
      default: "#07130F",
      paper: "#0C1C16",
    },

    text: {
      primary: "#F1FFF7",
      secondary: "#8BA99A",
    },

    success: {
      main: "#19D27C",
    },
  },

  typography: {
    fontFamily: "Inter, system-ui, sans-serif",

    h4: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },

    h6: {
      fontWeight: 650,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(12, 28, 22, 0.82)",
          border: "1px solid rgba(25, 210, 124, 0.12)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
          backdropFilter: "blur(18px)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
        },
      },
    },
  },
});