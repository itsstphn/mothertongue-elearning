import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./../../components/ui/Card";
import "./LessonVoiceover.css";
import { lessons } from "../../data/lesson-data";
import { Tooltip } from "@mui/material";
import { TiArrowBackOutline } from "react-icons/ti";
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

  const { dataList } = lessons[category].find(
    (item) => item.category === subCategory
  );

  // const topicsArray = [...dataList.map((item) => item.topic)];

  // const shuffledtopicsArray = topicsArray.sort((a, b) => 0.5 - Math.random());
  // console.log("shuffled topics", shuffledtopicsArray);

  // const descArray = [...dataList.map((item) => item.description)];

  // console.log("topicsarrray", topicsArray);

  // console.log("desc", descArray);

  // console.log("datalist", dataList);

  // console.log("subCategory", subCategory);

  const [openTip, setOpenTip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpenTip(false);
    }, 6000);
  }, []);

  return (
    <div
      className={`LessonVoiceover ${
        category === "numero" ? "numero-bg" : "letra-bg"
      }`}
    >
      <div className="container">
        {/* <Card className="card"> */}
        <div
          className="back-container"
          onClick={() =>
            navigate(
              `${category === "numero" ? "/numero-levels" : "/letra-levels"}`
            )
          }
        >
          <TiArrowBackOutline
            size={35}
            className="back-arrow"
          ></TiArrowBackOutline>
        </div>
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
                  src={require(`../../assets/images/${category}/${subCategory}/${item.topic}.png`)}
                  alt=""
                />
              </div>
              <Tooltip
                open={index === 0 ? openTip : false}
                title="Pinduta para pamatian"
                placement="top"
                arrow
              >
                <div className="description">
                  <p>{item.description}</p>
                </div>
              </Tooltip>
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
