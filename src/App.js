import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";

import LoginAs from "./pages/LoginAs";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";

import HomeTeacher from "./pages/Teacher/HomeTeacher";
import HomeStudent from "./pages/Student/HomeStudent";

import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import CategoriesLesson from "./pages/Student/CategoriesLesson";
import LessonVoiceover from "./pages/Student/LessonVoiceover";

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
                                user ? (
                                    <Home></Home>
                                ) : (
                                    <Navigate to="/login-as"></Navigate>
                                )
                            }
                        ></Route>

                        <Route
                            path="/student-home"
                            element={<HomeStudent></HomeStudent>}
                        ></Route>

                        <Route
                            path="/category/:level"
                            element={<CategoriesLesson></CategoriesLesson>}
                        ></Route>
                        <Route
                            path="/lesson/:lessonCategory"
                            element={<LessonVoiceover></LessonVoiceover>}
                        ></Route>
                        <Routes
                            path="/teacher-home"
                            element={<HomeTeacher></HomeTeacher>}
                        ></Routes>
                        <Route
                            path="/login-as"
                            element={
                                user ? (
                                    <Navigate to="/"></Navigate>
                                ) : (
                                    <LoginAs></LoginAs>
                                )
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
                                user ? (
                                    <Navigate to={"/"}></Navigate>
                                ) : (
                                    <Signup></Signup>
                                )
                            }
                        ></Route>
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
}

export default App;
