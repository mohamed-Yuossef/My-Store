import React, { useContext, useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { WishListContext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

interface WishlistItem {
  _id: string;
  id: string;
  imageCover: string;
  title: string;
  price: number;
   category?: string | { name?: string };
}

export default function Wishlist() {
  const { AddToCart } = useContext(CartContext) as {
    AddToCart: (id: string) => Promise<any>;
  };
  const { AllWishListItem, RemoveWishlist, setWishlistCount } =
    useContext(WishListContext) as {
      AllWishListItem: () => Promise<any>;
      RemoveWishlist: (id: string) => Promise<any>;
      wishlistCount: number;
      setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
    };
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addLoading, setAddLoading] = useState<string | null>(null);
  const [, setWishlistIds] = useState<string[]>([]);

  async function fetchWishlist() {
    setLoading(true);
    try {
      let res = await AllWishListItem();
      const ids = res?.data?.data?.map((item: any) => item.id) || [];
      setWishlistIds(ids);
      setWishlistCount(res?.data?.data?.length || 0);
      setWishlist(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  function RemoveWishlistItem(id: string) {
    RemoveWishlist(id).then(() => {
      fetchWishlist();
    });
  }

  async function AddCart(id: string) {
    setAddLoading(id);
    let res = await AddToCart(id);
    setAddLoading(null);
    fetchWishlist();
    if (res.data.status === "success") {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  }

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className=" mx-auto p-4 flex justify-center items-center min-h-[70vh]">
        <div className="heartbeatloader">
          <svg
            className="svgdraw"
            width="100%"
            height="100%"
            viewBox="0 0 150 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="path"
              d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0"
              fill="transparent"
              strokeWidth={4}
              stroke="black"
            />
          </svg>
          <div className="innercircle" />
          <div className="outercircle" />
        </div>
      </div>
    );

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Heart className="w-20 h-20 text-gray-400 mb-4" />
        <p className="text-lg text-gray-600 mb-4">Favorites list is empty 😢</p>
        <Link
          to="/products"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-9 text-center">Wishlist ❤️</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col"
          >
            <Link to={`/productDetails/${item.id}/${item.category}`}>
              <img
                src={item.imageCover}
                alt={item.title}
                loading="lazy"
                className="w-full h-40 object-contain rounded-lg mb-3"
              />
            </Link>

            <h3 className="font-semibold line-clamp-2">{item.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{item.price} EGP</p>
            <div className="mt-auto flex justify-between items-center">
              <button
                className="cursor-pointer px-3 py-1 text-white w-3/4 bg-stone-950 rounded-md relative overflow-hidden flex items-center justify-center gap-2"
                onClick={() => AddCart(item.id)}
                disabled={addLoading === item.id}
              >
                {addLoading === item.id ? (
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
                    <span className="transition-all duration-300 group-hover:opacity-0">
                      Add To Cart
                    </span>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-300">
                      <FontAwesomeIcon icon={faCartArrowDown} />
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={() => RemoveWishlistItem(item._id)}
                className="cursor-pointer text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
