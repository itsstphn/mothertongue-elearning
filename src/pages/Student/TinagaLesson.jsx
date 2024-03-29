import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./../../components/ui/Card";
import "./TinagaLesson.css";
import { lessons } from "../../data/lesson-data";
import { TiArrowBackOutline } from "react-icons/ti";
import { Tooltip } from "@mui/material";

const category = "tinaga";

const TinagaLesson = () => {
  const { subCategory } = useParams();

  console.log("subcat: ", subCategory);

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

  console.log(dataList);

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
    }, 7000);
  }, []);

  return (
    <div className="TinagaLesson">
      <div className="container">
        {/* <Card className="card"> */}
        <div className="back-container" onClick={() => navigate(-1)}>
          <TiArrowBackOutline
            size={35}
            className="back-arrow"
          ></TiArrowBackOutline>
        </div>
        <div className="card-content">
          {dataList.map((item, letterIndex) => (
            <div key={item.topic} className="list-item">
              <div className="topic">{item.topic}</div>
              <div className="images">
                {item.images.map((image, index) => (
                  <Tooltip
                    open={letterIndex === 0 && index === 0 ? openTip : false}
                    title="Pinduta para pamatian"
                    placement="top-end"
                    arrow
                    key={image}
                  >
                    <div
                      className="img-container"
                      onClick={() =>
                        !audioNotReady && playAudio(item.url[index])
                      }
                    >
                      <img
                        src={require(`../../assets/images/tinaga/${subCategory}/${image}.jpg`)}
                        alt=""
                      />
                    </div>
                  </Tooltip>
                ))}
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

export default TinagaLesson;
