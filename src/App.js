import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>Game Template</h1>
        <div className="version-info">
          <span>Version {process.env.REACT_APP_VERSION || "0.1.0"}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
