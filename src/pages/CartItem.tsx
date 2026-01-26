import React from "react";
import type { Product } from "../types";
import { useCartStore } from "../services/carts";

interface IProps {
  product: Product;
}

export const CartItem = ({ product }: IProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
        <div className="sm:col-span-2 font-medium">{product.title}</div>

        <div className="text-gray-600">${product.price.toFixed(2)}</div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => removeFromCart(product)}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            −
          </button>

          <span className="min-w-[24px] text-center">{product.quantity}</span>

          <button
            onClick={() => addToCart(product)}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <div className="font-semibold">
          ${(product.price * product.quantity).toFixed(2)}
        </div>

        <div>
          <button
            onClick={() => removeProductFromCart(product)}
            className="text-red-600 text-sm hover:underline"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
