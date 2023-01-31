import React, { useMemo } from "react";
import Card from "./../../components/ui/Card";
import { lessons } from "../../data/lesson-data";
import "./Quiz.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";
import { useUserDataContext } from "./../../hooks/useUserDataContext";

import { HiSpeakerWave } from "react-icons/hi2";
import { useEffect } from "react";
import { RecordVoiceOver } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const LetraQuiz = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [clickedCorrect, setClickedCorrect] = useState([]);
  const [clickedWrong, setClickedWrong] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const { subCategory } = useParams();

  const category = "letra";

  const { updateProgress, updateScore, recordQuiz } = useUserDataContext();

  const lesson = lessons[category].find(
    (cat) => cat.category === subCategory
  ).dataList;

  const getNextLesson = () => {
    const nextLesson =
      lessons[category].indexOf(
        lessons[category].find((cat) => cat.category === subCategory)
      ) + 1;

    if (nextLesson > 9) return;

    return nextLesson;
  };

  // console.log("nextLesson", lessons[category][getNextLesson()].category);

  const urls = [...lesson.map((item) => item.url)];

  const topics = [...lesson.map((item) => item.topic)];

  const shuffledUrl = useMemo(() => {
    return _.shuffle(urls);
  }, []);

  // const shuffledTopics = _.shuffle(topics);

  const headerQuestions = [
    "Una",
    "Ikaduha",
    "Ikatatlo",
    "Ika-apat",
    "Ika-lima",
    // "Ika-anum",
    // "Ika-pito",
    // "Ika-walo",
    // "Ika-siyam",
    // "Ika-napulo",
  ];

  const questionGenerator = () => {
    const qnaSet = [];

    headerQuestions.forEach((item, index) => {
      // const items = lesson.filter(
      //   (item) => item.description === shuffledDesc[index]
      // );
      // console.log("from foreach: ", items[0].topic);
      const qna = {
        title: `${headerQuestions[index]} nga pamangkot.`,
        question: shuffledUrl[index],
        answer: `${
          lesson.filter((item) => item.url === shuffledUrl[index])[0].topic
        }`,
      };

      qnaSet.push(qna);
    });

    return qnaSet;
  };

  const readyQna = questionGenerator();

  const currentQuestion = readyQna[current];

  const handleClickChoice = (topic) => {
    if (current === 10) return;
    if (currentQuestion.answer === topic) {
      setClickedWrong((prev) => [...prev.filter((item) => item !== topic)]);
      setScore((prev) => prev + 1);
      setClickedCorrect((prev) => [...prev, topic]);
    } else {
      setClickedWrong((prev) => [...prev, topic]);
    }

    setCurrent((prev) => prev + 1);
  };

  const navigate = useNavigate();

  const handleClickNextLevel = () => {
    navigate(`/${category}-levels`);
  };

  if (
    score >= 4 &&
    lessons[category].indexOf(
      lessons[category].find((cat) => cat.category === subCategory) > 4
    )
  ) {
    updateProgress(category, lessons[category][getNextLesson()]?.category);
  }

  //   console.log(current);

  if (current === 5) {
    updateScore(category, subCategory, score);
    recordQuiz(category, subCategory, score);
  }

  const [openTip, setOpenTip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpenTip(false);
    }, 10000);
  }, []);

  return (
    <div className="Quiz">
      <div className="card-container">
        <Card>
          <div className="card-content">
            {current !== 5 && (
              <>
                <h3>{currentQuestion?.title}</h3>
                <h2>
                  Diin diri ang
                  <Tooltip
                    open={openTip}
                    title="Pinduta"
                    placement="right-start"
                    arrow
                  >
                    <div className="audio-container">
                      <HiSpeakerWave
                        onClick={() =>
                          new Audio(currentQuestion?.question).play()
                        }
                      ></HiSpeakerWave>
                    </div>
                  </Tooltip>
                </h2>
              </>
            )}

            <div className="choices-container">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className={`choice ${
                    clickedCorrect.includes(topic) && "clicked-correct"
                  } ${clickedWrong.includes(topic) && "clicked-wrong"} `}
                  onClick={() => handleClickChoice(topic)}
                >
                  {topic}
                </div>
              ))}
            </div>
            {current === 5 && score >= 4 && (
              <div className="end-quiz">
                <p>Nakapasar ikaw! Panginbulahan sa imo.</p>
                <p>
                  Nakakuha ka sang iskor nga <strong>{score}/5</strong>
                </p>
                <button onClick={() => handleClickNextLevel()}>
                  Padayun sa masunod nga lebel
                </button>
              </div>
            )}
            {current === 5 && score <= 3 && (
              <div className="end-quiz">
                <p>Palihog pagsulit liwat.</p>
                <p>
                  Nakakuha ka sang iskor nga <strong>{score}/5</strong>
                </p>
                <button onClick={() => window.location.reload()}>
                  Pagsulit liwat
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LetraQuiz;
