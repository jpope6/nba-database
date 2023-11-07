import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import { BackendUrlProvider } from "./contexts/BackendUrlContext";

import "./App.css";

function App() {
  return (
    <BackendUrlProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BackendUrlProvider>
  );
}

export default App;
