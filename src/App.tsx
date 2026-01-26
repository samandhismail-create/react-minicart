import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import Login from "./auth/Login";
import { Profile } from "./pages/Profile";

import { useProductStore } from "./services/products";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { Loader } from "./components/Loader";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { products, isLoading, error, fetchData } = useProductStore();

  useEffect(() => {
    fetchData();
  }, []); // fetch once

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <Loader />
              ) : error ? (
                <p className="text-danger text-center">{error}</p>
              ) : (
                <ProductList products={products} />
              )
            }
          />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="*"
            element={<ErrorPage status={404} message="Page Not Found" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
