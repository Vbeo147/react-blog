import { combineReducers } from "redux";
import { FirebaseReducer } from "react-redux-firebase";
import { FirestoreReducer } from "redux-firestore";

export const rootReducer = combineReducers({
  firebase: FirebaseReducer,
  firestore: FirestoreReducer,
});
