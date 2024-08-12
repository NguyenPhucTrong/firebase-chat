// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth"

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALLiUQXVNel3X4aeUK3gJwiHCBX5Sq7xc",
    authDomain: "fir-chat-4e0a2.firebaseapp.com",
    projectId: "fir-chat-4e0a2",
    storageBucket: "fir-chat-4e0a2.appspot.com",
    messagingSenderId: "324710987555",
    appId: "1:324710987555:web:f76613da7074f4ef93be96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Enable persistence for offline functionality

})

export const db = getFirestore(app);

export const useRef = collection(db, "users");
export const roomRef = collection(db, "rooms");