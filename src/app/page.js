"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "./context/CartContext";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Fake Store Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700 text-sm">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
