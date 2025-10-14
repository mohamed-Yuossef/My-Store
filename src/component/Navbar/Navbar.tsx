"use client";
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import { UserContext } from "../../Context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
interface CartContextType {
  numberItem?: number;
  setNumberItem?: React.Dispatch<React.SetStateAction<number>>;
}

interface WishListContextType {
  wishlistCount?: number;
}

interface UserContextType {
  userLogin?: boolean;
  user?: { _id?: string; name?: string; email?: string };
}

export default function Navbar(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const { userLogin } = useContext(UserContext) as UserContextType;
  const { numberItem = 0 } = useContext(CartContext) as CartContextType;
  const { wishlistCount = 0 } = useContext(
    WishListContext
  ) as WishListContextType;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full bg-white/95 shadow-md z-50"
    >
      <div className="container mx-auto flex justify-between items-center h-20 px-6 py-3">
        {/* Left: Logo */}
        <div className="text-2xl font-bold cursor-pointer">My Store</div>
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <Link to="/cart">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600" />
              {numberItem > 0 && (
                <span className="absolute font-medium -top-2 -right-2 bg-red-500/95 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {numberItem}
                </span>
              )}
            </Link>
          </div>
          <div className="relative">
            <Link to="/wishlist">
              <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
              {wishlistCount > 0 && (
                <span className="absolute font-medium -top-2 -right-2 bg-red-500/95 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Center: Menu (Desktop) */}
        <ul className="hidden md:flex gap-8 text-md font-medium">
          {[
            { label: "Home", path: "/" },
            { label: "Products", path: "products" },
            { label: "Cart", path: "cart" },
            { label: "Wishlist", path: "wishlist" },
          ].map(({ label, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `cursor-pointer transition relative px-1 py-1 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300  ${
                    isActive ? "text-black font-semibold after:scale-x-100" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-5 text-gray-700">
            <div className="relative">
              <Link to="/cart">
                <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-600" />
                {numberItem > 0 && (
                  <span className="absolute font-medium -top-3 -right-3 bg-red-500/95 text-white w-5 h-5 flex items-center justify-center rounded-full">
                    {numberItem}
                  </span>
                )}
              </Link>
            </div>
            <div className="relative">
              <Link to="/wishlist">
                <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
                {wishlistCount > 0 && (
                  <span className="absolute font-medium -top-3 -right-3 bg-red-500/95 text-white w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="relative  hidden md:flex ">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-12 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-50 cursor-pointer relative w-5 h-5 flex flex-col justify-between md:hidden"
            aria-label="Toggle menu"
            type="button"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-1 w-full bg-black rounded"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="block h-1 w-full bg-black rounded"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-1 w-full bg-black rounded"
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-full bg-white/95 shadow-2xl z-40 p-6"
          >
            <ul className="flex flex-col gap-6 text-lg font-medium mt-10">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "products" },
                { label: "Cart", path: "cart" },
                { label: "Wishlist", path: "wishlist" },
                { label: "Contact", path: "contact" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t pt-6 flex gap-6 text-gray-700">
              <div className="relative">
                <Link to="/cart">
                  <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-600" />
                  {numberItem > 0 && (
                    <span className="absolute -top-3 -right-3 bg-red-500/95 text-white w-5 h-5 flex items-center justify-center rounded-full">
                      {numberItem}
                    </span>
                  )}
                </Link>
              </div>
              <div className="relative">
                <Link to="/wishlist">
                  <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-3 -right-3 bg-red-500/95 text-white w-6 h-6 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>

             <div className="relative  ">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center mx-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
