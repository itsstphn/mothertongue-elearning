import React from "react";
import { lessons } from "../../data/lesson-data";
import "./NumeroLevels.css";
import { MdLock } from "react-icons/md";
import { useUserDataContext } from "../../hooks/useUserDataContext";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const NumeroLevels = () => {
  const { progress, userDataIsReady } = useUserDataContext();
  const navigate = useNavigate();

  const handleLevelClick = (category) => {
    navigate(`/numero/${category}`);
  };

  return (
    <>
      {userDataIsReady && progress !== null && (
        <div className="NumeroLevels">
          <div className="container">
            <div className="back-container" onClick={() => navigate("/")}>
              <TiArrowBackOutline
                size={35}
                className="back-arrow"
              ></TiArrowBackOutline>
            </div>
            <div id="level-header" className="level-header">
              <span>Numero</span>
            </div>
            {lessons.numero.map((item) => (
              <div
                onClick={() => {
                  progress &&
                    progress.numero.includes(item.category) &&
                    handleLevelClick(item.category);
                }}
                key={item.category}
                className={`level--${item.category}`}
              >
                <span>
                  {progress && progress.numero.includes(item.category) ? (
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

export default NumeroLevels;
