import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import App from "./components/App";
import {
  firebaseReducer,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";

const fbConfig = {
  apiKey: "AIzaSyAkfoVPY7KHRfTONsgCSeoWDk4DisytmY0",
  authDomain: "blog-4cd65.firebaseapp.com",
  projectId: "blog-4cd65",
  storageBucket: "blog-4cd65.appspot.com",
  messagingSenderId: "801967607293",
  appId: "1:801967607293:web:74aa1468b705af0f885d94",
  measurementId: "G-MTC5L9T9ST",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);
