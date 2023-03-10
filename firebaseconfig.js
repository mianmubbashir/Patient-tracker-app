// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native'
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAe1ST9O9gRfrjUx7XrD656rNTk749pzk",
  authDomain: "patiently-789.firebaseapp.com",
  projectId: "patiently-789",
  storageBucket: "patiently-789.appspot.com",
  messagingSenderId: "933115495813",
  appId: "1:933115495813:web:820ee84be7c254b70330ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


const database = getDatabase(app);

export {auth, database}