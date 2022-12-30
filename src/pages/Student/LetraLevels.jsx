import React from "react";
import { lessons } from "../../data/lesson-data";
import "./LetraLevels.css";
import { MdLock } from "react-icons/md";
import { useUserDataContext } from "../../hooks/useUserDataContext";
import { useNavigate } from "react-router-dom";

const LetraLevels = () => {
  const { progress, userDataIsReady } = useUserDataContext();
  progress !== null && console.log("progress: ", progress);
  const navigate = useNavigate();

  const handleLevelClick = (category) => {
    navigate(`/letra/${category}`);
  };

  return (
    <>
      {userDataIsReady && progress !== null && (
        <div className="LetraLevels">
          <div className="container">
            <div id="level-header" className="level-header">
              <span>Letra</span>
            </div>
            {lessons.letra.map((item) => (
              <div
                onClick={() => {
                  progress &&
                    progress.letra.includes(item.category) &&
                    handleLevelClick(item.category);
                }}
                key={item.category}
                className={`level--${item.category}`}
              >
                <span>
                  {progress && progress.letra.includes(item.category) ? (
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

export default LetraLevels;
