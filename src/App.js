import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import React from "react";
import LoginAs from "./pages/LoginAs";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import HomeTeacher from "./pages/Teacher/HomeTeacher";
import HomeStudent from "./pages/Student/HomeStudent";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import LessonVoiceover from "./pages/Student/LessonVoiceover";
import Quiz from "./pages/Student/Quiz";
import NumeroLevels from "./pages/Student/NumeroLevels";
import LetraLevels from "./pages/Student/LetraLevels";
import LetraQuiz from "./pages/Student/LetraQuiz";
import TinagaLevels from "./pages/Student/TinagaLevels";
import TinagaLesson from "./pages/Student/TinagaLesson";
import TinagaQuiz from "./pages/Student/TinagaQuiz";

function App() {
  const { user, userType, authIsReady } = useAuthContext();

  return (
    <BrowserRouter className="App">
      {authIsReady && (
        <React.Fragment>
          <Navbar></Navbar>
          <div className="root-container">
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
                path="/numero-levels"
                element={
                  user ? (
                    <NumeroLevels></NumeroLevels>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
              ></Route>

              <Route
                path="/letra-levels"
                element={
                  user ? (
                    <LetraLevels></LetraLevels>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
              ></Route>

              <Route
                path="/tinaga-levels"
                element={
                  user ? (
                    <TinagaLevels></TinagaLevels>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
              ></Route>

              <Route
                path="/:category/:subCategory"
                element={
                  user ? (
                    <LessonVoiceover></LessonVoiceover>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
              ></Route>

              <Route
                path="/tinaga/:subCategory"
                element={
                  user ? (
                    <TinagaLesson></TinagaLesson>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
              ></Route>

              <Route
                path="/:category/:subCategory/quiz"
                element={
                  user ? <Quiz></Quiz> : <Navigate to="/login-as"></Navigate>
                }
              ></Route>

              <Route
                path="/letra/:subCategory/quiz"
                element={
                  user ? (
                    <LetraQuiz></LetraQuiz>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
              ></Route>

              <Route
                path="/tinaga/:subCategory/quiz"
                element={
                  user ? (
                    <TinagaQuiz></TinagaQuiz>
                  ) : (
                    <Navigate to="/login-as"></Navigate>
                  )
                }
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
                    <Navigate to="/"></Navigate>
                  ) : (
                    <TeacherLogin></TeacherLogin>
                  )
                }
              ></Route>

              <Route
                path="/student-login"
                element={
                  user ? (
                    <Navigate to="/"></Navigate>
                  ) : (
                    <StudentLogin></StudentLogin>
                  )
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  user ? <Navigate to="/"></Navigate> : <Signup></Signup>
                }
              ></Route>
            </Routes>
          </div>
        </React.Fragment>
      )}
    </BrowserRouter>
  );
}

export default App;
