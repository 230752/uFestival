import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router basename="/ufestival">
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;