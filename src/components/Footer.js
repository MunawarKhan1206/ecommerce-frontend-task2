"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-5">
      <div className="mt-2 border bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-between gap-8">
            <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
              <h4 className="text-blue-700 font-bold text-xl">Brand</h4>
              <p className="text-black mt-3 text-base font-medium">
                Best information about the company goes here, but now lorem
                ipsum.
              </p>
            </div>
            <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-8">
              <div>
                <h5 className="font-semibold text-gray-800">Our Story</h5>
                <ul className="mt-2 text-sm text-gray-700 space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Our Mission
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Our Vision
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Meet The Team
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">Affiliates</h5>
                <ul className="mt-2 text-sm text-gray-700 space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Become an Affiliate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Affiliate Program
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Partnership Benefits
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Partner with Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800">Information</h5>
                <ul className="mt-2 text-sm text-gray-700 space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Money Refund
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">Legal</h5>
                <ul className="mt-2 text-sm text-gray-700 space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Return Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800">Follow Us</h5>
                <ul className="mt-2 text-sm text-gray-700 space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 border-t mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
          <p className="text-base font-semibold text-gray-700">
            © 2025 Ecommerce Web. All rights reserved by Munawar Khan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
