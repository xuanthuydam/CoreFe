import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bank from "./page/Bank.jsx";
import Order from "./page/Order.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/bank" element={<Bank />} />
          <Route path="/withdraw" element={<Order />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
