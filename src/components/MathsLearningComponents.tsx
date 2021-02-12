import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import {
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import myTheme from "../themes/myTheme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headingSelectRow: {
      flexDirection: "row",
      display: "flex",
      padding: "0.5vw",
      paddingBottom: "1.4vh",
    },
    selectLabel: {
      fontSize: "1.8vw",
      color: myTheme.color.myBlack,
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.6vw",
      },
    },
    selectText: {
      fontSize: "1.4vw",
      color: myTheme.color.myBlue,
      height: "2vw",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.8vw",
        height: "4vw",
      },
    },
    selectWidth: {
      width: "12vw",
      [theme.breakpoints.down("sm")]: {
        width: "24vw",
      },
    },
    selectIcon: {
      fontSize: "2vw",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4vw",
      },
    },
  }));

interface IMLComponentsOwnProps {
  selectLabel: string;
  selectIndex: number;
  setItemIndex: (value: number) => {
    payload: any;
    type: string;
  };  itemsArray: Array<string>;
}

export const HeadingSelect: React.FC<IMLComponentsOwnProps> = ({ selectLabel, selectIndex, setItemIndex, itemsArray }): JSX.Element => {
  const handleSelect: (event: ChangeEvent<{ name?: string; value: unknown;}> | undefined) => void = (event: ChangeEvent<{ name?: string; value: unknown; }> | undefined): void => {
    let selectedValue: number | unknown = event ? event.target.value : selectIndex;
    if (typeof selectedValue === "number") {
      setItemIndex(selectedValue);
    }
  };

  const classes = useStyles();

  return (
    <Grid className={classes.headingSelectRow}>
      <InputLabel className={classes.selectLabel}>{selectLabel}:</InputLabel>
      <Select
        variant="outlined"
        className={`${classes.selectText} ${classes.selectWidth}`}
        inputProps={{
          classes: {
            icon: classes.selectIcon,
          },
        }}
        value={selectIndex}
        onChange={handleSelect}
      >
        {
          itemsArray.map((language, index) => {
            return <MenuItem key={index} className={classes.selectText} value={index}>{language}</MenuItem>
          })
        }
      </Select>
    </Grid>
  )
}