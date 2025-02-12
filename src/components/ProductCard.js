"use client";

import Image from "next/image";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Image src={product.image} alt={product.title} width={200} height={200} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600 mt-1">${product.price}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
