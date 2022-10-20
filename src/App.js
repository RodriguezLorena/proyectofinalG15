import "./App.css";
import ProductDetail from "./components/Detail/DetailProduct";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Formulario from "./components/Formulario/Formulario";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/formulario" element={<Formulario />} />
      </Routes>
    </div>
  );
}

export default App;
