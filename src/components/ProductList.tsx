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
  const [filterValue, setFilterValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const addToCart = useCartStore((state) => state.addToCart);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.category === debouncedQuery ||
          p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [products, debouncedQuery]
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedQuery(val);
      }, 500),
    []
  );

  const handleAddToCart = (item: Product) => {
    setLoadingIds((prev) => [...prev, item.id]);

    setTimeout(() => {
      addToCart(item);
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }, 300);
  };

  useEffect(() => {
    if (debouncedQuery) {
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  }, [filteredProducts, products, debouncedQuery]);

  const totalPages = Math.ceil(productList.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return productList.slice(start, start + ITEMS_PER_PAGE);
  }, [productList, currentPage]);

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => {
              setFilterValue(item);
              setDebouncedQuery(item);
              goToPage(1);
            }}
            className={`px-4 py-2 text-sm border rounded ${
              debouncedQuery === item
                ? "border-green-600 text-green-600"
                : "border-blue-600 text-blue-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mb-8 sticky top-16 bg-white z-10 py-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
            debouncedUpdate(e.target.value);
          }}
        />
      </div>

      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <Link to={`/product/${item.id}`} className="block">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-48 w-full object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">
                    {item.title}
                  </h3>
                  <span className="inline-block my-2 rounded bg-green-100 px-2 py-1 text-sm text-green-700">
                    Price: {item.price}
                  </span>
                  <p className="text-sm text-gray-600 mb-4">
                    Stock: {item.stock}
                  </p>
                </div>
              </Link>

              <div className="p-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={loadingIds.includes(item.id)}
                  className={`w-full flex justify-center items-center border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 transition ${
                    loadingIds.includes(item.id)
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loadingIds.includes(item.id) ? (
                    <span className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Product Found</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "text-blue-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
