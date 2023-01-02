import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect } from "react";
import { useReducer, useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "./../hooks/useAuthContext";

export const UserDataContext = createContext();

const userDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_SCORE":
      return { ...state, scores: action.payload };
    case "USERDATA_IS_READY":
      return { ...state, userDataIsReady: true };
    default:
      return state;
  }
};

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(userDataReducer, {
    name: null,
    progress: null,
    userDataIsReady: false,
    scores: null,
  });

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(docRef, (response) => {
      const progress = response.data().progress;
      const firstName = response.data().firstName;
      const lastName = response.data().lastName;
      const scores = response.data().scores;

      dispatch({ type: "SET_NAME", payload: { firstName, lastName } });
      dispatch({ type: "SET_PROGRESS", payload: progress });
      dispatch({ type: "SET_SCORE", payload: scores });
      dispatch({ type: "USERDATA_IS_READY" });
    });

    return () => unsub();

    // (async () => {
    //   if (user) {
    //     const response = await getDoc(docRef);
    //     const progress = response.data().progress;
    //     const firstName = response.data().firstName;
    //     const lastName = response.data().lastName;

    //     console.log("progress is:", progress);
    //     dispatch({ type: "SET_NAME", payload: { firstName, lastName } });
    //     dispatch({ type: "SET_PROGRESS", payload: progress });
    //     dispatch({ type: "USERDATA_IS_READY" });
    //   }
    // })();
  }, [user]);

  const updateProgress = async (category, value) => {
    const progressRef = doc(db, "users", user.uid);

    try {
      if (category === "numero") {
        await updateDoc(progressRef, {
          "progress.numero": arrayUnion(value),
        });
      }

      if (category === "letra") {
        await updateDoc(progressRef, {
          "progress.letra": arrayUnion(value),
        });
      }

      if (category === "tinaga") {
        await updateDoc(progressRef, {
          "progress.tinaga": arrayUnion(value),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateScore = async (category, subCategory, value) => {
    const scoreRef = doc(db, "users", user.uid);

    try {
      if (category === "numero") {
        await updateDoc(scoreRef, {
          [`scores.numero.${subCategory}`]: value,
        });
      }

      if (category === "letra") {
        await updateDoc(scoreRef, {
          [`scores.letra.${subCategory}`]: value,
        });
      }

      if (category === "tinaga") {
        await updateDoc(scoreRef, {
          [`scores.tinaga.${subCategory}`]: value,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserDataContext.Provider
      value={{ ...state, dispatch, updateProgress, updateScore }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
