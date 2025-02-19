"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import Cleave from "cleave.js/react"; // Import Cleave.js
import "cleave.js/dist/addons/cleave-phone.i18n";
import 'cleave.js/dist/addons/cleave-phone.pk'; // For Pakistan
import { toast } from "react-toastify";

export default function Checkout() {
  const { cartItems, updateCartItems } = useContext(CartContext);
  const [storedCart, setStoredCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zip: "",
    phone: "",
    creditCard: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setStoredCart(JSON.parse(savedCart));
    }
  }, []);
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

  const totalPrice = storedCart.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return acc + price * quantity;
  }, 0);
  const taxAmount = totalPrice * 0.1;
  const finalTotal = totalPrice + taxAmount + 30; 
  const totalShipping = 30;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm();
  };
  const validateForm = () => {
    const { name, address, zip, phone, creditCard } = formData;
    const isValid = name && address && zip.length === 5 && phone && creditCard;
    setIsFormValid(isValid);
  };
  const handlePlaceOrder = () => {
    if (isFormValid) {
      const orderData = {
        customer: formData,
        items: storedCart,
        totalAmount: finalTotal.toFixed(2),
        date: new Date().toLocaleString(),
      };
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      toast.success("Order placed successfully!");

      // Clear cart
      localStorage.removeItem("cartItems");
      setStoredCart([]);
      setFormData({ name: "", address: "", zip: "", phone: "", creditCard: "" });
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
              <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center space-x-4 text-black">
                  <Image src={item.image} alt={item.title} width={100} height={100} className="object-cover rounded-md"/>
                  <div>
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="text-base">Quantity: {item.quantity}</p>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <p className="text-base">Price: ${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-white border border-black p-4 rounded-lg text-black mb-5">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <p>Subtotal: ${totalPrice.toFixed(2)}</p>
            <p>Tax (10%): ${taxAmount.toFixed(2)}</p>
            <p>Shipping: ${totalShipping.toFixed(2)}</p>
            <p className="font-bold">Total: ${finalTotal.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-lg"/>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full p-2 border border-gray-300 rounded-lg"/>
            <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="ZIP Code (5 digits)" className="w-full p-2 border border-gray-300 rounded-lg"/>
            <Cleave name="phone" value={formData.phone} onChange={handleInputChange} options={{ phone: true, phoneRegionCode: 'pk' }} placeholder="Phone Number" className="block p-2 w-full border"/>
            <Cleave name="creditCard" value={formData.creditCard} onChange={handleInputChange} options={{ creditCard: true }} placeholder="Credit Card Number" className="w-full p-2 border border-gray-300 rounded-lg"/>
          </div>

          <button onClick={handlePlaceOrder} className={`mt-4 w-full py-2 text-lg font-bold rounded-lg text-white ${isFormValid ? "bg-green-600" : "bg-gray-400"}`} disabled={!isFormValid}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
