import React, { useState, useEffect } from "react";
import { RouteProps } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import { HeadingSelect } from "../components/MathsLearningComponents";
import { FourMixedOperations } from "./FourMixedOperations";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import myTheme from "../themes/myTheme";
import constants from "../constants/MathsLearningConstants";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { counterSlice } from "../store/slices";
import pic1 from "../assets/cross3.png";
import pic2 from "../assets/birds1.jpg";
import pic3 from "../assets/cross4.jpg";
import pic4 from "../assets/fiveBread.jpg";
import prayerImage from "../assets/prayer3.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mathsLearningContainer: {
      margin: "1vw",
      minHeight: "97vh",
      backgroundImage: myTheme.color.skyGradient,
    },
    headingContainer: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    scriptureVerseRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    scriptureVerseBorder: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80vw",
      borderWidth: "0.5vw",
      borderImage: myTheme.color.conicGradient,
      border: "solid",
      [theme.breakpoints.down("sm")]: {
        width: "95vw",
      },
    },
    scriptureImage: {
      height: "12vw",
      padding: "0.5vw",
      [theme.breakpoints.down("sm")]: {
        height: "20vw",
      },
    },
    scriptureVerse: {
      width: "70vw",
      fontSize: "2vw",
      color: myTheme.color.myPurple,
      [theme.breakpoints.down("sm")]: {
        width: "90vw",
        fontSize: "4vw",
      },
    },
    prayerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    prayerImage: {
      height: "6vw",
      padding: "0.5vw",
      [theme.breakpoints.down("sm")]: {
        height: "12vw",
      },
    },
    prayerText: {
      width: "60vw",
      fontSize: "2vw",
      color: myTheme.color.myPurple,
      [theme.breakpoints.down("sm")]: {
        width: "80vw",
        fontSize: "4vw",
      },
    },
    commonText: {
      fontSize: "1.4vw",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.8vw",
      },
    },
    emailRow: {},
    emailText: {
      width: "92vw",
      textAlign: "right",
      fontSize: "1.5vw",
      color: myTheme.color.myBrown,
      [theme.breakpoints.down("sm")]: {
        fontSize: "3vw",
      },
    },
  })
);

interface IAppOwnProps {
  location: RouteProps["location"];
}

const MathsLearning: React.FC<IAppOwnProps> = (props): JSX.Element => {
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState<number>(0);
  const classes = useStyles();

  const {
    languageIndex,
    bibleVersionIndex,
    topicIndex,
    learningToolIndex,
  } = useSelector((state: RootStateOrAny) => state.setting);

  const actions = counterSlice.actions;
  const dispatch = useDispatch();
  const setLanguageIndex = (value: number) =>
    dispatch(actions.setLanguageIndex(value));
  const setBibleVersionIndex = (value: number) =>
    dispatch(actions.setBibleVersionIndex(value));
  const setTopicIndex = (value: number) =>
    dispatch(actions.setTopicIndex(value));
  const setLearningToolIndex = (value: number) =>
    dispatch(actions.setLearningToolIndex(value));

  const {
    languages,
    bibleVersions,
    bibleVersionsQuestion,
    topics,
    topicsQuestion,
    learningTools,
    learningToolsQuestion,
    scriptureVerses,
    prayers,
    noticificationText,
  } = constants;
  const numberOfBibleVersions: number = 2;
  const numberOfTopics: number = 5;
  const numberOfLearningTools: number = 2;
  const numberOfScriptureVerses: number = 4;
  const scriptureImages: Array<string> = [pic1, pic2, pic3, pic4];

  useEffect(() => {
    const queryString: string = props.location?.search
      ? props.location.search
      : "";
    const urlParams: URLSearchParams = new URLSearchParams(queryString);
    const lang: string = urlParams.get("lang") || "0";
    const langIndex: number = parseInt(lang) || 0;
    if (langIndex >= 0 && langIndex < 4) {
      setLanguageIndex(langIndex);
    }
    const ver: string = urlParams.get("ver") || "0";
    const verIndex: number = parseInt(ver) || 0;
    if (verIndex >= 0 && verIndex < numberOfBibleVersions) {
      setBibleVersionIndex(verIndex);
    }
    setScriptureVerseIndex(Math.floor(Math.random() * numberOfScriptureVerses));
  }, []);

  return (
    <Grid className={classes.mathsLearningContainer}>
      <Grid container className={classes.headingContainer}>
        <HeadingSelect
          selectLabel="Language"
          selectIndex={languageIndex}
          setItemIndex={setLanguageIndex}
          itemsArray={languages}
        />
        <HeadingSelect
          selectLabel={bibleVersionsQuestion[languageIndex]}
          selectIndex={bibleVersionIndex}
          setItemIndex={setBibleVersionIndex}
          itemsArray={bibleVersions.slice(
            languageIndex * numberOfBibleVersions,
            languageIndex * numberOfBibleVersions + numberOfBibleVersions
          )}
        />
        <HeadingSelect
          selectLabel={topicsQuestion[languageIndex]}
          selectIndex={topicIndex}
          setItemIndex={setTopicIndex}
          itemsArray={topics.slice(
            languageIndex * numberOfTopics,
            languageIndex * numberOfTopics + numberOfTopics
          )}
        />
        <HeadingSelect
          selectLabel={learningToolsQuestion[languageIndex]}
          selectIndex={learningToolIndex}
          setItemIndex={setLearningToolIndex}
          itemsArray={learningTools.slice(
            (languageIndex * numberOfTopics + topicIndex) *
              numberOfLearningTools,
            (languageIndex * numberOfTopics + topicIndex + 1) *
              numberOfLearningTools
          )}
        />
      </Grid>

      <Grid className={classes.scriptureVerseRow}>
        <Grid className={classes.scriptureVerseBorder}>
          <img
            className={classes.scriptureImage}
            src={scriptureImages[scriptureVerseIndex]}
            alt="Bible Story Image"
          />
          <Typography className={classes.scriptureVerse}>
            {
              scriptureVerses[
                (languageIndex * numberOfBibleVersions + bibleVersionIndex) *
                  numberOfScriptureVerses +
                  scriptureVerseIndex
              ]
            }
          </Typography>
        </Grid>
      </Grid>

      <FourMixedOperations
        languageIndex={languageIndex}
        topic={topics[languageIndex * numberOfTopics + topicIndex]}
        learningTool={
          learningTools[
            (languageIndex * numberOfTopics + topicIndex) *
              numberOfLearningTools +
              learningToolIndex
          ]
        }
        topicIndex={topicIndex}
        learningToolIndex={learningToolIndex}
      />

      <Grid className={classes.prayerRow}>
        <img
          className={classes.prayerImage}
          src={prayerImage}
          alt="Prayer Image"
        />
        <Typography className={classes.prayerText}>
          {prayers[languageIndex]}
        </Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>
          {noticificationText[languageIndex]}
        </Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText}>
          samsoncsyuapple@gmail.com
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MathsLearning;
