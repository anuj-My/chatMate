import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ9WHhONOSSv7Q4th6RrHyrSGN6FLJ8Qk",
  authDomain: "chat-6a7fa.firebaseapp.com",
  projectId: "chat-6a7fa",
  storageBucket: "chat-6a7fa.appspot.com",
  messagingSenderId: "842633169242",
  appId: "1:842633169242:web:428d5c38928578f6cd4b63",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
