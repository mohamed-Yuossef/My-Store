// ...existing code...
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

interface ProductMinimal {
  _id: string;
  imageCover: string;
  title: string;
  price?: number;
}

interface CartItem {
  _id?: string;
  product: ProductMinimal;
  count: number;
  price?: number;
}

interface AllCartItem {
  products: CartItem[];
  totalCartPrice?: number;
}

// type CartContextType = {
//   AllCart: () => Promise<unknown>;
//   ClearCart: () => Promise<unknown>;
//   UpDateProduct: (id: string, count: number) => Promise<unknown>;
//   RemoveCart: (id: string) => Promise<unknown>;
//   numberItem?: number;
//   setNumberItem?: React.Dispatch<React.SetStateAction<number>>;
// };

export default function Cart(): React.ReactElement {
  const {
    AllCart,
    updateItem,
    removeItem,
    numberItem = 0,
    setNumberItem,
    clearCart,
  } = useContext(CartContext);

  const [allCartItem, setAllCartItem] = useState<AllCartItem | null>(null);
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function AllItem(): Promise<void> {
    setLoading(true);
    try {
      const res = await AllCart();
      const data = res?.data?.data ?? res?.data ?? null;
      setAllCartItem(data);
      // if API returns number of cart items, update context safely
      if (typeof setNumberItem === "function") {
        const countFromApi = res?.data?.numOfCartItems ?? numberItem;
        setNumberItem(countFromApi);
      }
    } catch (err) {
      console.error(err);
      setAllCartItem(null);
    } finally {
      setLoading(false);
    }
  }

  async function UpdateItem(id: string, count: number): Promise<void> {
    if (count < 1) return;
    setLoadingItem(id);
    try {
      const response = await updateItem(id, count);
      const data = response?.data?.data ?? response?.data ?? null;
      setAllCartItem(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingItem(null);
    }
  }

  async function DeleteCArt(id: string): Promise<void> {
    setLoading(true);
    try {
      const response = await removeItem(id);
      const data = response?.data?.data;
      setAllCartItem(data);
      if (typeof setNumberItem === "function") {
        setNumberItem(Math.max(0, (numberItem ?? 1) - 1));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
 async function ClearUserCart() {
    setLoading(true);
    await clearCart();
    setAllCartItem({ products: [], totalCartPrice: 0 });
    if (typeof setNumberItem === "function") {
      setNumberItem(0);
    }
    setLoading(false);
  }

  useEffect(() => {
    AllItem();
  }, []);

  // ✅ حالة التحميل
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[100vh]">
        <div className="">
          <Loader />
        </div>
      </div>
    );
  }

  // ✅ حالة السلة الفارغة
  if (
    !loading &&
    (!allCartItem ||
      !Array.isArray(allCartItem.products) ||
      allCartItem.products.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center min-h-[70vh]">
        {/* ...empty cart UI... */}
        <p className="text-lg font-medium mb-4">The cart is currently empty</p>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <section className="container">
      <div className="container m-6 pb-3 hidden md:flex lg:hidden  ">
        <h3 className=" text-black font-medium text-xl uppercase p-3">
          totalCartPrice:
          <span className="text-slate-500 p-3 text-shadow-md text-2xl">
            {allCartItem?.totalCartPrice ?? 0}
          </span>
        </h3>
      </div>

      {/* Desktop table */}
      <div className="hidden  md:flex flex-col md:flex-row justify-between items-center gap-6 relative ">
        <div className=" w-full lg:w-8/12">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 md:px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th className="px-4 sm:px-6 py-3">Product</th>
                  <th className="px-4 sm:px-6 py-3">Qty</th>
                  <th className="px-4 sm:px-6 py-3">Price</th>
                  <th className="px-4 sm:px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allCartItem?.products.map((product) => (
                  <tr
                    key={product.product._id ?? product._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-2 sm:p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-12 sm:w-16 md:w-32 max-w-full max-h-full object-contain"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 text-xs sm:text-sm">
                      {product.product.title}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            UpdateItem(product.product._id, product.count - 1)
                          }
                          className="cursor-pointer inline-flex items-center justify-center p-1 me-2 text-xs sm:text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                          type="button"
                          aria-label="Decrease quantity"
                          title="Decrease quantity"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <span className="mx-2">
                          {loadingItem === product.product._id ? (
                            <svg
                              className="w-4 h-4 animate-spin text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              />
                            </svg>
                          ) : (
                            product.count
                          )}
                        </span>

                        <button
                          onClick={() =>
                            UpdateItem(product.product._id, product.count + 1)
                          }
                          className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                          type="button"
                          aria-label="Increase quantity"
                          title="Increase quantity"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 text-xs sm:text-sm">
                      {product.price ?? product.product.price ?? 0}
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => DeleteCArt(product.product._id)}
                        className="cursor-pointer font-medium text-red-600 hover:underline text-xs sm:text-sm"
                        type="button"
                        aria-label="Remove item"
                        title="Remove item"
                      >
                        {loading ? (
                          <div className="flex-1 flex items-center justify-center min-h-[70vh]">
                            <span className="loader"></span>
                          </div>
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="hidden absolute top-0 right-0 lg:block">
          <div className=" p-6 gap-4 shadow-2xl">
            <h3 className=" text-black font-medium text-xl uppercase p-3">
              totalCartPrice:
              <span className="text-slate-500 p-3 text-shadow-md text-2xl">
                {allCartItem?.totalCartPrice ?? 0}
              </span>
            </h3>
            <button
              onClick={() => ClearUserCart()}
              className="cursor-pointer w-60 bg-white hover:bg-black text-black hover:text-white border-2 transform transition-all ease-in-out duration-500 px-6 py-2 rounded-lg my-3 flex justify-center mx-auto "
            >
              <span>Clear Cart</span>
            </button>
            <button className="cursor-pointer w-60 bg-black hover:bg-white text-white hover:text-black border-2 transform transition-all ease-in-out duration-500 px-6 py-2 rounded-lg  flex justify-center mx-auto">
              <Link to="/checkout">Checkout</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="my-5 hidden md:flex flex-col gap-3 lg:hidden">
        <button
          onClick={() => ClearUserCart()}
          className="cursor-pointer w-60 bg-white hover:bg-black text-black hover:text-white border-2 transform transition-all ease-in-out duration-500 px-6 py-2 rounded-lg mt-4 flex justify-center mx-auto "
        >
          <span>Clear Cart</span>
        </button>
        <button className="cursor-pointer w-60 bg-black hover:bg-white text-white hover:text-black border-2 transform transition-all ease-in-out duration-500 px-6 py-2 rounded-lg  flex justify-center mx-auto">
          <Link to="/checkout">Checkout</Link>
        </button>
      </div>

      {/* Mobile cards */}
      <div>
        <h3 className="md:hidden text-black font-medium text-md uppercase p-3">
          totalCartPrice:
          <span className="text-slate-500">
            {" "}
            {allCartItem?.totalCartPrice ?? 0}
          </span>
        </h3>
        <div className="grid grid-cols-2 gap-4  md:hidden">
          {allCartItem?.products.map((product) => (
            <motion.div
              key={product._id ?? product.product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="hover:bg-gray-100 border border-gray-300 rounded-lg py-2 flex-col justify-center items-center gap-4">
                <img
                  src={product.product.imageCover}
                  alt={product.product.title}
                  className="w-full rounded"
                />
                <div className="ml-3 py-1.5">
                  <h3 className="font-semibold mb-3">
                    {product.product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        UpdateItem(product.product._id, product.count - 1)
                      }
                      className="cursor-pointer inline-flex items-center justify-center p-1 me-2 text-xs sm:text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      type="button"
                      aria-label="Decrease quantity"
                      title="Decrease quantity"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    <span className="mx-2">
                      {loadingItem === product.product._id ? (
                        <svg
                          className="w-4 h-4 animate-spin text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                      ) : (
                        product.count
                      )}
                    </span>

                    <button
                      onClick={() =>
                        UpdateItem(product.product._id, product.count + 1)
                      }
                      className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-xs sm:text-sm text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      type="button"
                      aria-label="Increase quantity"
                      title="Increase quantity"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-green-600 font-bold">
                    {product.price ?? product.product.price ?? 0} EGP
                  </p>

                  <div>
                    <button
                      onClick={() => DeleteCArt(product.product._id)}
                      className="cursor-pointer font-medium text-red-600 hover:underline text-xs sm:text-sm"
                      type="button"
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      {loading ? (
                        <div className="flex-1 flex items-center justify-center min-h-[70vh]">
                          <span className="loader"></span>
                        </div>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="my-5 flex flex-col gap-3 md:hidden">
          <button
            onClick={() => ClearUserCart()}
            className="cursor-pointer w-60 bg-white hover:bg-black text-black hover:text-white border-2 transform transition-all ease-in-out duration-500 px-6 py-2 rounded-lg mt-4 flex justify-center mx-auto "
          >
            <span>Clear Cart</span>
          </button>
          <button className="cursor-pointer w-60 bg-black hover:bg-white text-white hover:text-black border-2 transform transition-all ease-in-out duration-500 px-6 py-2 rounded-lg  flex justify-center mx-auto">
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
