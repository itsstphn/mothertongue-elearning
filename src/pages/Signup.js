import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useSignup } from "./../hooks/useSignup";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [teacher, setTeacher] = useState("");
  const [teachers, setTeachers] = useState([]);

  const { signup, error, isPending } = useSignup();

  console.log(error);

  console.log("teacher", teacher);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(firstName, lastName, email, password, userType, teacher);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      const teachers = await getDoc(doc(db, "teachers", "teachers"));
      setTeachers(teachers.data().teachers);
      setTeacher(teachers.data().teachers[0]);
    };
    if (userType === "student") fetchTeachers();
  }, [userType]);

  console.log("teachers: ", teachers);

  useEffect(() => {
    if (userType === "teacher") {
      setTeachers([]);
    }
    console.log("useEffect teacher has run");
  }, [userType]);

  return (
    <div className="signup-form">
      <h2>Himo account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p className="label-text">Pangalan</p>
          <input
            value={firstName}
            onChange={(e) =>
              setFirstName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            type="text"
          />
        </label>
        <label>
          <p className="label-text">Apelyido</p>
          <input
            value={lastName}
            onChange={(e) =>
              setLastName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            type="text"
          />
        </label>
        <label>
          <p className="label-text">Email</p>
          <input
            autoCorrect="off"
            autoCapitalize="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </label>

        <label>
          <p className="label-text"> Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <label className="select-container">
          Himo account bilang
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Estudyante</option>
            <option value="teacher">Manunudlo</option>
          </select>
        </label>
        {teachers && (
          <label className="select-container">
            <span>Pili sang Maestra/Maestro</span>
            <select
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              disabled={userType !== "student"}
            >
              {teachers?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        )}
        <div>
          <button disabled={isPending} type="submit">
            Himo Account
          </button>
          <Link to="/">
            <p className="redirect-login">Maglogin</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
