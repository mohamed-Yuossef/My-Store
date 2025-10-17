import React, { useContext, useEffect, useState } from "react";
import image2 from "../../assets/grid-image-02.jpg";
import image3 from "../../assets/grid-image-03.jpg";
import image4 from "../../assets/grid-image-04.jpg";
import image1 from "../../assets/grid-image-01.jpg";
import image5 from "../../assets/blog-11.jpg";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import MainSlider from "../MainSlider/MainSlider";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import HoverGallery from "../ImageBox/ImageBox";
import HeroSection2 from "../HeroSection2/HeroSection2";
import ShopTheLookSection from "../ShopTheLookSection/ShopTheLookSection";
import { WishListContext } from "../../Context/WishListContext";
import axios from "axios";

interface Category {
  name?: string;
  [key: string]: unknown;
}

interface Product {
  id?: string;
  _id?: string;
  imageCover: string;
  data?: string;
  title: string;
  price: number;
  ratingsAverage?: number;
  category?: string | Category;
}

type CartContextType = {
  AddToCart: (id: string) => Promise<AxiosResponse<{ status: string; message: string; numOfCartItems?: number }>>;
  setNumberItem?: React.Dispatch<React.SetStateAction<number>>;
};

type WishListContextType = {
  AddWishList: (id: string) => Promise<AxiosResponse<{ status: string; message: string }>>;
  AllWishListItem: () => Promise<AxiosResponse<{ data: Array<{ id?: string }> }>>;
};

export default function Home(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const { AddToCart, setNumberItem } = useContext(CartContext) as CartContextType;
  const [addLoading, setAddLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { AddWishList, AllWishListItem } = useContext(WishListContext) as WishListContextType;
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const AddToWishListHandler = async (id: string): Promise<void> => {
    try {
      const res = await AddWishList(id);
      if (res.data.status === "success") {
        toast.success(res.data.message || "Added to wishlist");
        setWishlistIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      } else {
        toast.error(res.data.message || "Error adding to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const fetchWishlistIds = async (): Promise<void> => {
    try {
      const res = await AllWishListItem();
      const ids = (res.data?.data ?? [])
        .map((item) => item.id)
        .filter((id): id is string => Boolean(id));
      setWishlistIds(ids);
    } catch (error) {
      console.error(error);
      setWishlistIds([]);
    }
  };

  const AddCartHandler = async (id?: string): Promise<void> => {
    if (!id) return;
    setAddLoading(id);
    try {
      const res = await AddToCart(id);
      if (res.data.status === "success") {
        toast.success(res.data.message);
        setNumberItem?.(res.data.numOfCartItems ?? 0);
      } else {
        toast.error(res.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    } finally {
      setAddLoading(null);
    }
  };

  useEffect(() => {
    axios
      .get<{ data: Product[] }>("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data ?? []);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchWishlistIds();
  }, []);

  const displayedProducts = products.slice(0, 12);

  return (
    <>
      <div className="container mx-auto">
        <MainSlider />
      </div>

      {/* Grid Sections */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 ">
        {[
          { img: image3, label: "CLEARANCE SALE" },
          { img: image2, label: "JACKET STORE" },
          { img: image4, label: "WOMEN SHOP" },
          { img: image5, label: "WOMEN SHOP" },
          { img: image1, label: "KIDS STORE", full: true },
        ].map((item, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden ${item.full ? "md:col-span-2" : ""}`}
          >
            <img
              src={item.img}
              alt={item.label}
              loading="lazy"
              className="w-full h-72 md:h-full object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
            />
            <button className="absolute hover:text-white hover:bg-black group-hover:-translate-y-4 bottom-0 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out bg-white bg-opacity-60 text-black px-4 py-2 rounded z-10">
              <Link to="/products">{item.label}</Link>
            </button>
          </div>
        ))}
      </section>

      <div className="container mx-auto">
        <HeroSection />
      </div>

      <div className="text-center mt-10">
        <h2 className="text-xl md:text-3xl font-bold my-4">Essential Collections</h2>
      </div>

      {/* Products */}
      <div className="md:max-w-[95%] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10 mt-8">
        {displayedProducts.map((product) => {
          const productId = product.id ?? product._id ?? "";
          const categoryName =
            typeof product.category === "string"
              ? product.category
              : (product.category as Category)?.name ?? "";

          return (
            <motion.div
              key={productId || product.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-5 shadow rounded group relative">
                <div className="group">
                  <div className="w-full h-52 mb-3">
                    <Link to={`/productDetails/${productId}/${categoryName}`}>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  <div className="py-3 px-1 flex flex-col">
                    <h2 className="text-lg font-semibold py-1">
                      {product.title.split(" ")[0]}
                    </h2>
                    <div className="flex justify-between items-center md:px-3">
                      <p className="text-black font-medium">{product.price} EGP</p>
                      <div className="flex items-center gap-2">
                        <span className="hidden md:block text-yellow-500 text-md">⭐</span>
                        <span className="text-black font-medium">
                          {product?.ratingsAverage ?? "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add To Cart Button */}
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => AddCartHandler(productId)}
                    disabled={addLoading === productId}
                    className="cursor-pointer flex-1 px-1 md:px-3 py-1 md:py-2 text-white w-3/4 bg-stone-950 rounded-md relative overflow-hidden flex items-center justify-center gap-2"
                    type="button"
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
                          strokeWidth={4}
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
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

                <div className="absolute top-0 right-0 flex flex-col p-1 md:p-6 gap-4 transition-all duration-500 md:opacity-0 group-hover:opacity-100 sm:opacity-100 ">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      AddToWishListHandler(productId);
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
                    onClick={() => navigate(`/productDetails/${productId}/${categoryName}`)}
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

      <div className="text-center my-14">
        <button
          onClick={() => navigate("/products")}
          className="hover:bg-black hover:text-white font-normal cursor-pointer text-black px-10 py-2 rounded border-2 border-black"
        >
          VIEW ALL
        </button>
      </div>

      <HoverGallery />
      <HeroSection2 />
      <ShopTheLookSection />
    </>
  );
}
