import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase/config";
import { useUserDataContext } from "./useUserDataContext";

const useFetchStudents = () => {
  const [myStudents, setMyStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);

  const { name } = useUserDataContext();

  console.log("name from useFetch", name);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("fetchUsers ran");
      const unsub = await onSnapshot(collection(db, "users"), (collection) => {
        const data = [];
        collection.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        console.log("studentlist", data);
        const filteredData = data.filter(
          (item) =>
            item.userType === "student" &&
            item.teacher.name === `${name.firstName} ${name.lastName}` &&
            item.status === "enrolled"
        );
        setMyStudents(filteredData);
        const filteredPendingStudents = data.filter(
          (item) =>
            item.userType === "student" &&
            item.teacher === `${name.firstName} ${name.lastName}` &&
            item.status === "pending"
        );
        setPendingStudents(filteredPendingStudents);

        return () => unsub();
      });

      // const querySnapshot = await getDocs(collection(db, "users"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   data.push(doc.data());
      // });
      // console.log("studentlist", data);
      // const filteredData = data.filter(
      //   (item) =>
      //     item.userType === "student" &&
      //     item.teacher.name === `${name.firstName} ${name.lastName}` &&
      //     item.status === "enrolled"
      // );
      // setMyStudents(filteredData);
      // const filteredPendingStudents = data.filter(
      //   (item) =>
      //     item.userType === "student" &&
      //     item.teacher.name === `${name.firstName} ${name.lastName}` &&
      //     item.status === "pending"
      // );
      // setPendingStudents(filteredPendingStudents);
    };

    name && fetchUsers();
  }, [name]);

  return { myStudents, pendingStudents };
};

export default useFetchStudents;
