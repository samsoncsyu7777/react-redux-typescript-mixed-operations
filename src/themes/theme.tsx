import { colors, createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 30,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    primary: { main: "#FF0000" },
    secondary: { main: "#0055FF" },
  },
});
