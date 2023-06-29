import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ProductList } from "./pages/ProductList/ProductList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
