// App.js
import React from "react";
import EmployeeTable from "./components/EmployeeTable"; // ✅ Updated path
import "./App.css";

function App() {
  return (
    <div className="app-background">
      <div className="container">
        <EmployeeTable />
      </div>
    </div>
  );
}

export default App;
