import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { LocationContextProvider } from "./store/location-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.cookie = "crossCookie=bar; SameSite=None; Secure";

root.render(
  <LocationContextProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </LocationContextProvider>
);
