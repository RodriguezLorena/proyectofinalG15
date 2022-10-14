import "./App.css";

import ProductDetail from "./components/Detail/DetailProduct";


import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
