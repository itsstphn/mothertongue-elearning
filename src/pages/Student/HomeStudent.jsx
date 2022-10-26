import React, { useState } from "react";
import "./HomeStudent.css";
import Card from "../../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";

const HomeStudent = () => {
  const [activeTab, setActiveTab] = useState("numero");

  const [items, setItems] = useState([]);

  return (
    <div className="HomeStudent">
      <div className="container">
        <Card>
          <div className="card-content">
            <div className="tabs">
              <div
                onClick={() => {
                  setActiveTab("numero");
                }}
                className={`tab-item ${activeTab === "numero" && "active"}`}
              >
                <p>Numero</p>
              </div>
              <div
                onClick={() => {
                  setActiveTab("letra");
                }}
                className={`tab-item ${activeTab === "letra" && "active"}`}
              >
                <p>Letra</p>
              </div>
              <div
                onClick={() => {
                  setActiveTab("tinaga");
                }}
                className={`tab-item ${activeTab === "tinaga" && "active"}`}
              >
                <p>Tinaga</p>
              </div>
            </div>
            <div className="tab-content">
              <div className="group-number">
                <p>1-10</p>
              </div>
              <div className="group-number">
                <p>11-20</p>
              </div>
              <div className="group-number">
                <p>21-30</p>
              </div>
              <div className="group-number">
                <p>31-40</p>
              </div>
              <div className="group-number">
                <p>41-50</p>
              </div>
              <div className="group-number">
                <p>51-60</p>
              </div>
              <div className="group-number">
                <p>61-70</p>
              </div>
              <div className="group-number">
                <p>71-80</p>
              </div>
              <div className="group-number">
                <p>81-90</p>
              </div>
              <div className="group-number">
                <p>91-100</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeStudent;
