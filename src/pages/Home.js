import React from "react";
import { Route, Routes } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import HomeStudent from "./HomeStudent";
import HomeTeacher from "./HomeTeacher";

const Home = () => {
  const { userType, authIsReady } = useAuthContext();

  return (
    <>
      {authIsReady && (
        <>
          {userType === "teacher" ? (
            <HomeTeacher></HomeTeacher>
          ) : userType === "student" ? (
            <HomeStudent></HomeStudent>
          ) : (
            <div>Loading</div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
