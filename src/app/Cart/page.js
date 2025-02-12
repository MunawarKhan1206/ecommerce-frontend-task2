"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty! <Link href="/shop" className="text-blue-500">Go back to shop</Link></p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4 flex justify-between items-center">
                <p className="font-semibold">{item.title}</p>
                <p>${item.price} x {item.quantity}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/order-success"
            className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded"
          >
            Place Order
          </Link>
        </div>
      )}
    </div>
  );
}
