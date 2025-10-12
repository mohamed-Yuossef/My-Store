import React, { useContext, useEffect, useState } from "react";
import image2 from "../../assets/grid-image-02.jpg";
import image3 from "../../assets/grid-image-03.jpg";
import image4 from "../../assets/grid-image-04.jpg";
import image1 from "../../assets/grid-image-01.jpg";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import MainSlider from "../MainSlider/MainSlider";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import HoverGallery from "../ImageBox/ImageBox";
import ProductShowcase from "../ProductShowcase/ProductShowcase";
import HeroSection2 from "../HeroSection2/HeroSection2";
import ShopTheLookSection from "../ShopTheLookSection/ShopTheLookSection";
import { WishListContext } from "../../Context/WishListContext";

interface Category {
  name?: string;
  [key: string]: any;
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
  AddToCart: (id: string) => Promise<any>;
  setNumberItem?: React.Dispatch<React.SetStateAction<number>>;
};

type WishListContextType = {
  AddWishList: (id: string) => Promise<any>;
  AllWishListItem: () => Promise<any>;
};

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const { AddToCart, setNumberItem } = useContext(CartContext) as CartContextType;
  const [addLoading, setAddLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { AddWishList, AllWishListItem } = useContext(WishListContext) as WishListContextType;
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  async function AddToWishList(id: string): Promise<any> {
    try {
      const res = await AddWishList(id);
      toast.success("add to wishlist");
      setWishlistIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      return res;
    } catch (error) {
      toast.error("error");
      throw error;
    }
  }

  const fetchWishlistIds = async (): Promise<void> => {
    try {
      const res = await AllWishListItem();
      const ids: string[] = res?.data?.data?.map((item: any) => item.id) || [];
      setWishlistIds(ids);
    } catch (error) {
      console.error(error);
    }
  };

  async function AddCart(id?: string): Promise<void> {
    if (!id) return;
    setAddLoading(id);
    try {
      const res = await AddToCart(id);
      if (res?.data?.status === "success") {
        toast.success(res.data.message);
        if (typeof setNumberItem === "function") {
          setNumberItem(res.data.numOfCartItems);
        }
      } else {
        toast.error(res?.data?.message ?? "Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    } finally {
      setAddLoading(null);
    }
  }

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        const items: Product[] = res?.data?.data ?? res?.data ?? [];
        setProducts(items);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchWishlistIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedProducts = products.slice(0, 12);

  return (
    <>
      <div className="container mx-auto">
        <MainSlider />
      </div>

      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
        <div className="group md:row-span-2 md:col-span-1 relative overflow-hidden">
          <img
            src={image3}
            loading="lazy"
            alt="Clearance Sale"
            className="w-full h-72 md:h-full object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <button className="absolute hover:text-white hover:bg-black group-hover:-translate-y-4 bottom-0 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out bg-white bg-opacity-60 text-black px-4 py-2 rounded z-10">
            <Link to="#">CLEARANCE SALE</Link>
          </button>
        </div>

        <div className="relative group overflow-hidden">
          <img
            src={image2}
            alt="Jacket Store"
            loading="lazy"
            className="w-full h-72 object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <button className="absolute hover:text-white hover:bg-black group-hover:-translate-y-4 bottom-0 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out bg-white bg-opacity-60 text-black px-4 py-2 rounded z-10">
            <Link to="#">JACKET STORE</Link>
          </button>
        </div>

        <div className="relative group overflow-hidden">
          <img
            src={image4}
            loading="lazy"
            alt="Women Shop"
            className="w-full h-72 object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <button className="absolute hover:text-white hover:bg-black group-hover:-translate-y-4 bottom-0 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out bg-white bg-opacity-60 text-black px-4 py-2 rounded z-10">
            <Link to="#">WOMEN SHOP</Link>
          </button>
        </div>

        <div className="relative md:col-span-2 group overflow-hidden">
          <img
            src={image1}
            loading="lazy"
            alt="Kids Store"
            className="w-full h-72 object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <button className="absolute hover:text-white hover:bg-black group-hover:-translate-y-4 bottom-0 left-1/2 transform -translate-x-1/2 transition duration-500 ease-in-out bg-white bg-opacity-60 text-black px-4 py-2 rounded z-10">
            <Link to="">KIDS STORE</Link>
          </button>
        </div>
      </section>

      <div className="container mx-auto">
        <HeroSection />
      </div>

      <div className="text-center mt-10">
        <h2 className="text-xl md:text-3xl font-bold my-4">Essential Collections</h2>
      </div>

      <div className="md:max-w-[95%] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10 mt-8">
        {displayedProducts.map((product) => {
          const productId = product.id ?? product._id ?? "";
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
                    <Link to={`/productDetails/${productId}/${typeof product.category === "string" ? product.category : (product.category as Category)?.name ?? ""}`}>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  <div className="py-3 px-1 flex flex-col">
                    <h2 className="text-lg font-semibold py-1">
                      {product.title.split(" ").slice(0, 1).join(" ")}
                    </h2>
                    <div className="flex justify-between items-center md:px-3">
                      <p className="text-black font-medium">{product.price} EGP</p>
                      <div className="text-black font-medium">
                        <div className="flex gap-1">
                          <div className="flex items-center gap-2">
                            <span className="hidden md:block text-yellow-500 text-md">⭐</span>
                            <span className="text-black font-medium">{product?.ratingsAverage ?? "-"}</span>
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
                      <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    ) : (
                      <>
                        <span className="transition-all text-xs font-bold duration-300 group-hover:opacity-0 group-hover:translate-y-1/2">Add To Cart</span>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-300">
                          <FontAwesomeIcon icon={faCartArrowDown} />
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <div className="absolute top-0 right-0 flex flex-col p-6 gap-8 opacity-0 group-hover:opacity-100 transition-all duration-900 [transform-style:preserve-3d]">
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
                      className={`text-2xl transition-all duration-500 cursor-pointer ${wishlistIds.includes(productId) ? "text-red-500" : "text-gray-400"}`}
                    />
                  </span>

                  <span
                    onClick={() =>
                      navigate(`/productDetails/${productId}/${typeof product.category === "string" ? product.category : (product.category as Category)?.name ?? ""}`)
                    }
                    className="cursor-pointer"
                    title="View details"
                    role="link"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-2xl text-black hover:text-black/75 transition-all duration-300" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center my-14">
        <button onClick={() => navigate("/products")} className="hover:bg-black hover:text-white font-normal cursor-pointer text-black px-10 py-2 rounded border-2 border-black">
          VIEW ALL
        </button>
      </div>

      <HoverGallery />
      <ProductShowcase />
      <HeroSection2 />
      <ShopTheLookSection />
    </>
  );
}
