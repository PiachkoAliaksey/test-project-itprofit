import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <App />
);

