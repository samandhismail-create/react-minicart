import { BrowserRouter, Routes } from "react-router";
import "./App.css";
import { Route } from "react-router";

import Navbar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import { productStore } from "./services/products";
import Skeleton from "react-loading-skeleton";
import ProductList from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail";
import { useEffect } from "react";
import Cart from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import Login from "./auth/Login";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { Profile } from "./pages/Profile";

function App() {
  const { products, isLoading, fetchData } = productStore();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isLoading ? (
                  <Skeleton width={"1000px"} />
                ) : (
                  <ProductList products={products} />
                )}
              </>
            }
          />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
