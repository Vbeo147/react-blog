import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import Home from "./components/Home";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./rootReducer";
import firebase from "./rootReducer";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const store = createStore(rootReducer);

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
      <BrowserRouter basename="/react-blog/">
        <React.StrictMode>
          <Home />
        </React.StrictMode>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);
