// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyB5l-VlV13KfcXjl2HWaC8CzLgX3wJU684",
    authDomain: "greener-4e7f0.firebaseapp.com",
    projectId: "greener-4e7f0",
    storageBucket: "greener-4e7f0.appspot.com",
    messagingSenderId: "824506329589",
    appId: "1:824506329589:web:406476ec72615ab10a98bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
