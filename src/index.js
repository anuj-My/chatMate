import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import ChatProvider from "./context/ChatProvider";

import "./index.css";
import App from "./App";
import MobileProvider from "./context/MobileProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChatProvider>
          <MobileProvider>
            <App />
          </MobileProvider>
        </ChatProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
