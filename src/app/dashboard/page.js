"use client";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchOrders();
    }
  }, [user, router]); 

  const fetchOrders = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();
    setOrders(data);
  };

  if (!user) return <p className="text-center font-bold text-2xl text-black">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

      <h2 className="text-xl mt-4">Order History</h2>
      <ul className="mt-2">
        {orders.map((order) => (
          <li key={order.id} className="border p-2 my-2">
            {order.title}
          </li>
        ))}
      </ul>

      <button onClick={logout} className="bg-red-500 text-white p-2 mt-4">Logout</button>
    </div>
  );
}
