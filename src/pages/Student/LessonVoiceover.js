import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import Card from "./../../components/ui/Card";
import "./LessonVoiceover.css";

const LessonVoiceover = () => {
    const { lessonCategory } = useParams();

    return (
        <div className="LessonVoiceover">
            <div className="container">
                <div className="category-card">
                    <Card>{_.startCase(lessonCategory)}</Card>
                </div>
            </div>
        </div>
    );
};

export default LessonVoiceover;
