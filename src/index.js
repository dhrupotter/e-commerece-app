import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./contexts/auth.context";
import { ProductsProvider } from "./contexts/products.context";

// Call make Server
makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </AuthProvider>
  </Router>
  // </React.StrictMode>,
);
