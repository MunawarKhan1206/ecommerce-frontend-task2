"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import Cleave from "cleave.js/react"; // Import Cleave.js
import "cleave.js/dist/addons/cleave-phone.i18n";
import 'cleave.js/dist/addons/cleave-phone.us'; // For US
import 'cleave.js/dist/addons/cleave-phone.pk'; // For Pakistan
import { toast } from "react-toastify";

export default function Checkout() {
  const { cartItems, updateCartItems } = useContext(CartContext);
  const [storedCart, setStoredCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    creditCard: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Store cart items in localStorage on update
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setStoredCart(JSON.parse(savedCart));
    }
  }, []);

  // Update the quantity of an item in the cart
  const handleQuantityChange = (id, change) => {
    const updatedCart = storedCart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setStoredCart(updatedCart);
    updateCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Calculate total price 
  const totalPrice = storedCart.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return acc + price * quantity;
  }, 0);
  const taxAmount = totalPrice * 0.1;
  const finalTotal = totalPrice + taxAmount + 30; // Shipping cost is fixed
  const totalShipping = 30;

  // Handle form data 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const { name, address, phone, creditCard } = formData;
    const isValid = name && address && phone && creditCard; // Basic validation for now
    setIsFormValid(isValid);
  };

  // Handle the order placement
  const handlePlaceOrder = () => {
    if (isFormValid) {
      console.log("Order placed with data:", formData, storedCart);
      toast.success("Order placed successfully!");
      localStorage.removeItem("cartItems");
      setStoredCart([]);
      setFormData({ name: "", address: "", phone: "", creditCard: "" });
    } else {
      alert("Please fill all the fields correctly.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>

      {storedCart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600">Your cart is empty!</p>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Go back to shop
          </Link>
        </div>
      ) : (
        <div>
          <ul className="space-y-4 mb-6">
            {storedCart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4 text-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                  <div>
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="text-base">
                      {item.description.length > 100
                        ? `${item.description.substring(0, 150)}  .... Read More`
                        : item.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <p className="text-base">Quantity: {item.quantity}</p>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                    </div>
                    <p className="text-base">Price: ${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-white border border-black p-4 rounded-lg text-black mb-5">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p className="text-lg font-medium text-gray-700">Subtotal</p>
              <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-lg font-medium text-gray-700">Tax (10%)</p>
              <p className="text-lg font-semibold">${taxAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-lg font-medium text-gray-700">Shipping</p>
              <p className="text-lg font-semibold">${totalShipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-lg font-medium text-gray-700">Total</p>
              <p className="text-lg font-semibold text-green-600">
                ${finalTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={validateForm}
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {/* Address */}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              onBlur={validateForm}
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {/* Phone */}
            <Cleave
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={validateForm}
              options={{ phone: true, phoneRegionCode: 'us' }}
              placeholder="Phone Number"
              className="block p-2 mb-4 w-full border"
            />

            {/* Credit Card */}
            <Cleave
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
              onBlur={validateForm}
              options={{
                creditCard: true,
              }}
              placeholder="Credit Card Number"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handlePlaceOrder}
              className={`inline-block px-8 py-3 text-lg rounded-lg shadow-lg ${isFormValid ? "bg-green-600" : "bg-gray-400"
                } text-white transition duration-200`}
              disabled={!isFormValid}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
