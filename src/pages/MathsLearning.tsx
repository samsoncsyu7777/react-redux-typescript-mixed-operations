import React, { useState, useEffect } from 'react';
import { RouteProps } from "react-router";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import {
  HeadingSelect,
} from "../components/MathsLearningComponents";
import {
  FourMixedOperations,
} from "./FourMixedOperations";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import myTheme from "../themes/myTheme";
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
    emailRow: {

    },
    emailText: {
      width: "92vw",
      textAlign: "right",
      fontSize: "1.5vw",
      color: myTheme.color.myBrown,
      [theme.breakpoints.down("sm")]: {
        fontSize: "3vw",
      },
    }
  }),
);

interface IAppOwnProps {
  location: RouteProps["location"];
}

const MathsLearning: React.FC<IAppOwnProps> = (props): JSX.Element => {
  const [languageIndex, setLanguageIndex] = useState<number>(2);//0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState<number>(0);//0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState<number>(0);//1
  const [learningToolIndex, setLearningToolIndex] = useState<number>(0);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState<number>(0);
  const classes = useStyles();

  const numberOfBibleVersions: number = 2;
  const numberOfTopics: number = 5;
  const numberOfLearningTools: number = 2;
  const numberOfScriptureVerses: number = 4;
  const scriptureImages: Array<string> = [pic1, pic2, pic3, pic4];
  const languages: Array<string> = ["繁體中文", "简体中文", "English", "Française"];
  const bibleVersions: Array<string> = ["天主教", "基督教", "天主教", "基督教", "Catholic", "Christian", "Catholique", "Chrétienne"];
  const bibleVersionsQuestion: Array<string> = ["經文版本", "经文版本", "Scripture version", "Version biblique"];
  const topics: Array<string> = [
    "三步計算", "四步計算", "五步計算", "六步計算", "七步計算",
    "三步计算", "四步计算", "五步计算", "六步计算", "七步计算",
    "Three-step calculation", "Four-step calculation", "Five-step calculation", "Six-step calculation", "Seven-step calculation",
    "Calcul en trois étapes", "Calcul en quatre étapes", "Calcul en cinq étapes", "Calcul en six étapes", "Calcul en sept étapes"
  ];
  const topicsQuestion: Array<string> = ["主題", "主题", "Topic", "Sujet"];
  const learningTools: Array<string> = [
    "整數計算", "小數計算", "整數計算", "小數計算", "整數計算", "小數計算", "整數計算", "小數計算", "整數計算", "小數計算",    
    "整数计算", "小数计算", "整数计算", "小数计算", "整数计算", "小数计算", "整数计算", "小数计算", "整数计算", "小数计算",
    "Integer Calculation", "Decimal Calculation", "Integer Calculation", "Decimal Calculation", "Integer Calculation", "Decimal Calculation", "Integer Calculation", "Decimal Calculation", "Integer Calculation", "Decimal Calculation",
    "Calcul d'entiers", "Calcul décimal", "Calcul d'entiers", "Calcul décimal", "Calcul d'entiers", "Calcul décimal", "Calcul d'entiers", "Calcul décimal", "Calcul d'entiers", "Calcul décimal"
  ];
  const learningToolsQuestion: Array<string> = [
    "計算方法", "计算方法", "Calculation Method", "Méthode de calcul"
  ];
  const scriptureVerses: Array<string> = [//Matthew25:20, Genesis1:22, Genesis2:10, Mark6:41
    //traditional chinese
    "那領了五個『塔冷通』的上前來，呈上另外五個『塔冷通』說：主啊！你曾交給我五個『塔冷通』，看，我賺了另外五個『塔冷通』。瑪25:20",
    "天主看了認為好。遂祝福牠們說：「你們要孳生繁殖，充滿海洋；飛鳥也要在地上繁殖！」創1:21-22",
    "有一條河由伊甸流出灌溉樂園，由那裏分為四支。創2:10",
    "耶穌拿起那五個餅和那兩條魚來，舉目向天，祝福了，把餅擘開，遞給門徒，叫他們擺在眾人面前，把兩條魚也分給眾人。谷6:41",
    "那領五千的又帶著另外的五千來，說：『主啊，你交給我五千。請看，我又賺了五千。』太25:20",
    "神看為好的。神就賜福給這一切，說：「要繁殖增多，充滿在海的水裏；飛鳥也要在地上增多。」創1:21-22",
    "有一條河從伊甸流出來，滋潤那園子，從那裏分成四個源頭。創2:10",
    "耶穌拿著這五個餅和兩條魚，望著天祝福，擘開餅，遞給門徒，擺在眾人面前，也把那兩條魚分給眾人。可6:41",
    //simplified chinese
    "那领了五个『塔冷通』的上前来，呈上另外五个『塔冷通』说：主啊！你曾交给我五个『塔冷通』，看，我赚了另外五个『塔冷通』。玛25:20",
    "天主看了认为好。遂祝福它们说：「你们要孳生繁殖，充满海洋；飞鸟也要在地上繁殖！」创1:21-22",
    "有一条河由伊甸流出灌溉乐园，由那里分为四支。创2:10",
    "耶稣拿起那五个饼和那两条鱼来，举目向天，祝福了，把饼擘开，递给门徒，叫他们摆在众人面前，把两条鱼也分给众人。谷6:41",
    "那领五千的又带着另外的五千来，说：『主啊，你交给我五千。请看，我又赚了五千。』太25:20",
    "神看为好的。神就赐福给这一切，说：「要繁殖增多，充满在海的水里；飞鸟也要在地上增多。」创1:21-22",
    "有一条河从伊甸流出来，滋润那园子，从那里分成四个源头。创2:10",
    "耶稣拿着这五个饼和两条鱼，望着天祝福，擘开饼，递给门徒，摆在众人面前，也把那两条鱼分给众人。可6:41",
    //english
    "The man who had received the five talents came forward bringing five more. 'Sir,' he said, 'you entrusted me with five talents; here are five more that I have made.'Matthew25:20",
    "God saw that it was good. God blessed them, saying, 'Be fruitful, multiply, and fill the waters of the seas; and let the birds multiply on land.'Genesis1:21-22",
    "A river flowed from Eden to water the garden, and from there it divided to make four streams.Genesis2:10",
    "Then he took the five loaves and the two fish, raised his eyes to heaven and said the blessing; then he broke the loaves and began handing them to his disciples to distribute among the people. He also shared out the two fish among them all.Mark6:41",
    "And he who had the five talents came with his other five talents, saying, Lord, you gave into my care five talents: see, I have got five more.Matthew25:20",
    "God saw that it was good. And God gave them his blessing, saying, Be fertile and have increase, making all the waters of the seas full, and let the birds be increased in the earth.Genesis1:21-22",
    "And a river went out of Eden giving water to the garden; and from there it was parted and became four streams.Genesis2:10",
    "And he took the five cakes of bread and the two fishes and, looking up to heaven, he said words of blessing over them; and when the cakes were broken, he gave them to the disciples to put before the people; and he made division of the two fishes among them all.Mark6:41",
    //french
    "S'avançant, celui qui avait reçu les cinq talents en présenta cinq autres, en disant: ' Maître, vous m'aviez remis cinq talents; voici cinq autres talents que j'ai gagnés. 'Matthieu25:20",
    "Et Dieu vit que cela était bon. Et Dieu les bénit, en disant: ' Soyez féconds et multipliez, et remplissez les eaux de la mer, et que les oiseaux multiplient sur la terre. 'Genèse1:21-22",
    "Un fleuve sortait d'Eden pour arroser le jardin, et de là il se partageait en quatre bras.Genèse2:10",
    "Et il prit les cinq pains et les deux poissons, leva les yeux au ciel, prononça la bénédiction, rompit les pains et les donna aux disciples, pour qu'ils les leur servissent; il partagea aussi les deux poissons entre tous.Marc6:41",
    "Celui qui avait reçu les cinq sacs d’argent s'approcha, en apporta cinq autres et dit : ‘Seigneur, tu m'as remis cinq sacs d’argent. En voici cinq autres que j'ai gagnés.’Matthieu25:20",
    "Dieu vit que c'était bon, et il les bénit en disant : « Reproduisez-vous, devenez nombreux et remplissez les mers, et que les oiseaux se multiplient sur la terre ! »Genèse1:21-22",
    "Un fleuve sortait d'Eden pour arroser le jardin, et de là il se divisait en quatre bras.Genèse2:10",
    "Il prit les cinq pains et les deux poissons, leva les yeux vers le ciel et prononça la prière de bénédiction. Puis il rompit les pains et les donna aux disciples afin qu'ils les distribuent à la foule. Il partagea aussi les deux poissons entre tous.Marc6:41"
  ];
  const prayers: Array<string> = [
    "慈愛的天父，感謝祢賜給我生命，求祢加給我生命中所需要的恩典！",
    "慈爱的天父，感谢祢赐给我生命，求祢加给我生命中所需要的恩典！",
    "Gracious Father, thank you for giving me life, please give me the grace I need in life!",
    "Gracieux Père, merci de m'avoir donné la vie, donnez-moi s'il vous plaît la grâce dont j'ai besoin dans la vie!"
  ];
  const noticificationText: Array<string> = [
    "開啟通知，計算過程會顯示提示。",
    "开启通知，计算过程会显示提示。",
    "Turn on the notification, prompts will be displayed during the calculation.",
    "Activez la notification, des invites seront affichées pendant le calcul."
  ];

  useEffect(() => {
    const queryString: string = props.location?.search ? props.location.search : "";
    const urlParams: URLSearchParams = new URLSearchParams(queryString);
    const lang: string = urlParams.get("lang") || "2";
    const langIndex: number = parseInt(lang) || 2;
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
    <Grid className={classes.mathsLearningContainer} >
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
          itemsArray={bibleVersions.slice(languageIndex * numberOfBibleVersions, languageIndex * numberOfBibleVersions + numberOfBibleVersions)}
        />
        <HeadingSelect
          selectLabel={topicsQuestion[languageIndex]}
          selectIndex={topicIndex}
          setItemIndex={setTopicIndex}
          itemsArray={topics.slice(languageIndex * numberOfTopics, languageIndex * numberOfTopics + numberOfTopics)}
        />
        <HeadingSelect
          selectLabel={learningToolsQuestion[languageIndex]}
          selectIndex={learningToolIndex}
          setItemIndex={setLearningToolIndex}
          itemsArray={learningTools.slice((languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools, (languageIndex * numberOfTopics + topicIndex + 1) * numberOfLearningTools)}
        />
      </Grid>

      <Grid className={classes.scriptureVerseRow} >
        <Grid className={classes.scriptureVerseBorder} >
          <img className={classes.scriptureImage} src={scriptureImages[scriptureVerseIndex]} />
          <Typography className={classes.scriptureVerse}>{scriptureVerses[(languageIndex * numberOfBibleVersions + bibleVersionIndex) * numberOfScriptureVerses + scriptureVerseIndex]}</Typography>
        </Grid>
      </Grid>

      <FourMixedOperations
        languageIndex={languageIndex}
        topic={topics[languageIndex * numberOfTopics + topicIndex]}
        learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
        topicIndex={topicIndex}
        learningToolIndex={learningToolIndex}
      />

      <Grid className={classes.prayerRow}>
        <img className={classes.prayerImage} src={prayerImage} />
        <Typography className={classes.prayerText}>{prayers[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>{noticificationText[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText}>samsoncsyuapple@gmail.com</Typography>
      </Grid>
    </Grid>  
  );
}

export default MathsLearning;