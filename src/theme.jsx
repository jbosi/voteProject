import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    background: {
      default: "#FFFFFF"
    },
    text: {
      primary: "#636363"
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: '200',
      fontSize: "2.125rem",
      lineHeight: 1.17,
      letterSpacing: "0.00735em",
    },
  },
});