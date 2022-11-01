import "./App.css";
import ProductDetail from "./components/Detail/DetailProduct";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Formulario from "./components/Formulario/Formulario";
import CartView from "./components/CartView/CartView";
import Pagos from "../src/components/Pagos/Pagos";
import PutUser from "./components/Usuario/PutUser";
import Review from "./components/Review/Review";
import Reviews from "./components/Review/Reviews";
import CreateProduct from "./components/createProduct/createProduct";
import Verifico from "./Verification/Verification";
import Sidebar from "./components/Sidebar/sidebar";
import EditProducts from "./components/EditProducts/EditProducts";
// import Error401 from "./components/Error401/Error401";

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
        <Route exact path="/verification/:id" element={<Verifico />} />
        <Route path="/review" element={<Review></Review>} />
        <Route path="/reviews" element={<Reviews></Reviews>} />
        <Route
          path="/createProduct"
          element={<CreateProduct></CreateProduct>}
        />
        <Route path="/user/:id" element={<PutUser />} />
        {/* <Route path="/error" element={<Error401 />} /> */}
        <Route path="/admin" element={<Sidebar />} />
        <Route path="/editProduct/:id" element={<EditProducts />} />
      </Routes>
    </div>
  );
}

export default App;
