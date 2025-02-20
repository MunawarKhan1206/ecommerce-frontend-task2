"use client";

import { useState, useEffect, useContext } from "react";
import { CartContext } from "./context/CartContext";
import Image from "next/image";
import Header from "@/components/Header";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToWishlist = (product) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!savedWishlist.some(item => item.id === product.id)) {
      savedWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
      toast.success(`${product.title} has been added to your wishlist!`);
    } else {
      toast.info(`${product.title} is already in your wishlist.`);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} has been added to your cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <h1 className="text-xl font-semibold text-gray-600">Loading products...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header products={products} setFilteredProducts={setFilteredProducts} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Furniro Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
              <p className="text-gray-600 text-sm">${product.price}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${product.title} to cart`}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  aria-label={`Add ${product.title} to wishlist`}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
