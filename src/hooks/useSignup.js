import { auth, db } from "../firebase/config";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password, userType) => {
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
      console.log(docRef);
      await setDoc(docRef, {
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        progress: {
          numero: ["1-10"],
          letra: ["A-E"],
          tinaga: [],
        },
      });

      dispatch({ type: "SIGNIN", payload: response.user });
      if (userType === "admin") dispatch({ type: "USER_IS_ADMIN" });
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
