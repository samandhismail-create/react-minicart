import React, { useEffect, useMemo, useState } from "react";
import type { Product } from "../types";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { debounce } from "lodash";
import { cartStore } from "../services/carts";

interface IProduct {
  products: Product[];
}
const ProductList = ({ products }: IProduct) => {
  const [filterValue, setFilterValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const [productList, setProductList] = useState<Product[]>([]);

  const categories = products.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];
  const addToCart = cartStore((state) => state.addToCart);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.category === debouncedQuery ||
          p.title.toLowerCase() === debouncedQuery
      ),
    [debouncedQuery, products]
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedQuery(val);
      }, 500),
    []
  );

  console.log(filterValue, "filterValue");

  useEffect(() => {
    if (debouncedQuery && filteredProducts?.length === 0) {
      setProductList([]);
    } else if (debouncedQuery && filteredProducts?.length > 0) {
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  }, [debouncedQuery, filteredProducts, products]);

  return (
    <>
      <div className="row">
        {uniqueCategories.map((item, index) => {
          return (
            <div className="col-1">
              <Button
                key={index}
                variant={
                  debouncedQuery === item
                    ? "outline-success"
                    : "outline-primary"
                }
                onClick={() => {
                  setFilterValue(item);
                  setDebouncedQuery(item);
                }}
              >
                {item}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="container my-5 ">
        {
          <div>
            <div className="row">
              <div className="col-lg-8 offset-md-2 mb-2">
                <div className="form-group-icon sticky-top">
                  <input
                    type="text"
                    placeholder="Search by product name or category...."
                    className="form-control"
                    value={filterValue}
                    onChange={(e) => {
                      setFilterValue(e.target.value);
                      debouncedUpdate(e.target.value);
                    }}
                  />
                  <i className="ic-search"></i>
                </div>
              </div>
            </div>

            <div className="row">
              {productList?.length > 0
                ? productList?.map((item) => {
                    return (
                      <div className="col-3" key={item?.id}>
                        <Link
                          to={`/product/${item.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div
                            className="card mb-4"
                            style={{
                              boxShadow: "0 9px 9px #d8dde0",
                            }}
                          >
                            <img
                              src={item.thumbnail}
                              className="card-img-top"
                              alt="..."
                              height={"200px"}
                              width={"200px"}
                              style={{ padding: "1rem", objectFit: "contain" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{item?.title}</h5>

                              <p className="card-text">
                                <span className="badge badge-success">
                                  Price: {item?.price}{" "}
                                </span>
                              </p>
                              <p className="card-text">Stock: {item?.stock}</p>

                              <button
                                type="button"
                                className="btn btn-outline-success"
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                : "No Product Found"}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default ProductList;
