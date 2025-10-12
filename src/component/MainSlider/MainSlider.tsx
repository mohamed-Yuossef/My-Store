import { motion } from "framer-motion";
import image1 from "../../assets/Home-4-Slider-1.jpg";
import image2 from "../../assets/grid-image-02.jpg";
import { Link } from "react-router-dom";
export default function HomeSlider() {
  return (
    <>
      {/* موبايل: صورة واحدة مع الكلام فوقها */}
      <div className="block md:hidden w-full h-[80vh] relative overflow-hidden">
        <div className="w-full h-full">
          <motion.img
            src={image2}
            alt=""
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        <div className="absolute inset-0 flex items-end px-6 pb-10 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold leading-tight text-black">
              A great contemporary ankle crop jeans
            </h1>
            <p className="mt-4 text-gray-300 text-base">
              Integer neque felis, egestas a euismod in, pulvinar et nisl
              Aliquam ullam. Nulla tincidunt convallis bibendum.
            </p>
            <div className="my-4">
              <Link to="/products">
                <button className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition text-sm">
                  SHOP COLLECTION
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ديسكتوب: سلايدر */}

      <div className="hidden md:block w-full h-screen relative overflow-hidden">
        <div className="w-full h-screen relative flex items-center justify-center">
          <motion.img
            src={image1}
            alt=""
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-[40%] left-0 pl-7 text-white max-w-2xl"
          >
            <h1 className="text-xl md:text-6xl text-black font-bold leading-tight">
              A great contemporary ankle crop jeans
            </h1>
            <p className="mt-6 text-gray-500 max-w-xl md:text-lg">
              Integer neque felis, egestas a euismod in, pulvinar et nisl
              Aliquam ullam. Nulla tincidunt convallis bibendum.
            </p>
            <Link to="/products">
              <button className="mt-6 px-6 py-3 bg-black text-white font-medium rounded-xl cursor-pointer hover:bg-white hover:text-black transition-all duration-500 ease-in-out">
                SHOP COLLECTION
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
