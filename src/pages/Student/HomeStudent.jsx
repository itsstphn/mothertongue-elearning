import { useState, useEffect, useContext } from "react";
import "./HomeStudent.css";
import Card from "../../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { lessons } from "../../data/lesson-data";
import CategoryList from "./../../layout/CategoryList";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { UserDataContext } from "../../context/UserDataContext";
import numeroBg from "../../assets/images/numero-kids.jpg";

// lessons.numero.map((item) => console.log(item));

const { numero, letra } = lessons;

// const numero = (
//   <div className="tab-content">
//     {/* <div className="group">
//       <p>1-10</p>
//     </div>
//     <div className="group">
//       <p>11-20</p>
//     </div>
//     <div className="group">
//       <p>21-30</p>
//     </div>
//     <div className="group">
//       <p>31-40</p>
//     </div>
//     <div className="group">
//       <p>41-50</p>
//     </div>
//     <div className="group">
//       <p>51-60</p>
//     </div>
//     <div className="group">
//       <p>61-70</p>
//     </div>
//     <div className="group">
//       <p>71-80</p>
//     </div>
//     <div className="group">
//       <p>81-90</p>
//     </div>
//     <div className="group">
//       <p>91-100</p>
//     </div> */}
//   </div>
// );

// const letra = (
//   <div className="tab-content">
//     <div className="group">
//       <p>A-E</p>
//     </div>
//     <div className="group">
//       <p>F-J</p>
//     </div>
//     <div className="group">
//       <p>K-O</p>
//     </div>
//     <div className="group">
//       <p>P-T</p>
//     </div>
//     <div className="group">
//       <p>U-Z</p>
//     </div>
//   </div>
// );

// const tinaga = <div className="tab-content"></div>;

const HomeStudent = () => {
  const [activeTab, setActiveTab] = useState("numero");
  const [activeCategory, setActiveCategory] = useState(numero);

  const navigate = useNavigate();

  const { user } = useAuthContext();

  const { name } = useContext(UserDataContext);

  name && console.log("name is:", name);

  // console.log("user is", user);

  useEffect(() => {
    activeTab === "numero"
      ? setActiveCategory(numero)
      : setActiveCategory(letra);
  }, [activeTab]);

  const [items, setItems] = useState([]);

  console.log("screen is:", window.screen.width);

  return (
    <div className="HomeStudent">
      <div className="container">
        <div className="card-content">
          <div className="tabs">
            <Card>
              <div
                onClick={() => {
                  navigate("/numero-levels");
                }}
                className={`tab-item ${activeTab === "numero" && "active"}`}
              >
                <p>Numero</p>
                <div className="illustration numero"></div>
              </div>
            </Card>
            <Card>
              <div
                onClick={() => {
                  setActiveTab("letra");
                }}
                className={`tab-item ${activeTab === "letra" && "active"}`}
              >
                <p>Letra</p>
                <div className="illustration letra"></div>
              </div>
            </Card>
            <Card>
              <div
                // onClick={() => {
                //   setActiveTab("tinaga");
                // }}
                className={`tab-item ${activeTab === "tinaga" && "active"}`}
              >
                <p>Tinaga</p>
              </div>
            </Card>
          </div>
          {/* <CategoryList
              data={activeCategory}
              category={activeTab}
            ></CategoryList> */}
        </div>
      </div>
    </div>
  );
};

export default HomeStudent;
