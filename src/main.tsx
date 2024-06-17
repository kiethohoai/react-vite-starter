import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);
