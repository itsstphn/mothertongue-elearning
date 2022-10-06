import _ from "lodash";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "./../../components/ui/Card";
import "./LessonVoiceover.css";

const LessonVoiceover = () => {
    const { lessonCategory } = useParams();

    return (
        <div className="LessonVoiceover">
            <div className="container">
                <div className="category-card">
                    {/* <Link to=''> */}
                    <Card>{_.startCase(lessonCategory)}</Card>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
};

export default LessonVoiceover;
