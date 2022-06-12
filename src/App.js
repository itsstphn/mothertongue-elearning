import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginAs from "./pages/LoginAs";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import { useState } from "react";

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
              <Home setUser={setUser}></Home>
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
          path="/student-login"
          element={<StudentLogin setUser={setUser}></StudentLogin>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
