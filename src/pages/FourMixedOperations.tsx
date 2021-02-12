import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector, RootStateOrAny } from "react-redux";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyKeypad } from "../components/KeypadComponents";
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import { pagesStyles } from "../themes/styles";
import myTheme from "../themes/myTheme";

interface ILongDivisionOwnProps {
  languageIndex: number;
  topic: string;
  learningTool: string;
  topicIndex: number;
  learningToolIndex: number;
}

//×÷👍👍🏻
export const FourMixedOperations: React.FC<ILongDivisionOwnProps> = ({ topic, learningTool }): JSX.Element => {
  const { languageIndex, topicIndex, learningToolIndex } = useSelector((state: RootStateOrAny) => state.setting);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">("error");
  const [formulaLinesArray, setFormulaLinesArray] = useState<Array<string>>([""]);
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState<number>(0);
  const [answersArray, setAnswersArray] = useState<Array<string>>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [maximumOperators, setMaximumOperators] = useState<number>(topicIndex + 3);
  const [acceptDecimal, setAcceptDecimal] = useState<boolean>(learningToolIndex == 0 ? false : true);
  const [numberOfDecimal, setNumberOfDecimal] = useState<number>(7);

  const timeDelay: number = 200;
  const formaulaPlaceholder: Array<string> = [
    "輸入算式",
    "输入算式",
    "Enter formula",
    "Entrez la formule"
  ];

  const topics: Array<string> = [
    "四則混合計算",
    "四则混合计算",
    "Four Mixed Operations",
    "Quatre Opérations Mixtes"
  ];

  const resultBeValidHint: Array<string> = [
    "這計算結果不是一個正整數。",
    "这计算结果不是一个正整数。",
    "The result of this calculation is not a positive integer.",
    "Le résultat de ce calcul n'est pas un entier positif.",
    "這計算結果是一個循環小數或負數。",
    "这计算结果是一个循环小数或负数。",
    "The result of this calculation is a circulating decimal or a negative number.",
    "Le résultat de ce calcul est un nombre décimal en circulation ou un nombre négatif.",
  ];

  const wellDone: Array<string> = [
    "你做得到﹗你完成了這題混合計算﹗",
    "你做得到﹗你完成了这题混合计算﹗",
    "You can do it! You have completed this mixed calculation!",
    "Vous pouvez le faire! Vous avez terminé ce calcul mixte!"
  ];

  const numberOfOperatorsHintLeft: Array<string> = [
    "最少一步計算，最多",
    "最少一步计算，最多",
    "Minimum 1 operator, maximum ",
    "Minimum 1 opérateur, maximum "
  ];

  const numberOfOperatorsHintRight: Array<string> = [
    "步計算。",
    "步计算。",
    " operators.",
    " opérateurs."
  ];

  const multiplyDivideFirstHintLeft: Array<string> = [
    "首先計算",
    "首先计算",
    "Calculate ",
    "Calculez "
  ];

  const multiplyDivideFirstHintRight: Array<string> = [
    "，因為乘法或除法應在加法或減法之前計算。",
    "，因为乘法或除法应在加法或减法之前计算。",
    " first because multiplication or division should be calculated before addition or subtraction.",
    " d'abord parce que la multiplication ou la division doit être calculée avant l'addition ou la soustraction."
  ];

  const exchangeToAvoidNegativeHint: Array<string> = [
    "避免那減法得到一個負數。",
    "避免那减法得到一个负数。",
    " to avoid the subtraction getting a negative number.",
    " pour éviter que la soustraction n'obtienne un nombre négatif.",
  ];

  const exchangeToAvoidDecimalHint: Array<string> = [
    "避免那除法得到一個小數。",
    "避免那除法得到一个小数。",
    " to avoid the division getting a decimal number.",
    " pour éviter que la division n'obtienne un nombre décimal.",
    "避免那除法得到一個循環小數。",
    "避免那除法得到一个循环小数。",
    " to avoid the division getting a circulating decimal.",
    " pour éviter que la division ne reçoive une décimale en circulation."
  ];

  const orText: Array<string> = [
    "或",
    "或",
    " or ",
    " ou "
  ];

  const calculateFirstHintLeft: Array<string> = [
    "首先計算",
    "首先计算",
    "Calculate ",
    "Calculez d'abord "
  ];

  const calculateFirstHintRight: Array<string> = [
    "。",
    "。",
    " first.",
    "."
  ];

  const subtractGetTensHint: Array<string> = [
    "因為這減法可以得到整十或整百，這使下一步計算變得更容易。",
    "因为这减法可以得到整十或整百，这使下一步计算变得更容易。",
    " because this subtraction can get the whole tens or the whole hundreds, it makes the next calculation easier.",
    " parce que cette soustraction peut obtenir les dizaines entières ou les centaines entières, elle facilite le calcul suivant."
  ];

  const divideGetSmallerHint: Array<string> = [
    "因為這除法可以得到一個較小的數，這使下一步計算變得更容易。",
    "因为这除法可以得到一个较小的数，这使下一步计算变得更容易。",
    " because this division can get a smaller number, which makes the next calculation easier.",
    " parce que cette division peut obtenir un nombre plus petit, ce qui facilite le prochain calcul."
  ];

  const rearrangeHintLeft: Array<string> = [
    "重新排列算式以便先計算",
    "重新排列算式以便先计算",
    "Rearrange the formula to calculate ",
    "Réorganiser la formule pour calculer d'abord "
  ];

  const rearrangeHintRight: Array<string> = [
    "，",
    "，",
    " first ",
    " "
  ];

  useEffect(() => {
    setAcceptDecimal(learningToolIndex == 0 ? false : true);
    resetClick();
  }, [learningToolIndex]);

  useEffect(() => {
    setMaximumOperators(topicIndex + 3);
    resetClick();
  }, [topicIndex])

  const closeAlert: () => void = () => {
    setOpenAlert(false);
  };

  const resetClick: () => void = () => {
    setSeverity("error");
    setFormulaLinesArray([""]);
    setFormulaFocusedIndex(0);
    setCompleted(false);
  };

  const okClick: () => void = () => {
    //check last character is an operator
    let tmpString: string = formulaLinesArray[formulaFocusedIndex];
    let lastChar: string = tmpString.slice(tmpString.length - 1);
    if (["+", "-", "×", "÷"].includes(lastChar)) {
      return;
    }
    //replace last formula hints
    let replacedHint: string = errorMessage.replace(/\*/g, "×");
    replacedHint = replacedHint.replace(/\//g, "÷");
    setErrorMessage(replacedHint);
    //replace this formula
    let replacedString: string = formulaLinesArray[formulaFocusedIndex].replace(/×/g, "*");
    replacedString = replacedString.replace(/÷/g, "/");

    //first formula
    if (formulaFocusedIndex == 0) {
      //check answer is a positive integer
      let tmpValue: number = Math.round(eval(replacedString) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
      if (((Number.isInteger(tmpValue) && !acceptDecimal) || (Number(tmpValue.toFixed(numberOfDecimal)) == tmpValue && acceptDecimal)) && tmpValue >= 0) {
        nextStepPreparation(replacedString);
      } else {
        //not a positive integer
        setErrorMessage(resultBeValidHint[learningToolIndex * 4 + languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
      }
    } else {
      //other steps or answer
      //correct steps 

      let correctStep: boolean = false;
      let i: number;
      for (i = 0; i < answersArray.length; i++) {
        if (answersArray[i] == replacedString) {
          correctStep = true;
        }
      }
      if (correctStep) {
        if (replacedString.includes("+") || replacedString.includes("-") || replacedString.includes("*") || replacedString.includes("/")) {
          nextStepPreparation(replacedString);
        } else {
          setErrorMessage("👍🏻" + wellDone[languageIndex]);
          setFormulaFocusedIndex(formulaFocusedIndex + 1);
          setCompleted(true);
          setSeverity("success");
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
        }
      } else {
        //wrong steps
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
      }
    }
  };

  function nextStepPreparation(replacedString: string): void {
    let tmpAnswersArray: Array<string> = generateAnswersArray(replacedString);
    //formula cannot generate next step
    if (tmpAnswersArray[0] == "false") {
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else {
      //formula can generate next step
      setAnswersArray(tmpAnswersArray);
      let tmpFormulaLinesArray: Array<string> = [...formulaLinesArray];
      tmpFormulaLinesArray.push("");
      setFormulaLinesArray(tmpFormulaLinesArray);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
    }
  }

  function generateAnswersArray(replacedString: string): Array<string> {
    //create operatorsStringArray and operatorsIndexArray
    const { operatorsStringArray, operatorsIndexArray }: { operatorsStringArray: string[]; operatorsIndexArray: number[]; } = createIndexArrays(replacedString);
    let thisAnswersArray: Array<string> = [];//["3+4*2", "4*2+3"]

    //check no more than 3 operators
    if (operatorsStringArray.length > maximumOperators || operatorsIndexArray.length == 0) {
      setErrorMessage(numberOfOperatorsHintLeft[languageIndex] + maximumOperators + numberOfOperatorsHintRight[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return ["false"];
    } else {
      //go to generate answers array
      //check it has + or -
      if (operatorsStringArray.includes("+") || operatorsStringArray.includes("-")) {
        //check it is mixed
        if (operatorsStringArray.includes("*") || operatorsStringArray.includes("/")) {
          thisAnswersArray = fourMixedFunction(replacedString, operatorsStringArray, operatorsIndexArray);
        } else {
          //it has + and - only
          thisAnswersArray = addSubtract(replacedString, operatorsStringArray, operatorsIndexArray);
        }
      } else {
        //it has * and / only
        thisAnswersArray = multiplyDivide(replacedString, operatorsStringArray, operatorsIndexArray);
      }
      return thisAnswersArray;
    }

  }

  function fourMixedFunction(replacedString: string, getOperatorsStringArray: Array<string>, getOperatorsIndexArray: Array<number>): Array<string> {
    let thisAnswersArray: Array<string> = [];
    let previousIndex: number = -1;
    let pushedOperatorsStringArray: Array<string> = getOperatorsStringArray;
    //for the case of chain * and / at the end
    pushedOperatorsStringArray.push("+");
    let i: number;
    let firstHint: boolean = true;
    let firstHintText: string = "";
    for (i = 0; i < pushedOperatorsStringArray.length; i++) {
      if (["+", "-"].includes(pushedOperatorsStringArray[i])) {
        //check there is chain * and /
        if (i - previousIndex > 2) {
          firstHint = false;
          let startString: string = replacedString.substring(0, getOperatorsIndexArray[previousIndex + 1] + 1);
          let operationsString: string = replacedString.substring(getOperatorsIndexArray[previousIndex + 1] + 1, getOperatorsIndexArray[i + 1]);
          let endString: string = replacedString.substring(getOperatorsIndexArray[i + 1]);
          const { operatorsStringArray, operatorsIndexArray }: { operatorsStringArray: string[]; operatorsIndexArray: number[]; } = createIndexArrays(operationsString);
          let tmpAnswersArray: Array<string> = multiplyDivide(operationsString, operatorsStringArray, operatorsIndexArray);
          let j: number;
          for (j = 0; j < tmpAnswersArray.length; j++) {
            tmpAnswersArray[j] = startString + tmpAnswersArray[j] + endString;
            thisAnswersArray.push(tmpAnswersArray[j]);
          }
        }

        //not a chain also a valid answer
        else {
          //check there is one * or /
          if (i - previousIndex == 2) {
            let tmpHintString: string = "";
            const { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = getAnswerString(replacedString, getOperatorsIndexArray, i - 1, i - 1);
            if (tmpAnswer == "false") {
              thisAnswersArray = [tmpAnswer];
              firstHintText = tmpHint;
              i = pushedOperatorsStringArray.length;
            } else {
              tmpHintString += (tmpHintString == "" ? "" : orText[languageIndex]) + tmpHint;
              thisAnswersArray.push(tmpAnswer);
              tmpHintString = multiplyDivideFirstHintLeft[languageIndex] + tmpHintString + multiplyDivideFirstHintRight[languageIndex];
              if (firstHint) {
                firstHintText = tmpHintString;
                firstHint = false;
              }
            }
          }
        }
        previousIndex = i;
      }
    }
    if (firstHintText != "") {
      setErrorMessage(firstHintText);
    }
    return thisAnswersArray;
  }

  function addSubtract(replacedString: string, operatorsStringArray: Array<string>, operatorsIndexArray: Array<number>): Array<string> {
    let thisAnswersArray: Array<string> = [];
    let thisHints: string = "";
    if (operatorsStringArray[0] == "-") {
      //check first "-" gets negative number
      if (eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) < 0) {
        //one exchange
        let i: number;
        let firstHint: boolean = true;
        for (i = 1; i < operatorsStringArray.length; i++) {
          if (operatorsStringArray[i] == "+") {
            const { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, i);
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              setErrorMessage(tmpHint + exchangeToAvoidNegativeHint[languageIndex]);
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "-"
        const { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = getAnswerString(replacedString, operatorsIndexArray, 0, 0);
        setErrorMessage(calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex]);
        thisAnswersArray.push(tmpAnswer);
        return thisAnswersArray;
      }
    } else {
      //check subtract to tens or hundreds
      let j: number;
      let firstHint: boolean = true;
      for (j = 1; j < operatorsStringArray.length; j++) {
        if (operatorsStringArray[j] == "-") {
          let { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, j);
          let tmpOperationString: string = tmpAnswer.substring(0, tmpAnswer.indexOf("+"));
          let tmpNumber: number = eval(tmpOperationString);
          //check result is tens or hundreds
          if ((tmpNumber >= 0 && tmpNumber < 100 && tmpNumber % 10 == 0) || (tmpNumber >= 100 && tmpNumber % 100 == 0)) {
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              setErrorMessage(tmpHint + subtractGetTensHint[languageIndex]);
              firstHint = false;
            }
          }
        }
      }
      if (!firstHint) {
        return thisAnswersArray;
      }
      //"+" chain
      let i;
      for (i = 0; i < operatorsStringArray.length; i++) {
        if (operatorsStringArray[i] == "+") {
          const { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = getAnswerString(replacedString, operatorsIndexArray, 0, i);
          thisAnswersArray.push(tmpAnswer);
          thisHints += (thisHints == "" ? "" : orText[languageIndex]) + tmpHint;
        } else {
          i = operatorsStringArray.length;
        }
      }
      thisHints = calculateFirstHintLeft[languageIndex] + thisHints + calculateFirstHintRight[languageIndex];
      setErrorMessage(thisHints);
      return thisAnswersArray;
    }
  }

  function multiplyDivide(replacedString: string, operatorsStringArray: Array<string>, operatorsIndexArray: Array<number>): Array<string> {
    let thisAnswersArray: Array<string> = [];
    let thisHints: string = "";
    if (operatorsStringArray[0] == "/") {
      //check first "/" gets decimal number
      let tmpValue: number = Math.round(eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
      if ((!Number.isInteger(tmpValue) && !acceptDecimal) || (Number(tmpValue.toFixed(numberOfDecimal)) != tmpValue) && acceptDecimal) {
        //one exchange
        let i: number;
        let firstHint: boolean = true;
        for (i = 1; i < operatorsStringArray.length; i++) {
          if (operatorsStringArray[i] == "*") {
            let { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, i);
            thisAnswersArray.push(tmpAnswer);
            if (firstHint == true) {
              setErrorMessage(tmpHint + exchangeToAvoidDecimalHint[languageIndex]);
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "/"
        const { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = getAnswerString(replacedString, operatorsIndexArray, 0, 0);
        setErrorMessage(calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex]);
        thisAnswersArray.push(tmpAnswer);
        return thisAnswersArray;
      }
    } else {
      //check division to an integer
      let j: number;
      let firstHint: boolean = true;
      for (j = 1; j < operatorsStringArray.length; j++) {
        if (operatorsStringArray[j] == "/") {
          let { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, j);
          let tmpOperationString: string = tmpAnswer.substring(0, tmpAnswer.indexOf("*"));
          let tmpNumber: number = Math.round(eval(tmpOperationString) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
          //check result is an integer
          if ((Number.isInteger(tmpNumber) && !acceptDecimal) || (Number(tmpNumber.toFixed(numberOfDecimal)) == tmpNumber && acceptDecimal)) {
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              setErrorMessage(tmpHint + divideGetSmallerHint[languageIndex]);
              firstHint = false;
            }
          }
        }
      }
      if (!firstHint) {
        return thisAnswersArray;
      }
      //"*" chain
      let i: number;
      for (i = 0; i < operatorsStringArray.length; i++) {
        if (operatorsStringArray[i] == "*") {
          const { tmpAnswer, tmpHint }: { tmpAnswer: string; tmpHint: string; } = getAnswerString(replacedString, operatorsIndexArray, 0, i);
          thisAnswersArray.push(tmpAnswer);
          thisHints += (thisHints == "" ? "" : orText[languageIndex]) + tmpHint;
        } else {
          i = operatorsStringArray.length;
        }
      }
      thisHints = calculateFirstHintLeft[languageIndex] + thisHints + calculateFirstHintRight[languageIndex];
      setErrorMessage(thisHints);
      return thisAnswersArray;
    }
  }

  function exchange(replacedString: string, operatorsStringArray: Array<string>, operatorsIndexArray: Array<number>, index: number): { tmpAnswer: string; tmpHint: string; } {
    let startString: string = replacedString.substring(0, operatorsIndexArray[1]);
    let firstOperation: string = replacedString.substring(operatorsIndexArray[1], operatorsIndexArray[index + 1]);
    let secondOperation: string = replacedString.substring(operatorsIndexArray[index + 1], operatorsIndexArray[index + 1 + 1]);
    let endString: string = replacedString.substring(operatorsIndexArray[index + 1 + 1]);
    let tmpAnswer: string = startString + secondOperation + firstOperation + endString;
    let tmpHint: string = rearrangeHintLeft[languageIndex] + startString + secondOperation + rearrangeHintRight[languageIndex];
    //setErrorMessage(tmpHint);
    return { tmpAnswer, tmpHint };
  }

  //calculate the operator at index
  function getAnswerString(replacedString: string, operatorsIndexArray: Array<number>, startIndex: number, endIndex: number): { tmpAnswer: string; tmpHint: string; } {
    let tmpAnswer: string = "";
    let tmpHint: string = "";
    //value from this operator
    let operationString: string = replacedString.substring(operatorsIndexArray[startIndex + 1 - 1] + 1, operatorsIndexArray[endIndex + 1 + 1]);
    let value: number = Math.round(eval(operationString) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
    if (((Number.isInteger(value) && !acceptDecimal) || (Number(value.toFixed(numberOfDecimal)) == value && acceptDecimal)) && value >= 0) {
      //this step is a positive integer
      //set one of possible hints
      tmpHint = operationString;
      let startString: string = replacedString.substring(0, operatorsIndexArray[startIndex + 1 - 1] + 1);
      let valueString: string = value.toString();
      let endString: string = replacedString.substring(operatorsIndexArray[endIndex + 1 + 1]);
      tmpAnswer = startString + valueString + endString;
      return { tmpAnswer, tmpHint };
    } else {
      //this step is not a positive integer
      tmpHint = resultBeValidHint[learningToolIndex * 4 + languageIndex];
      tmpAnswer = "false";
      return { tmpAnswer, tmpHint };
    }
  }

  function createIndexArrays(replacedString: string): { operatorsStringArray: Array<string>; operatorsIndexArray: Array<number>; } {
    let operatorsStringArray: Array<string> = [];//eg.["+","-","-"]
    let operatorsIndexArray: Array<number> = [-1];//eg.[-1,4,6,9]

    //create operatorsStringArray and operatorsIndexArray
    let i: number;
    for (i = 0; i < replacedString.length; i++) {
      if (["+", "-", "*", "/"].includes(replacedString.slice(i, i + 1))) {
        operatorsStringArray.push(replacedString.slice(i, i + 1));
        operatorsIndexArray.push(i);
      }
    }
    operatorsIndexArray.push(replacedString.length);
    return { operatorsStringArray, operatorsIndexArray };
  }

  const handleKeypadClick: (key: string) => void = (key: string) => {
    if (formulaFocusedIndex == formulaLinesArray.length - 1) {
      let tmpFormulaLinesArray: Array<string> = [...formulaLinesArray];
      if (key == "<-") {
        tmpFormulaLinesArray[formulaFocusedIndex] = tmpFormulaLinesArray[formulaFocusedIndex].slice(0, -1);
      } else {
        let tmpString: string = tmpFormulaLinesArray[formulaFocusedIndex];
        let lastChar: string = tmpString.slice(tmpString.length - 1);
        if (!(["+", "-", "×", "÷", ""].includes(lastChar) && ["+", "-", "×", "÷"].includes(key))) {
          tmpFormulaLinesArray[formulaFocusedIndex] += key;
        }
      }
      setFormulaLinesArray(tmpFormulaLinesArray);
    }
  }

  const classes = pagesStyles();

  return (
    <MyFrame topic={topics[languageIndex] + ": " + topic} learningTool={learningTool}>
      <Grid className={classes.centerRow}>
        <Grid className={classes.formulaColumn}>
          {
            formulaLinesArray.map((formula, index) => {
              return <Grid key={index} className={`${classes.verticalCenterRow} ${classes.commonPadding}`}>
                <Typography
                  className={classes.formulaLine}
                  style={{ opacity: index == 0 ? 0 : 1 }}
                >=</Typography>
                <Button
                  className={`${classes.formulaLine} ${classes.formulaBox}`}
                  variant="outlined"
                  style={{
                    borderColor: (index == formulaFocusedIndex) ? myTheme.color.myMagenta : myTheme.color.blue,
                    borderWidth: (index == formulaFocusedIndex) ? 3 : 1
                  }}
                >{formula == "" ? formaulaPlaceholder[languageIndex] : formula}</Button>
                {
                  index == formulaFocusedIndex &&
                  <Button
                    className={classes.okButton}
                    variant="contained"
                    onClick={okClick}
                    color="primary"
                  >OK</Button>
                }
                {
                  index == formulaLinesArray.length - 1 && completed &&
                  <Button
                    className={classes.okButton}
                    variant="contained"
                    onClick={resetClick}
                    color="primary"
                  ><ForwardRoundedIcon className={classes.resetArrow} /></Button>
                }
              </Grid>
            })
          }
        </Grid>
      </Grid>
      <MyKeypad
        handleClick={handleKeypadClick}
        acceptDecimal={acceptDecimal}
      />
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
    </MyFrame>
  );
}
