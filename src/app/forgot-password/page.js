"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info(`A reset link has been sent to ${email}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full mt-2">Send Reset Link</button>
      </form>
    </div>
  );
}
