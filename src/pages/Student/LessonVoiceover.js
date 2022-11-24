import _ from "lodash";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./../../components/ui/Card";
import "./LessonVoiceover.css";
import { lessons } from "../../data/lesson-data";
// import { nums10 } from "../../assets/images/numero/1-10";
// import numeroLessonsBg from "../../assets/images/numero-lesson-bg.jpg";

const LessonVoiceover = () => {
  const { category, subCategory } = useParams();

  const [audioNotReady, setAudioNotReady] = useState(false);

  const playAudio = (url) => {
    setAudioNotReady(true);
    new Audio(url).play();
    setTimeout(() => {
      setAudioNotReady(false);
    }, 1500);
  };

  const navigate = useNavigate();

  console.log("lessons:", lessons);

  const { dataList } = lessons[category].find(
    (item) => item.category === subCategory
  );

  console.log("subCategory", subCategory);

  return (
    <div
      className={`LessonVoiceover ${
        category === "numero" ? "numero-bg" : "letra-bg"
      }`}
    >
      <div className="container">
        {/* <Card className="card"> */}
        <div className="card-content">
          {dataList.map((item, index) => (
            <div
              key={item.topic}
              className="list-item"
              onClick={() => !audioNotReady && playAudio(item.url)}
            >
              <div className="topic">
                <img
                  className="topic-img"
                  src={require(`../../assets/images/numero/${subCategory}/${item.topic}.png`)}
                  alt=""
                />
              </div>
              <div className="description">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="test">
          <button onClick={() => navigate(`/${category}/${subCategory}/quiz`)}>
            Pagtakus sang Ihibalo
          </button>
        </div>
        {/* </Card> */}
      </div>
    </div>
  );
};

export default LessonVoiceover;
