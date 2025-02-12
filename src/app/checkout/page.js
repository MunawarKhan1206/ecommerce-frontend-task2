"use client";
import { useState, useEffect } from "react";
import Cleave from "cleave.js/react";
import Link from "next/link"; // Import Link

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: { name: "", address: "", city: "", state: "", zip: "", phone: "" },
    billing: { sameAsShipping: true, address: "", city: "", state: "", zip: "", phone: "" },
    payment: { cardNumber: "", expDate: "", cvv: "" },
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensures that the code only runs in the client-side context
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      alert("Order placed successfully!");
      // No more router.push, using Link for redirection now
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to place the order");
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [step === 1 ? "shipping" : step === 2 ? "billing" : "payment"]: {
        ...prev[step === 1 ? "shipping" : step === 2 ? "billing" : "payment"],
        [name]: value,
      },
    }));
  };

  const calculateTotal = () => {
    return 50.0; // You can modify this to calculate based on cart data
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <div className="flex space-x-4">
          <div className={`w-1/4 ${step === 1 ? "bg-blue-100" : ""}`}>Step 1: Shipping</div>
          <div className={`w-1/4 ${step === 2 ? "bg-blue-100" : ""}`}>Step 2: Billing</div>
          <div className={`w-1/4 ${step === 3 ? "bg-blue-100" : ""}`}>Step 3: Payment</div>
          <div className={`w-1/4 ${step === 4 ? "bg-blue-100" : ""}`}>Step 4: Review</div>
        </div>
        <div className="mt-4">
          {step === 1 && (
            <div>
              <h2 className="text-xl mb-4">Shipping Information</h2>
              <input
                type="text"
                name="name"
                value={formData.shipping.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="address"
                value={formData.shipping.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="city"
                value={formData.shipping.city}
                onChange={handleInputChange}
                placeholder="City"
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="state"
                value={formData.shipping.state}
                onChange={handleInputChange}
                placeholder="State"
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="zip"
                value={formData.shipping.zip}
                onChange={handleInputChange}
                placeholder="Zip Code"
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="phone"
                value={formData.shipping.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="block p-2 mb-4 w-full border"
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl mb-4">Billing Information</h2>
              <input
                type="checkbox"
                name="sameAsShipping"
                checked={formData.billing.sameAsShipping}
                onChange={handleInputChange}
                className="mb-4"
              />
              Use the same address as shipping
              {!formData.billing.sameAsShipping && (
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.billing.address}
                    onChange={handleInputChange}
                    placeholder="Billing Address"
                    className="block p-2 mb-4 w-full border"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.billing.city}
                    onChange={handleInputChange}
                    placeholder="Billing City"
                    className="block p-2 mb-4 w-full border"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.billing.state}
                    onChange={handleInputChange}
                    placeholder="Billing State"
                    className="block p-2 mb-4 w-full border"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={formData.billing.zip}
                    onChange={handleInputChange}
                    placeholder="Billing Zip Code"
                    className="block p-2 mb-4 w-full border"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.billing.phone}
                    onChange={handleInputChange}
                    placeholder="Billing Phone Number"
                    className="block p-2 mb-4 w-full border"
                  />
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl mb-4">Payment Information</h2>
              <Cleave
                name="cardNumber"
                value={formData.payment.cardNumber}
                onChange={handleInputChange}
                placeholder="Card Number"
                options={{ creditCard: true }}
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="expDate"
                value={formData.payment.expDate}
                onChange={handleInputChange}
                placeholder="Expiration Date"
                className="block p-2 mb-4 w-full border"
              />
              <input
                type="text"
                name="cvv"
                value={formData.payment.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                className="block p-2 mb-4 w-full border"
              />
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-xl mb-4">Order Review</h2>
              <p><strong>Shipping:</strong> {formData.shipping.name}</p>
              <p><strong>Billing:</strong> {formData.billing.sameAsShipping ? 'Same as Shipping' : formData.billing.address}</p>
              <p><strong>Total:</strong> ${calculateTotal()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <Link href="/">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Place Order
            </button>
          </Link>
        )}
      </div>

      {loading && <div className="mt-4 text-center">Placing your order...</div>}
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </div>
  );
}
