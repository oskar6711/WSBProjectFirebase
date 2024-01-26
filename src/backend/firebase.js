import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnmEcqnqrRiAPDLAMBXk2KWEdqd2FL-0o",
  authDomain: "wsbproject-5eb14.firebaseapp.com",
  projectId: "wsbproject-5eb14",
  storageBucket: "wsbproject-5eb14.appspot.com",
  messagingSenderId: "283693868438",
  appId: "1:283693868438:web:d22a9beeca21345b1069b7",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
