import React from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useUserDataContext } from "../hooks/useUserDataContext";
import HomeStudent from "./Student/HomeStudent";
import HomeTeacher from "./Teacher/HomeTeacher";

const Home = () => {
  const { authIsReady } = useAuthContext();

  const { userType } = useUserDataContext();

  console.log("usertype userData", userType);

  return (
    <>
      {authIsReady && (
        <>
          {
            userType && userType === "teacher" ? (
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
