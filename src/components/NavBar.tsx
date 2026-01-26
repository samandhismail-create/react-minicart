import { useNavigate } from "react-router";
import useFromStore from "../hooks/useFromStore";
import { useCartStore } from "../services/carts";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isLoggedIn = context.isAuthenticated;

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    context.setAuth(false);
    useCartStore.getState().emptyCart();
    navigate("/login");
    setOpen(false);
  };

  const cartQuantity = cart?.length || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <span
            onClick={() => handleNavigate("/")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            InfoMart
          </span>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                Login
              </button>
            )}

            <button
              onClick={() => handleNavigate("/cart")}
              className="relative flex items-center px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
            >
              <FiShoppingCart className="text-xl mr-2" />
              Cart
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-semibold">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col gap-2 p-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="w-full text-left px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="w-full text-left px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                Login
              </button>
            )}

            <button
              onClick={() => handleNavigate("/cart")}
              className="w-full flex justify-between items-center px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
            >
              <span className="flex items-center">
                <FiShoppingCart className="text-xl mr-2" />
                Cart
              </span>
              {cartQuantity > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-semibold">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
