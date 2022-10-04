import React from "react";
import kids123 from "../../assets/images/kids-123.jpg";
import kidsabc from "../../assets/images/kids-abc.jpg";
import kidsPlaying from "../../assets/images/kids-playing.jpg";
import kidsActivities from "../../assets/images/activities.jpg";
import "./HomeStudent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const HomeStudent = () => {
    return (
        <div className="HomeStudent">
            <div className="container">
                <div className="pointsContainer">
                    <div className="points">
                        <p>Puntos: 0</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="home-icon" icon={faHouse} />
                    </div>
                </div>
                <div className="menu">
                    <div className="numbers-button">
                        <img src={kids123} alt="" />
                        <h3>Numero</h3>
                    </div>
                    <div className="words-button">
                        <img src={kidsabc} alt="" />
                        <h3>Tinaga</h3>
                    </div>
                    <div className="games-button">
                        <img src={kidsPlaying} alt="" />
                        <h3>Pahampang</h3>
                    </div>
                    <div className="games-button">
                        <img src={kidsActivities} alt="" />
                        <h3>Mga Aktibidad</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
