import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
interface Product {
  id: string;
  imageCover: string;
  images?: string[];
  title: string;
  description: string;
  category?: { name: string };
  ratingsAverage?: number;
  price: number;
}

const ProductDetails = () => {
  const { id, category } = useParams<{ id: string; category?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [addLoading, setAddLoading] = useState<string | null>(null);
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
  const { AddToCart, setNumberItem } = useContext(CartContext) as {
    AddToCart: (id: string) => Promise<unknown>;
    numberItem: number;
    setNumberItem: React.Dispatch<React.SetStateAction<number>>;
  };

  // جلب المنتج الأساسي
  function productItem(productId: string | undefined) {
    if (!productId) return;
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  // جلب المنتجات المتعلقة (غير مستخدم فعلياً هنا)
  function RelatedProduct() {
    setLoading(true);
    axios(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setRelatedProduct(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  async function AddCart(id: string) {
    setAddLoading(id);
    const res: any = await AddToCart(id);
    setAddLoading(null);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setNumberItem(res.data.numOfCartItems);
    } else {
      toast.error(res.data.message);
    }
  }

  useEffect(() => {
    productItem(id);
    RelatedProduct();
  }, [id, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-wrap gap-10 h-96">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">Product not found.</div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto my-10 px-4 py-8">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg p-6 rounded-lg">
            <div className="flex-1 flex items-center justify-center">
              <Link
                to={`/productDetails/${product.id}/${
                  product.category?.name ?? ""
                }`}
              >
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  modules={[EffectCoverflow, Pagination, Autoplay]}
                  className="w-full h-60 relative"
                >
                  {product.images?.map((image, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={image}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Link>
            </div>

            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>

              <p className="text-sm text-gray-500">
                Category: {product.category?.name}
              </p>

              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="text-gray-700">
                    {product.ratingsAverage} / 5
                  </span>
                </div>
                <p className="text-2xl font-semibold text-green-600">
                  ${product.price}
                </p>
              </div>

              <div className="flex justify-center items-center group cursor-pointer mx-10">
                <button
                  className="cursor-pointer px-3 py-1 text-white w-3/4 bg-stone-950 rounded-md relative overflow-hidden flex items-center justify-center gap-2"
                  onClick={() => AddCart(product.id)}
                  disabled={addLoading === product.id}
                >
                  {addLoading === product.id ? (
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
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductDetails;
