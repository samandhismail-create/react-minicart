import { create } from "zustand";
import type { Product } from "../types";

const url = "https://dummyjson.com/products";

interface State {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface Actions {
  fetchData: () => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
};

export const useProductStore = create<State & Actions>((set, get) => ({
  ...INITIAL_STATE,

  fetchData: async () => {
    if (get().isLoading) return;

    try {
      set({ isLoading: true, error: null });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      set({
        products: data.products ?? [],
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Something went wrong",
        isLoading: false,
      });
    }
  },

  reset: () => set(INITIAL_STATE),
}));
