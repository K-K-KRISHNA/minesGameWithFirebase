import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqzSZuDL5irFs81nJRwzzCPvRNT02c03Y",
  authDomain: "minesgame-30d4d.firebaseapp.com",
  projectId: "minesgame-30d4d",
  storageBucket: "minesgame-30d4d.appspot.com",
  messagingSenderId: "384959204455",
  appId: "1:384959204455:web:69f98cca8ce1760a1f98c2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
