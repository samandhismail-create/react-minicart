import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useCartStore } from "../services/carts";
import type { Product } from "../types";
import dayjs from "dayjs";
import { StarRating } from "../components/StarRating";
import axios from "axios";
import { Loader } from "../components/Loader";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [data, setData] = useState<Product>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch(`https://dummyjson.com/products/${id}`);
  //       const json = await res.json();
  //       setData(json);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchData();
  // }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="w-full max-w-md rounded-lg object-contain shadow"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">{data?.title}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-2">
            ${data?.price?.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-1">{data?.brand}</p>
          <p className="text-gray-600 mb-3">
            Stock: {data?.stock ?? "Out of Stock"}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={data?.rating || 0} />
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-700 mb-4">{data?.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium">Quantity</label>

            <input
              readOnly
              type="number"
              min={1}
              defaultValue={1}
              className="w-20 border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => {
              addToCart(data);
              navigate("/cart");
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

        {data?.reviews?.length ? (
          <div className="space-y-4">
            {data.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <div>
                    <h4 className="font-semibold">{review.reviewerName}</h4>
                    <p className="text-sm text-gray-500">
                      {review.reviewerEmail}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {review?.date
                      ? dayjs(review.date).format("DD/MM/YYYY")
                      : ""}
                  </p>
                </div>

                <StarRating rating={review.rating} />

                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
}
