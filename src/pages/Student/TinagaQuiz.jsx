import React, { useMemo } from "react";
import Card from "./../../components/ui/Card";
import { lessons } from "../../data/lesson-data";
import "./TinagaQuiz.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";
import { useUserDataContext } from "./../../hooks/useUserDataContext";

import { HiSpeakerWave } from "react-icons/hi2";
import { useEffect } from "react";

const TinagaQuiz = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [clickedCorrect, setClickedCorrect] = useState([]);
  const [clickedWrong, setClickedWrong] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const { subCategory } = useParams();

  const category = "tinaga";

  const { updateProgress, updateScore } = useUserDataContext();

  const lesson = lessons[category].find(
    (cat) => cat.category === subCategory
  ).dataList;

  console.log("lesson: ", lesson);

  const getNextLesson = () => {
    const nextLesson =
      lessons[category].indexOf(
        lessons[category].find((cat) => cat.category === subCategory)
      ) + 1;

    if (nextLesson > 9) return;

    return nextLesson;
  };

  const images = [...lesson.map((item) => [...item.images])];

  const combinedImages = [];

  images.forEach((arr) => combinedImages.push(...arr));

  console.log("images", combinedImages);

  //   const topics = [...lesson.map((item) => item.topic)];

  const shuffledImages = useMemo(() => {
    return _.shuffle(combinedImages);
  }, []);

  const slicedShuffledImages = _.slice(shuffledImages, 0, 10);

  const optionsShuffledImages = useMemo(() => {
    return _.shuffle(slicedShuffledImages);
  }, []);

  //   const slicedOptionsShuffledImages = _.slice(optionsShuffledImages, 0, 11);

  console.log("shuff", slicedShuffledImages);
  console.log("options", optionsShuffledImages);

  // const shuffledTopics = _.shuffle(topics);

  const headerQuestions = [
    "Una",
    "Ikaduha",
    "Ikatatlo",
    "Ika-apat",
    "Ika-lima",
    "Ika-anum",
    "Ika-pito",
    "Ika-walo",
    "Ika-siyam",
    "Ika-napulo",
  ];

  //   const questionGenerator = () => {
  //     const qnaSet = [];
  //     headerQuestions.forEach((item, index) => {
  //       // const items = lesson.filter(
  //       //   (item) => item.description === shuffledDesc[index]
  //       // );
  //       // console.log("from foreach: ", items[0].topic);
  //       const qna = {
  //         title: `${headerQuestions[index]} nga pamangkot.`,
  //         question: shuffledImages[index],
  //         answer: `${
  //           lesson.filter((item) => item.url === shuffledUrl[index])[0].topic
  //         }`,
  //       };

  //       qnaSet.push(qna);
  //     });

  //     return qnaSet;
  //   };

  //   const readyQna = questionGenerator();

  const currentQuestion = shuffledImages[current];

  console.log("curr", currentQuestion);
  console.log("score,", score);
  console.log("current iteration: ", current);

  const handleClickChoice = (image) => {
    if (current === 10) return;
    if (currentQuestion === image) {
      setClickedWrong((prev) => [...prev.filter((item) => item !== image)]);
      setScore((prev) => prev + 1);
      setClickedCorrect((prev) => [...prev, image]);
    } else {
      setClickedWrong((prev) => [...prev, image]);
    }

    setCurrent((prev) => prev + 1);
  };

  const navigate = useNavigate();

  const handleClickNextLevel = () => {
    navigate(`/${category}-levels`);
  };

  if (
    score >= 7 &&
    lessons[category].indexOf(
      lessons[category].find((cat) => cat.category === subCategory) > 4
    )
  ) {
    updateProgress(category, lessons[category][getNextLesson()]?.category);
  }

  if (current === 10) {
    updateScore(category, subCategory, score);
  }

  return (
    <div className="tinagaQuiz">
      <div className="card-container">
        <Card>
          <div className="card-content">
            {current !== 10 && (
              <>
                <h3>{headerQuestions[current]} nga pamangkot</h3>
                <h2>Diin diri ang {currentQuestion}?</h2>
              </>
            )}

            <div className="choices-container">
              {optionsShuffledImages.map((image) => (
                <div
                  key={image}
                  className={`choice ${
                    clickedCorrect.includes(image) && "clicked-correct"
                  } ${clickedWrong.includes(image) && "clicked-wrong"} `}
                  onClick={() => handleClickChoice(image)}
                >
                  <img
                    src={require(`../../assets/images/tinaga-quiz/${image}.jpg`)}
                    alt=""
                  />
                </div>
              ))}
            </div>
            {current === 10 && score >= 7 && (
              <div className="end-quiz">
                <p>Nakapasar ikaw! Panginbulahan sa imo.</p>
                <p>
                  Nakakuha ka sang iskor nga <strong>{score}/10</strong>
                </p>
                <button onClick={() => handleClickNextLevel()}>
                  Padayun sa masunod nga lebel
                </button>
              </div>
            )}
            {current === 10 && score <= 7 && (
              <div className="end-quiz">
                <p>Palihog pagsulit liwat.</p>
                <p>
                  Nakakuha ka sang iskor nga <strong>{score}/10</strong>
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

export default TinagaQuiz;
