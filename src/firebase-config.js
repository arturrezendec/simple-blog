import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyBvoZn6wZVGwuFADYHO66xVtOD7PeAzg-8",
  authDomain: "blog-simple-cd0f9.firebaseapp.com",
  projectId: "blog-simple-cd0f9",
  storageBucket: "blog-simple-cd0f9.appspot.com",
  messagingSenderId: "208151752885",
  appId: "1:208151752885:web:9005110aea80668d5d0efc"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);