import React from "react";
import { lessons } from "../../data/lesson-data";
import "./TinagaLevels.css";
import { MdLock } from "react-icons/md";
import { useUserDataContext } from "../../hooks/useUserDataContext";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const TinagaLevels = () => {
  const { progress, userDataIsReady } = useUserDataContext();
  const navigate = useNavigate();

  const handleLevelClick = (category) => {
    navigate(`/tinaga/${category}`);
  };

  console.log(progress);

  return (
    <>
      {userDataIsReady && progress !== null && (
        <div className="TinagaLevels">
          <div className="container">
            <div className="back-container" onClick={() => navigate(-1)}>
              <TiArrowBackOutline
                size={35}
                className="back-arrow"
              ></TiArrowBackOutline>
            </div>
            <div id="level-header" className="level-header">
              <span>Tinaga</span>
            </div>
            {lessons.tinaga.map((item) => (
              <div
                onClick={() => {
                  progress &&
                    progress.tinaga.includes(item.category) &&
                    handleLevelClick(item.category);
                }}
                key={item.category}
                className={`level--${item.category}`}
              >
                <span>
                  {progress && progress.tinaga.includes(item.category) ? (
                    item.category
                  ) : (
                    <MdLock></MdLock>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TinagaLevels;
