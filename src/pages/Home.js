import React from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import HomeStudent from "./Student/HomeStudent";
import HomeTeacher from "./Teacher/HomeTeacher";

const Home = () => {
  const { userType, authIsReady } = useAuthContext();

  return (
    <>
      {authIsReady && (
        <>
          {
            userType === "teacher" ? (
              <HomeTeacher></HomeTeacher>
            ) : (
              // userType === "student" ?
              // (
              <HomeStudent></HomeStudent>
            )
            // )
            // :

            // (
            //     <div>Loading...</div>
            // )
          }
        </>
      )}
    </>
  );
};

export default Home;
