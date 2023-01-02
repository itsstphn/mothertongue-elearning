import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import { IoMdLock } from "react-icons/io";

const CategoryList = ({ data, category }) => {
  const navigate = useNavigate();

  const { progress, name } = useContext(UserDataContext);

  // console.log("progress is", progress[numero]);

  // console.log(data);

  return (
    <div className="tab-content">
      {data.map((itemCategory) => (
        <div
          key={itemCategory.category}
          className={`group ${
            progress &&
            progress[category].includes(itemCategory.category) &&
            "show"
          }`}
          onClick={() =>
            progress[category].includes(itemCategory.category) &&
            navigate(`/${category}/${itemCategory.category}`)
          }
        >
          <p>
            {itemCategory.category}

            {progress &&
              !progress[category].includes(itemCategory.category) && (
                <IoMdLock></IoMdLock>
              )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
