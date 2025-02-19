"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // Import useAuth

export default function Dashboard() {
  const { user  } = useAuth();  // Get user from authentication context
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");  // Redirect to login if no user
    } else {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    }
  }, [user, router]);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Logout
      </button>

      {orders.length === 0 ? (
        <p className="text-center mt-4 text-gray-600">No orders yet.</p>
      ) : (
        <div>
          <ul className="space-y-4 mt-6">
            {orders.map((order, index) => (
              <li
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-2xl font-semibold">Order #{index + 1}</h2>
                <div className="mt-2 text-sm text-gray-700">
                  <p>Customer: {order.customer.name}</p>
                  <p>Address: {order.customer.address}, {order.customer.zip}</p>
                  <p>Phone: {order.customer.phone}</p>
                  <p>Total Amount: ${order.totalAmount}</p>
                  <p>Order Date: {order.date}</p>
                </div>

                <h3 className="text-xl font-semibold mt-4">Ordered Items:</h3>
                <ul className="space-y-2 mt-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      <h1 className="font-bold text-lg">{item.title}</h1>
                      <h4 className="font-semibold text-lg">
                        ${item.price} x {item.quantity}
                      </h4>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
