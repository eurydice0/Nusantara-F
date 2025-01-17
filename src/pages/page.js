import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuPage from "./MenuPage";
import CheckoutPage from "./CheckoutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Menu" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/queue" element={<QueuePage />} />
      </Routes>
    </Router>
  );
};

export default App;
