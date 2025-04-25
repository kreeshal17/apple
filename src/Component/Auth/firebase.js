// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqoK42gGRtQeRabaLAXpi1PcjtzyMIibQ",
    authDomain: "react-39176.firebaseapp.com",
    projectId: "react-39176",
    storageBucket: "react-39176.firebasestorage.app",
    messagingSenderId: "1019190209771",
    appId: "1:1019190209771:web:e96f97f71988a0bcd822ae",
    measurementId: "G-YC0S2EEHSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getFirestore(app)



//code
export const auth = getAuth();

export default app;