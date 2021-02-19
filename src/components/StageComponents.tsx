import React from "react";
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import myTheme from "../themes/myTheme";
const stageButtonsStyles = makeStyles(() =>
  createStyles({
    centerRow: {
      display: "flex",
      justifyContent: "center",
    },
    verticalCenterRow: {
      display: "flex",
      alignItems: "center",
    },
    stageText: {
      fontSize: 20,
      color: myTheme.color.myBlue,
    },
  })
);

interface IStageButtonsOwnProps {
  stageText: string;
  stages: Array<string>;
  handleStageClick: (stage: number) => void;
  stageState: number;
  manual: string;
}

export const StageButtons: React.FC<IStageButtonsOwnProps> = ({
  stageText,
  stages,
  handleStageClick,
  stageState,
  manual,
}): JSX.Element => {
  const classes = stageButtonsStyles();

  return (
    <Grid>
      <Grid
        container
        className={`${classes.centerRow} ${classes.verticalCenterRow}`}
      >
        <Typography className={classes.stageText}>{stageText}</Typography>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {stages.map((stage, index) => {
            let color: "primary" | "secondary" =
              stageState === parseInt(stage) ? "secondary" : "primary";
            let bgColor: string =
              stageState === parseInt(stage) ? myTheme.color.myYellow : "";
            return (
              <Button
                key={parseInt(stage)}
                color={color}
                style={{ backgroundColor: bgColor }}
                onClick={() => handleStageClick(parseInt(stage))}
              >
                {parseInt(stage) + 1}
              </Button>
            );
          })}
        </ButtonGroup>
        <Button
          variant="outlined"
          color={stageState === -1 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -1 ? myTheme.color.myYellow : "",
          }}
          onClick={() => handleStageClick(-1)}
        >
          {manual}
        </Button>
      </Grid>
    </Grid>
  );
};
