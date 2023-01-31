import { auth, db } from "../firebase/config";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useUserDataContext } from "./useUserDataContext";
import { MdRvHookup } from "react-icons/md";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { userDataDispatch } = useUserDataContext();

  const signupTeacher = async (
    firstName,
    lastName,
    email,
    password,
    userType,
    teacherIdNumber
  ) => {
    setError(null);
    setIsPending(true);

    console.log("teacherId from Hook", teacherIdNumber);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response.user, { displayName: firstName });
      const docRef = doc(db, "users", response.user.uid);

      await setDoc(docRef, {
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        teacherId: teacherIdNumber,
        userId: response.user.uid,
      });

      await updateDoc(doc(db, "teachers", "teachers"), {
        teachers: arrayUnion({
          name: firstName + " " + lastName,
          userId: response.user.uid,
        }),
      });

      dispatch({ type: "SIGNIN", payload: response.user });
      userDataDispatch({ type: "SET_USERTYPE", payload: userType });
      // if (userType === "admin") dispatch({ type: "USER_IS_ADMIN" });
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  const signupStudent = async (
    firstName,
    lastName,
    email,
    password,
    userType,
    teacher,
    selectedGrado
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response.user, { displayName: firstName });
      const docRef = doc(db, "users", response.user.uid);

      await setDoc(docRef, {
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        progress: {
          numero: ["1-10"],
          letra: ["A-E"],
          tinaga: ["A-E"],
        },
        scores: {
          numero: {},
          letra: {},
          tinaga: {},
        },
        quizHistory: [],
        teacher,
        grado: selectedGrado,
        userId: response.user.uid,
        status: "pending",
      });

      dispatch({ type: "SIGNIN", payload: response.user });
      userDataDispatch({ type: "SET_USERTYPE", payload: userType });
      // if (userType === "admin") dispatch({ type: "USER_IS_ADMIN" });
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { signupTeacher, signupStudent, error, isPending };
};
