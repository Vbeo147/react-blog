import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";

const fbConfig = {
  apiKey: "AIzaSyAkfoVPY7KHRfTONsgCSeoWDk4DisytmY0",
  authDomain: "blog-4cd65.firebaseapp.com",
  projectId: "blog-4cd65",
  storageBucket: "blog-4cd65.appspot.com",
  messagingSenderId: "801967607293",
  appId: "1:801967607293:web:74aa1468b705af0f885d94",
  measurementId: "G-MTC5L9T9ST",
};

firebase.initializeApp(fbConfig);
firebase.firestore();
firebase.storage();

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default firebase;
