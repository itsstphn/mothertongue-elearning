import React, { useMemo } from "react";
import Card from "./../../components/ui/Card";
import { lessons } from "../../data/lesson-data";
import "./Quiz.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";
import { useUserDataContext } from "./../../hooks/useUserDataContext";

const Quiz = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [clickedCorrect, setClickedCorrect] = useState([]);
  const [clickedWrong, setClickedWrong] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const { category, subCategory } = useParams();

  console.log("subcat", subCategory);

  const { updateProgress } = useUserDataContext();

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

  const descriptions = [...lesson.map((item) => item.description)];

  const topics = [...lesson.map((item) => item.topic)];

  const shuffledDesc = useMemo(() => {
    return _.shuffle(descriptions);
  }, []);

  console.log("topics", topics);

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

  const questionGenerator = () => {
    const qnaSet = [];

    headerQuestions.forEach((item, index) => {
      // const items = lesson.filter(
      //   (item) => item.description === shuffledDesc[index]
      // );
      // console.log("from foreach: ", items[0].topic);
      const qna = {
        title: `${headerQuestions[index]} nga pamangkot.`,
        question: `Diin diri ang ${shuffledDesc[index]}`,
        answer: `${
          lesson.filter((item) => item.description === shuffledDesc[index])[0]
            .topic
        }`,
      };

      qnaSet.push(qna);
    });

    return qnaSet;
  };

  // console.log(
  //   "lessonfilter quiz:",
  //   lesson.filter((item) => item.description === shuffledDesc[0])[0]
  // );

  console.log(score);
  console.log("correct", clickedCorrect);
  console.log("wrong", clickedWrong);

  const readyQna = questionGenerator();

  const currentQuestion = readyQna[current];

  const handleClickChoice = (topic) => {
    if (score === 10) return;
    if (currentQuestion.answer === topic) {
      setClickedWrong((prev) => [...prev.filter((item) => item !== topic)]);
      setScore((prev) => prev + 1);
      setClickedCorrect((prev) => [...prev, topic]);
      console.log("correct!!");
    } else {
      console.log("wrong!!!");
      setClickedWrong((prev) => [...prev, topic]);
    }

    setCurrent((prev) => prev + 1);
  };

  console.log("current", current);

  const navigate = useNavigate();

  const handleClickNextLevel = () => {
    navigate(`/${category}-levels`);
  };

  if (
    score >= 7 &&
    lessons[category].indexOf(
      lessons[category].find((cat) => cat.category === subCategory) > 9
    )
  ) {
    updateProgress(category, lessons[category][getNextLesson()]?.category);
  }

  return (
    <div className="Quiz">
      <div className="card-container">
        <Card>
          <div className="card-content">
            <h3>{currentQuestion?.title}</h3>
            <h2>{currentQuestion?.question}</h2>
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
            {current === 10 && score < 7 && (
              <div className="end-quiz">
                <p>Palihog pagsulit liwat.</p>
                <p>
                  Nakakuha ka sang iskor nga <strong>{score}</strong>
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

export default Quiz;
