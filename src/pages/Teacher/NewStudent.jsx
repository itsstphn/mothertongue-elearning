import React, { useEffect, useState } from "react";
import Card from "./../../components/ui/Card";
import { TiArrowBackOutline } from "react-icons/ti";
import "./NewStudent.css";
import { useNavigate } from "react-router-dom";
import useFetchStudents from "../../hooks/useFetchStudents";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import moment from "moment";

const NewStudent = () => {
  const navigate = useNavigate();
  const [pendingStudents, setPendingStudents] = useState([]);

  const { pendingStudents: fetchedPendingStudents } = useFetchStudents();
  console.log(pendingStudents);

  useEffect(() => {
    setPendingStudents([...fetchedPendingStudents]);
  }, [fetchedPendingStudents]);

  const acceptStudent = async (uid) => {
    console.log("userid newstud", uid);
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      status: "enrolled",
      dateEnrolled: moment().format("MMMM Do YYYY, h:mm a"),
    });
    setPendingStudents(
      fetchedPendingStudents.filter((item) => item.userId !== uid)
    );
  };

  const declineStudent = async (uid) => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { status: "declined" });
  };

  return (
    <div className="NewStudent">
      <div className="back-container" onClick={() => navigate(-1)}>
        <TiArrowBackOutline
          size={35}
          className="back-arrow"
        ></TiArrowBackOutline>
      </div>
      <Card>
        <div className="card-content">
          <div className="header">
            <h1>BAG-O NGA ESTUDYANTE</h1>
          </div>
          <div className="main">
            {pendingStudents &&
              pendingStudents.map((item) => (
                <div className="row" key={item.userId}>
                  <div className="name">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="actions">
                    <div
                      className="btn accept"
                      onClick={() => acceptStudent(item.userId)}
                    >
                      Batunon
                    </div>
                    <div
                      className="btn decline"
                      onClick={() => declineStudent(item.userId)}
                    >
                      Indi akon estudyante
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewStudent;
