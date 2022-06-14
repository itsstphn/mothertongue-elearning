import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import LoginAs from "./pages/LoginAs";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import { useState } from "react";
import HomeTeacher from "./pages/HomeTeacher";
import HomeStudent from "./pages/HomeStudent";
import TeacherSignup from "./pages/TeacherSignup";
import StudentSignup from "./pages/StudentSignup";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter className="App">
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user === "teachermary" ? (
                <HomeTeacher setUser={setUser}></HomeTeacher>
              ) : (
                <HomeStudent></HomeStudent>
              )
            ) : (
              <Navigate to="/login-as"></Navigate>
            )
          }
        ></Route>
        <Route path="/login-as" element={<LoginAs></LoginAs>}></Route>
        <Route
          path="/teacher-login"
          element={<TeacherLogin setUser={setUser}></TeacherLogin>}
        ></Route>
        <Route
          path="/teacher-signup"
          element={<TeacherSignup setUser={setUser}></TeacherSignup>}
        ></Route>
        <Route
          path="/student-login"
          element={<StudentLogin setUser={setUser}></StudentLogin>}
        ></Route>
        <Route
          path="/student-signup"
          element={<StudentSignup setUser={setUser}></StudentSignup>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
