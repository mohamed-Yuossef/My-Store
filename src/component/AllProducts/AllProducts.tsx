// ...existing code...
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  faCartArrowDown,
  faHeart,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface Category {
  name?: string;
  // sometimes category might be a string id/name
  [key: string]: unknown;
}

interface Product {
  id?: string;
  _id?: string;
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage?: number;
  category?: string | Category;
}

type CartContextType = {
  AddToCart: (id: string) => Promise<unknown>;
  numberItem?: number;
  setNumberItem?: React.Dispatch<React.SetStateAction<number>>;
};

type WishListContextType = {
  AddWishList: (id: string) => Promise<unknown>;
  AllWishListItem: () => Promise<unknown>;
  wishlistCount?: number;
};

export default function AllProducts(): React.ReactElement {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { AddToCart, setNumberItem } = useContext(
    CartContext
  ) as CartContextType;
  const { AddWishList, AllWishListItem } = useContext(
    WishListContext
  ) as WishListContextType;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<string | null>(null);

  const productsAll = async function () {
    try {
      setLoading(true);
      const response = await axios.get<unknown>(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      // API may return response.data.data or response.data
      const items: Product[] = response?.data?.data ?? response?.data ?? [];
      setProducts(items);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ...existing code...
  async function AddCart(id?: string) {
    if (!id) return;
    setAddLoading(id);
    try {
      const res = (await AddToCart(id)) as {
        data?: { status?: string; message?: string; numOfCartItems?: number };
      };

      if (res?.data?.status === "success") {
        toast.success(res.data.message ?? "Added to cart");
        if (typeof setNumberItem === "function") {
          setNumberItem(res.data.numOfCartItems ?? 0);
        }
      } else {
        toast.error(res?.data?.message ?? "Failed to add to cart");
      }
    } catch (err) {
      const errorAny = err as unknown;
      const message =
        errorAny?.response?.data?.message ??
        errorAny?.message ??
        "Error adding to cart";
      console.error(errorAny);
      toast.error(message);
    } finally {
      setAddLoading(null);
    }
  }

  const fetchWishlistIds = async () => {
    try {
      const res = (await AllWishListItem()) as {
        data?: { data?: Array<{ id?: string }>; [key: string]: unknown };
      };
      const ids: string[] =
        res?.data?.data?.map((item) => item.id ?? "")?.filter(Boolean) ?? [];
      setWishlistIds(ids);
    } catch (error) {
      console.error(error);
      setWishlistIds([]);
    }
  };

  async function AddToWishList(id: string) {
    try {
      const res = (await AddWishList(id)) as {
        data?: { status?: string; message?: string };
      };
      if (res?.data?.status === "success") {
        toast.success(res.data?.message ?? "Added to wishlist");
        fetchWishlistIds();
      } else {
        toast.error(res?.data?.message ?? "Error adding to wishlist");
      }
    } catch (error) {
      const errAny = error as unknown;
      console.error(errAny);
      toast.error(
        errAny?.response?.data?.message ?? "Error adding to wishlist"
      );
    }
  }
  // ...existing code...

  useEffect(() => {
    productsAll();
    fetchWishlistIds();
  }, []);

  return (
    <>
      <section>
        {loading ? (
          <div className="flex justify-center items-center flex-wrap gap-10 h-96">
            <Loader />
          </div>
        ) : (
          <div className="mx-auto">
            <h2 className="flex justify-center text-2xl font-medium">
              Essential Collections
            </h2>
            <div className="md:max-w-[95%] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-xl p-4 md:p-8 lg:p-10 xl:p-12 2xl:p-16">
              {products.map((product) => {
                const productId = product.id ?? product._id ?? "";
                return (
                  <motion.div
                    key={productId || Math.random().toString(36).slice(2, 9)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="p-5 shadow rounded group relative">
                      <div className="group">
                        <div className="w-full h-52 mb-3">
                          <Link
                            to={`/productDetails/${productId}/${
                              typeof product.category === "string"
                                ? product.category
                                : (product.category as unknown)?.name ?? ""
                            }`}
                          >
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                          </Link>
                        </div>

                        <div className="py-3 px-1 group flex-col ">
                          <h2 className="text-lg font-semibold py-1">
                            {product.title?.split(" ").slice(0, 1).join(" ") ||
                              ""}
                          </h2>
                          <div className="flex justify-between items-center md:px-3">
                            <p className="text-black font-medium">
                              {product.price ?? 0} EGP
                            </p>
                            <div className="text-black font-medium">
                              <div className="flex gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="hidden md:block text-yellow-500 text-md">
                                    ⭐
                                  </span>
                                  <span className="text-black font-medium">
                                    {product?.ratingsAverage ?? "-"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center group cursor-pointer">
                        <button
                          className="cursor-pointer flex-1 px-1 md:px-3 py-1 md:py-2 text-white w-3/4 bg-stone-950 rounded-md relative overflow-hidden flex items-center justify-center gap-2"
                          onClick={() => AddCart(productId)}
                          disabled={addLoading === productId}
                          type="button"
                          aria-label="Add to cart"
                          title="Add to cart"
                        >
                          {addLoading === productId ? (
                            <svg
                              className="w-5 h-5 animate-spin"
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
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                          ) : (
                            <>
                              <span className="transition-all text-xs font-bold duration-300 group-hover:opacity-0 group-hover:translate-y-1/2">
                                Add To Cart
                              </span>
                              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-300">
                                <FontAwesomeIcon icon={faCartArrowDown} />
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="absolute top-0 right-0 flex flex-col p-1 md:p-6 gap-2 md:gap-4 transform group-hover:rotate-y-0 rotate-y-180 md:opacity-0 group-hover:opacity-100 transition-all duration-600">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (productId) AddToWishList(productId);
                          }}
                          role="button"
                          aria-label="Add to wishlist"
                          title="Add to wishlist"
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={`text-2xl transition-all duration-500 cursor-pointer ${
                              wishlistIds.includes(productId)
                                ? "text-red-500"
                                : "text-black"
                            }`}
                          />
                        </span>

                        <span
                          onClick={() =>
                            window.location.assign(
                              `/productDetails/${productId}/${
                                typeof product.category === "string"
                                  ? product.category
                                  : (product.category as unknown)?.name ?? ""
                              }`
                            )
                          }
                          className="cursor-pointer"
                          title="View details"
                          role="link"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-2xl text-black hover:text-black/75 transition-all duration-300"
                          />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
// ...existing code...
