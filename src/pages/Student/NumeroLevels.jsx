import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { lessons } from "../../data/lesson-data";
import "./NumeroLevels.css";
import { MdLock } from "react-icons/md";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { useUserDataContext } from "../../hooks/useUserDataContext";
import { useNavigate } from "react-router-dom";

const NumeroLevels = () => {
  const { progress, userDataIsReady } = useUserDataContext();
  progress !== null && console.log("progress: ", progress);
  const navigate = useNavigate();

  const handleLevelClick = (category) => {
    navigate(`/numero/${category}`);
  };

  return (
    <>
      {userDataIsReady && progress !== null && (
        <div className="NumeroLevels">
          <div className="container">
            <div id="level-header" className="level-header">
              <span>Numero</span>
            </div>
            {lessons.numero.map((item) => (
              <div
                onClick={() => handleLevelClick(item.category)}
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
