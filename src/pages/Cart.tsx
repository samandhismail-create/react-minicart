import * as React from "react";
import useFromStore from "../hooks/useFromStore";
import { useCartStore } from "../services/carts";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router";
import { calculateTaxAmount } from "../utils/utilsFunction";

function Cart() {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const navigate = useNavigate();

  const total =
    cart?.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    ) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Your Items</div>

          <div className="p-6 space-y-4">
            {cart && cart.length > 0 ? (
              cart.map((product, index) => (
                <CartItem key={index} product={product} />
              ))
            ) : (
              <p className="text-gray-600">
                Your cart is empty.{" "}
                <a href="/" className="text-blue-600 hover:underline">
                  Continue shopping
                </a>
              </p>
            )}
          </div>
        </div>

        {cart?.length > 0 && (
          <div className="bg-white rounded-lg shadow h-fit">
            <div className="border-b px-6 py-4 font-semibold">
              Order Summary
            </div>

            <div className="p-6 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${calculateTaxAmount(total || "0")}</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
