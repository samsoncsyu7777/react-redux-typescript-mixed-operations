import React, { SyntheticEvent } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      fontSize: "2vw",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4vw",
      },
    },
  })
);

interface IAlertComponentsOwnProps {
  open: boolean;
  closeAlert: (event: SyntheticEvent<Element, Event>) => void;
  errorMessage: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

export const AlertSnackbar: React.FC<IAlertComponentsOwnProps> = ({
  open,
  closeAlert,
  errorMessage,
  severity,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
      <MuiAlert
        elevation={6}
        variant="filled"
        className={classes.alert}
        onClose={closeAlert}
        severity={severity}
      >
        <div>{errorMessage}</div>
      </MuiAlert>
    </Snackbar>
  );
};
