import { makeStyles} from "@material-ui/core/styles";

export const pagesStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  formulaColumn: {
    width: "65vw",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      maxWidth: "95vw",
    },
  },
  formulaLine: {
    fontSize: "2.5vw",
    letterSpacing: "0.6vw",
    textAlign: "left",
    justifyContent: "flex-start",
    overflow: 'auto',
    [theme.breakpoints.down("sm")]: {
      fontSize: "5vw",
    },
  },
  formulaBox: {
    width: "60vw",
    [theme.breakpoints.down("sm")]: {
      width: "82vw",
    }
  },
  verticalCenterRow: {
    display: "flex",
    alignItems: "center",
  },
  commonPadding: {
    margin: "1vw",
  },
  commonText: {
    fontSize: "2vw",
    margin: '0.5vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw",
    },
  },
  okButton: {
    height: "5vw",
    width: "6vw",
    fontSize: "2vw",
    margin: "0.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "10vw",
      width: "12vw",
      fontSize: "4vw",
    },
  },
  resetArrow: {
    fontSize: "6vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12vw",
    },
  },
}));