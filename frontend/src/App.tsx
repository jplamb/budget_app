import React from 'react';
import './App.css';
import FinanceApp from "./components/FinanceApp";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
      <React.StrictMode>
          <BrowserRouter>
              <FinanceApp />
          </BrowserRouter>
      </React.StrictMode>
  );
}

export default App;
