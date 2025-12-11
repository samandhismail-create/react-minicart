import { useNavigate } from "react-router";
import useFromStore from "../hooks/useFromStore";
import { cartStore } from "../services/carts";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const cart = useFromStore(cartStore, (state) => state.cart);
  const context = useContext(AuthContext);

  console.log(context, "context");

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-light sticky-top">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          InfoMart
        </span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex" style={{ gap: "4px" }}>
            {context?.isAuthenticated ||
            localStorage.getItem("login") === "true" ? (
              <>
                <button
                  className="btn btn-outline-primary position-relative"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>

                <button
                  className="btn btn-outline-primary position-relative"
                  onClick={() => localStorage.clear()}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-primary position-relative"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            <button
              onClick={() => navigate("/cart")}
              className="btn btn-outline-primary position-relative"
              type="button"
            >
              Cart{" "}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {cart?.length || "0"}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
