import { doc, getDoc } from "firebase/firestore";
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
  });

  useEffect(() => {
    (async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const response = await getDoc(docRef);
        const progress = response.data().progress;
        const firstName = response.data().firstName;
        const lastName = response.data().lastName;

        console.log("progress is:", progress);
        dispatch({ type: "SET_NAME", payload: { firstName, lastName } });
        dispatch({ type: "SET_PROGRESS", payload: progress });
        dispatch({ type: "USERDATA_IS_READY" });
      }
    })();
  }, [user]);

  return (
    <UserDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};
