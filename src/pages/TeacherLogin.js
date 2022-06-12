import React from "react";
import LoginForm from "./../components/LoginForm";

const TeacherLogin = ({ setUser }) => {
  return <LoginForm loginType="Teacher" setUser={setUser}></LoginForm>;
};

export default TeacherLogin;
