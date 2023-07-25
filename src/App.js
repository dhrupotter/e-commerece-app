import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import { RequiresAuth } from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ProductList } from "./pages/ProductList/ProductList";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./components/Login/Login";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
