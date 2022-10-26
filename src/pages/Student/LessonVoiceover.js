import _ from "lodash";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "./../../components/ui/Card";
import "./LessonVoiceover.css";
import { grade1 } from "../../data/lesson-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import soundWave from "../../assets/images/sound_wave.svg";

console.log(grade1);

const LessonVoiceover = () => {
  const { lessonCategory } = useParams();

  const navigate = useNavigate();

  return (
    <div className="LessonVoiceover">
      <div className="container">
        <div className="category-card" onClick={() => navigate(-1)}>
          <Card>
            <p>{_.startCase(lessonCategory)}</p>
          </Card>
        </div>
        <div className="main-lesson">
          <Card>
            <div className="main-lesson-container">
              <div className="row">
                <div></div>
                <div></div>
                <div>
                  <p>Voice over</p>
                </div>
              </div>
              {grade1.numero.map((item) => (
                <div key={item.topic} className="row">
                  <div className="image-container">
                    <img className="topic-img" src={item.image} alt="" />
                  </div>
                  <div className="description-container">
                    <p>{_.upperCase(item.description)}</p>
                  </div>
                  <div className="voiceover-container">
                    <FontAwesomeIcon icon={faPlay} />
                    <img src={soundWave} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonVoiceover;
