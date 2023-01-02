import React from "react";

import "./HomeTeacher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "./../../components/ui/Card";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";

function addNumbers(obj) {
  let sum = 0;

  for (const value of Object.values(obj)) {
    if (typeof value === "number") {
      sum += value;
    } else if (typeof value === "object") {
      sum += addNumbers(value);
    }
  }

  return sum;
}

const HomeTeacher = () => {
  const [students, setStudents] = useState([]);
  const [studentScores, setStudentScores] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
      const filteredData = data.filter((item) => item.userType === "student");
      setStudents(filteredData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const studentData = [];
    if (students.length === 0) return;
    students.forEach((item) => {
      const name = item.firstName + " " + item.lastName;
      console.log(item);
      const score = {
        letra: addNumbers(item?.scores?.letra),
        numero: addNumbers(item?.scores?.numero),
        tinaga: addNumbers(item?.scores?.tinaga),
      };
      studentData.push({ name, score });
    });
    setStudentScores(studentData);
  }, [students]);

  return (
    <div className="HomeTeacher">
      <div className="container">
        <div className="student-list">
          <div className="title-container">
            <Card>
              <h2>Grado sang mga Estudyante</h2>
            </Card>
          </div>

          <div className="student-table">
            <div className="row header">
              <div>Pangalan</div>
              <div>Numero</div>
              <div>Letra</div>
            </div>
            {studentScores.map((item, index) => (
              <div className="row" key={index}>
                <div>{item.name}</div>
                <div>{item.score.numero}/100</div>
                <div>{item.score.letra}/25</div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="activities">
          <Link to="./">
            <div className="add-activity">
              <FontAwesomeIcon className="add-icon" icon={faSquarePlus} />
              <h2>Himo Aktibidades</h2>
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default HomeTeacher;
