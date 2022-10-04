import React from "react";

import "./HomeTeacher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomeTeacher = () => {
    return (
        <div className="HomeTeacher">
            <div className="container">
                <div className="student-list">
                    <h2>Lista sang mga Estudyante</h2>
                    <div className="student-table">
                        <div className="row header">
                            <div>Pangalan</div>
                            <div>Edad</div>
                            <div>Grade&nbsp;Level</div>
                        </div>
                        <div className="row">
                            <div>Mary Grace Tabucon</div>
                            <div>22</div>
                            <div>2</div>
                        </div>
                        <div className="row">
                            <div>Mario Tabucon</div>
                            <div>20</div>
                            <div>1</div>
                        </div>
                        <div className="row">
                            <div>Maria Tabucon</div>
                            <div>19</div>
                            <div>3</div>
                        </div>
                    </div>
                </div>
                <div className="activities">
                    <Link to="./">
                        <div className="add-activity">
                            <FontAwesomeIcon
                                className="add-icon"
                                icon={faSquarePlus}
                            />
                            <h2>Himo Aktibidades</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeTeacher;
