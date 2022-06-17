import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import LoginAs from "./pages/LoginAs";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";

import HomeTeacher from "./pages/HomeTeacher";
import HomeStudent from "./pages/HomeStudent";

import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";

function App() {
  const { user, userType, authIsReady } = useAuthContext();

  console.log(userType);
  return (
    <BrowserRouter className="App">
      {authIsReady && (
        <>
          <Navbar></Navbar>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home></Home> : <Navigate to="/login-as"></Navigate>
              }
            ></Route>

            <Route
              path="/student-home"
              element={<HomeStudent></HomeStudent>}
            ></Route>
            <Route
              path="/teacher-home"
              element={<HomeTeacher></HomeTeacher>}
            ></Route>
            <Route
              path="/login-as"
              element={
                user ? <Navigate to="/"></Navigate> : <LoginAs></LoginAs>
              }
            ></Route>

            <Route
              path="/teacher-login"
              element={
                user ? (
                  <Navigate to={"/"}></Navigate>
                ) : (
                  <TeacherLogin></TeacherLogin>
                )
              }
            ></Route>

            <Route
              path="/student-login"
              element={
                user ? (
                  <Navigate to={"/"}></Navigate>
                ) : (
                  <StudentLogin></StudentLogin>
                )
              }
            ></Route>
            <Route
              path="/signup"
              element={
                user ? <Navigate to={"/"}></Navigate> : <Signup></Signup>
              }
            ></Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
