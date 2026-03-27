import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

type CartItem = Product & { quantity: number };

interface State {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeProductFromCart: (product: Product) => void;
  emptyCart: () => void;
}

const calculateTotals = (cart: CartItem[]) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { totalItems, totalPrice };
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.id === product.id);

        const updatedCart = existing
          ? cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...cart, { ...product, quantity: 1 }];

        set({
          cart: updatedCart,
          ...calculateTotals(updatedCart),
        });
      },

      removeFromCart: (product) => {
        const cart = get().cart;
        const item = cart.find((i) => i.id === product.id);

        if (!item) return;

        const updatedCart =
          item.quantity > 1
            ? cart.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i
              )
            : cart.filter((i) => i.id !== product.id);

        set({
          cart: updatedCart,
          ...calculateTotals(updatedCart),
        });
      },

      removeProductFromCart: (product) => {
        const updatedCart = get().cart.filter((item) => item.id !== product.id);

        set({
          cart: updatedCart,
          ...calculateTotals(updatedCart),
        });
      },

      emptyCart: () =>
        set({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);
