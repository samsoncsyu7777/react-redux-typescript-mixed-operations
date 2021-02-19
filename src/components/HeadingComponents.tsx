import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import myTheme from "../themes/myTheme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    frame: {},
    centerRow: {
      display: "flex",
      justifyContent: "center",
    },
    topic: {
      fontSize: "2.4vw",
      color: myTheme.color.myOrange,
      [theme.breakpoints.down("sm")]: {
        fontSize: "4.8vw",
        textAlign: "center",
      },
    },
    learningTool: {
      fontSize: "1.6vw",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.2vw",
      },
    },
  })
);

interface IHeadingComponentsOwnProps {
  topic: string;
  learningTool: string;
}

export const MyFrame: React.FC<IHeadingComponentsOwnProps> = ({
  children,
  topic,
  learningTool,
  ...otherProps
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid className={classes.frame} {...otherProps}>
      <Grid className={classes.centerRow}>
        <Typography className={classes.topic}>{topic}</Typography>
      </Grid>
      <Grid className={classes.centerRow}>
        <Typography className={classes.learningTool}>{learningTool}</Typography>
      </Grid>
      {children}
    </Grid>
  );
};
