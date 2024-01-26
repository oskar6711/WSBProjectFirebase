import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnmEcqnqrRiAPDLAMBXk2KWEdqd2FL-0o",
  authDomain: "wsbproject-5eb14.firebaseapp.com",
  projectId: "wsbproject-5eb14",
  storageBucket: "wsbproject-5eb14.appspot.com",
  messagingSenderId: "283693868438",
  appId: "1:283693868438:web:d22a9beeca21345b1069b7",
  databaseURL: "https://wsbproject-5eb14-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getDatabase(app)

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup Success!");
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error);
      alert("Signup failure..");
    });
};

export const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Success!");
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error);
      alert("Login failure..");
    });
};
