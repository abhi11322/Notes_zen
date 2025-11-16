import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcafMVnGtyKeEkc_0SL2FJKnRAEDak72o",
  authDomain: "notes-app-42f6d.firebaseapp.com",
  projectId: "notes-app-42f6d",
  storageBucket: "notes-app-42f6d.firebasestorage.app",
  messagingSenderId: "418067186408",
  appId: "1:418067186408:web:cfe3c5eadb5eb6e48dff5d",
  measurementId: "G-HXGV6EF66B"
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
