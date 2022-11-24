import React from "react";
import Card from "./../../components/ui/Card";
import grasya from "../../assets/images/mary.jpg";
import "./Quiz.css";

const Quiz = () => {
  return (
    <div className="Quiz">
      <div className="card-container">
        <Card>
          <div className="card-content"></div>
          <div className="message">
            <h2>No Quiz for today's videeowww! 🥳🎉</h2>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
