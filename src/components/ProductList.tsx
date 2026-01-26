import React, { useEffect, useMemo, useState } from "react";
import type { Product } from "../types";
import { Link, useSearchParams } from "react-router";
import { debounce } from "lodash";
import { useCartStore } from "../services/carts";

interface IProduct {
  products: Product[];
}

const ITEMS_PER_PAGE = 10;

const ProductList = ({ products }: IProduct) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const addToCart = useCartStore((state) => state.addToCart);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchText(value);
      }, 400),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const filteredProducts = useMemo(() => {
    const text = searchText.toLowerCase();

    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (text && !p.title.toLowerCase().includes(text)) return false;
      return true;
    });
  }, [products, searchText, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleAddToCart = (item: Product) => {
    setLoadingIds((prev) => [...prev, item.id]);

    setTimeout(() => {
      addToCart(item);
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => {
            setSelectedCategory("");
            goToPage(1);
          }}
          className={`px-4 py-2 border rounded ${
            !selectedCategory
              ? "border-green-600 text-green-600"
              : "border-blue-600 text-blue-600"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              goToPage(1);
            }}
            className={`px-4 py-2 border rounded ${
              selectedCategory === cat
                ? "border-green-600 text-green-600"
                : "border-blue-600 text-blue-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-6 sticky top-16 bg-white z-10 py-2">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => {
            debouncedSearch(e.target.value);
            goToPage(1);
          }}
          className="w-full border rounded px-4 py-2"
        />
      </div>

      {paginatedProducts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-48 w-full object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-sm mt-2">Price: {item.price}</p>
                  <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                </div>
              </Link>

              <div className="p-4">
                <button
                  disabled={loadingIds.includes(item.id)}
                  onClick={() => handleAddToCart(item)}
                  className="w-full border border-green-600 text-green-600 py-2 rounded"
                >
                  {loadingIds.includes(item.id) ? "Adding..." : "Add To Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No Product Found</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? "font-bold" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
