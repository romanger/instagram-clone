// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDqmiRdcJS76_RVmZ_7Q3dc_5Tvezp_Abc",
    authDomain: "insta-2-ef89a.firebaseapp.com",
    projectId: "insta-2-ef89a",
    storageBucket: "insta-2-ef89a.appspot.com",
    messagingSenderId: "165168062866",
    appId: "1:165168062866:web:80107b69c769c1f02aa14b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}