import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import "./CategoriesLesson.css";

const CategoriesLesson = () => {
    const { level } = useParams();

  

    const gradeLevel = level.replace("grade-", "");

    console.log(gradeLevel)

    const categories = [
        { name: "numero", path: `lesson/numero` },
        { name: "tinaga", path: `lesson/tinaga` },
        { name: "letra", path: `lesson/letra` },
        { name: "pahampang", path: `lesson/pahampang` },
    ];

    return (
        <div className="CategoriesLesson">
            <div className="grade-level-card">
                <Link to="/">
                    <Card>
                        <p>Grade {gradeLevel}</p>
                    </Card>
                </Link>
            </div>
            <div className="categories">
                {categories.map((item) => (
                    <div key={item.name} className="category-card">
                        <Link to={item.path}>
                            <Card>
                                <p className="category-text">
                                    {item.name.charAt(0).toUpperCase() +
                                        item.name.slice(1)}
                                </p>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesLesson;
