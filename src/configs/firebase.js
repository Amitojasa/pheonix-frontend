import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA3-IpSHeckkQEDtxavSRWNkshMNOZpRiE",
    authDomain: "phoenix-f5048.firebaseapp.com",
    projectId: "phoenix-f5048",
    storageBucket: "phoenix-f5048.appspot.com",
    messagingSenderId: "604087392280",
    appId: "1:604087392280:web:4de8ba968e7e35a02b8b6d",
    measurementId: "G-X8ETPBEJNV",
    databaseURL: "https://phoenix-f5048.firebaseio.com"
};

// initialize firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();