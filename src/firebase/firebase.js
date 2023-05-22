// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdTFP7mZYBDUtOEVqoOn6FZ39lGHgQPCU",
    authDomain: "portfolio-marco.firebaseapp.com",
    projectId: "portfolio-marco",
    storageBucket: "portfolio-marco.appspot.com",
    messagingSenderId: "85303320263",
    appId: "1:85303320263:web:ef1be831816e3dfdc828e2",
    measurementId: "G-6WTYL0VC71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);