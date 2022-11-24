import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBy5FOKxKHi3oNw4yfCytyD4JSdx_DlC4U",
  authDomain: "mothertongue-elearning-d94ec.firebaseapp.com",
  projectId: "mothertongue-elearning-d94ec",
  storageBucket: "mothertongue-elearning-d94ec.appspot.com",
  messagingSenderId: "935096096981",
  appId: "1:935096096981:web:b9d20c21410143db4aea5c",
  measurementId: "G-XZDDK2HY1B",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
