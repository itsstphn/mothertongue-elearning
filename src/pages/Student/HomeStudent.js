import React from "react";
import "./HomeStudent.css";
import Card from "./../../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";

const HomeStudent = () => {
    const navigate = useNavigate();

    const cards = [
        { name: "grade 1", path: "/category/grade-1" },
        { name: "Grade 2", path: "/category/grade-2" },
        { name: "Grade 3", path: "/category/grade-3" },
    ];

    return (
        <div className="HomeStudent">
            <div className="container">
                {cards.map((item) => (
                    <div className="card-item">
                        <Link to={item.path}>
                            <Card>
                                <p className="card-text">
                                    {_.startCase(item.name)}
                                </p>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeStudent;
