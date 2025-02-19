"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, HeartIcon, } from "@heroicons/react/24/outline";

export default function Header({ products, setFilteredProducts }) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (setFilteredProducts && products) {
      if (searchQuery) {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setFilteredProducts(filtered);  
      } else {
        setFilteredProducts(products);  
      }
    }
  }, [searchQuery, products, setFilteredProducts]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Furniro
        </Link>
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  
          />
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/Cart">
            <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
          </Link>
          <nav className="hidden md:flex space-x-6">
          <Link href="/wishlist">
            <HeartIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
          </Link>
          </nav>
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-700">Dashboard</Link>
              <button onClick={logout} className="text-red-500">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-blue-600">Login</Link>
          )}
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  
          />
          <Link href="/wishlist" className="block text-gray-700">Wishlist</Link>
          <Link href="/Cart" className="block text-gray-700">Cart</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block text-gray-700">Dashboard</Link>
              <button onClick={logout} className="block text-red-500">Logout</button>
            </>
          ) : (
            <Link href="/login" className="block text-blue-600">Login</Link>
          )
          }
        </div>
      )}
    </header>
  );
}
