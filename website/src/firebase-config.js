import './index.css';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged} from'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBo2Uy2IdTDQq-DR33WWH3MTA7P5O6sy8Q",
  authDomain: "thoughts-75925.firebaseapp.com",
  projectId: "thoughts-75925",
  storageBucket: "thoughts-75925.appspot.com",
  messagingSenderId: "964311563738",
  appId: "1:964311563738:web:e2f2e3d0ca673057ee94e3",
  measurementId: "G-F72H8R7MBQ"
})

export const auth = getAuth(firebaseApp);
export const db = getFirestore();

const colRef = collection(db, 'discussions');

onAuthStateChanged(auth, user=> {
  if(user != null){
    console.log(auth.currentUser.email);
    console.log(auth.currentUser.uid);
    console.log('logged in!'); 
  }
  else{
    console.log('No user');
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();