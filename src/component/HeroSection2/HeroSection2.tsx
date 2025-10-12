import image from "../../assets/bg-03.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex justify-center items-center py-10 md:py-20 px-4">
      <div
        className="relative bg-cover  bg-center bg-no-repeat w-full max-w-6xl rounded-lg shadow-lg py-12 md:py-20 px-6 sm:px-10 md:px-20"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold mb-6">
            Versatile Clothing's For Style
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
            Maecenas sit amet enim diam, luctus nulla quis, euismod ante. Aenean
            id convallis elit. Nam risus erat, scelerisque rutrum ligula sit
            amet, molestie pellentesque diam.
          </p>

          <Link to="/products">
            <button className="px-6 sm:px-8 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition text-sm sm:text-base">
              SHOP COLLECTION
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
