import React from "react";
import LoginForm from "./../components/LoginForm";

const StudentLogin = ({ setUser }) => {
  return <LoginForm loginType="Student" setUser={setUser}></LoginForm>;
};

export default StudentLogin;
