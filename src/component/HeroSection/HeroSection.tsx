import imageHero from "../../assets/marque-bg-02.png";
import imageHero1 from "../../assets/marque-bg-01.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full">
      <img className="w-full h-full" src={imageHero1} alt="" />

      <div className="absolute inset-0 bg-cover bg-center">
         <motion.img
            src={imageHero}
            alt=""
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
      </div>

      {/* النص والمحتوى */}

      <div className="absolute w-full bottom-[8%] left-[50%] transform -translate-x-[50%] text-white z-50 flex flex-col items-center justify-center   text-center px-4">
        <h1 className="lg:text-5xl sm:text-xl font-bold mb-4 animate-fade-in">
          Classically Beautiful Outfits
        </h1>
        <Link to="/products">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black transition-all duration-700 ease-in-out">
              SHOP COLLECTION
            </button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
