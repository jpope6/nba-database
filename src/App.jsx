import React from "react";
import Header from "./components/Header/header";
import Home from "./containers/Home/home";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
    </div>
  );
}

export default App;
