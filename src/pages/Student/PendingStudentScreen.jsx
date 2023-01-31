import React from "react";
import { MdPendingActions } from "react-icons/md";
import Card from "./../../components/ui/Card";
import "./PendingStudentScreen.css";

const PendingStudentScreen = () => {
  return (
    <div className="PendingStudent">
      <div className="card-container">
        <Card>
          <div className="card-content">
            <h1>Palihog paghulat nga mabatun sang Maestra</h1>
            <MdPendingActions
              size={40}
              className="pending-icon"
            ></MdPendingActions>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PendingStudentScreen;
