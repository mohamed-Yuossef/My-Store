import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" text-black bg-gray-100  pt-12 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-4">My Store</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop shop for all your needs. From fashion to electronics,
            we deliver quality products right to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-black font-semibold text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2 ">
            <li>
              <Link to="/" className="hover:text-gray-500 ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-500 ">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gray-500 ">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-500 ">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-black font-semibold text-xl mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-gray-500 ">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 ">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 ">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 ">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-black font-semibold text-xl mb-4">Stay Connected</h3>
          <div className="flex space-x-4 mb-4">
            <Link
              to="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaInstagram />
            </Link>
            <Link
              to="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaTwitter />
            </Link>
          </div>
          <p className="text-gray-400 text-sm mb-2">We accept:</p>
          <div className="flex space-x-3 text-2xl">
            <FaCcVisa />
            <FaCcMastercard />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} E.Commers. All rights reserved.
      </div>
    </footer>
  );
}
