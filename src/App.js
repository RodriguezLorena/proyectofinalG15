import "./App.css";
import ProductDetail from "./components/Detail/DetailProduct";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Formulario from "./components/Formulario/Formulario";
import CartView from "./components/CartView/CartView";
import Pagos from "../src/components/Pagos/Pagos";
import Sidebar from "./components/Sidebar/sidebar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/formulario" element={<Formulario />} />
        <Route path="/carrito" element={<CartView />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/admin" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
