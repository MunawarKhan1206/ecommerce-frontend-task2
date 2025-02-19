"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"; // For icons
import Image from "next/image";
import { toast } from 'react-toastify';

export default function Wishlist() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Item removed from wishlist!");
  };

  const handleAddToWishlist = (product) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!savedWishlist.some(item => item.id === product.id)) {
      savedWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
      toast.success(`${product.title} has been added to your wishlist!`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center mt-4 text-gray-600">
          <p>Your wishlist is empty. Add some items!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="relative w-full h-32">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-1">${item.price}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="bg-red-500 text-white rounded-lg px-3 py-1 text-sm hover:bg-red-600 transition-colors duration-200 flex items-center"
                  >
                    Remove
                    <TrashIcon className="h-5 w-5 ml-2" />
                  </button>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
