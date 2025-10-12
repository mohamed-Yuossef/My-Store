import imagebox1 from "../../assets/Img-box-hov-img-1-2.png";
import imagebox2 from "../../assets/Home-1-Imgbox-img-2.png";
import imagebox3 from "../../assets/Home-1-Imgbox-img-3.png";
import imagebox4 from "../../assets/Home-1-Imgbox-img-4.png";
import imagebox5 from "../../assets/Home-1-Imgbox-img-5.png";

export default function HoverGallery() {
  const IMAGES = [
    { src: imagebox1, text: "SHOP CAPS" },
    { src: imagebox2, text: "shop full set" },
    { src: imagebox3, text: "shop accessories" },
    { src: imagebox4, text: "shop bottoms" },
    { src: imagebox5, text: "shop shoes" },
  ];

  return (
    <section className="w-full h-[100vh]  flex overflow-hidden">
      {IMAGES.map((item, i) => (
        <div
          key={i}
          className="
            group relative overflow-hidden
            flex-1
            transition-all duration-500 ease-in-out
            hover:flex-[1.2]
            cursor-pointer
          "
        >
          <img
            src={item.src}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 "
          />

          {/* النص العمودي */}
          <div
            className="
              absolute right-2 top-1/5 -translate-y-1/2
              [writing-mode:vertical-rl] rotate-180
               tracking-[.25em] font-medium
              text-black/70 group-hover:text-black
              transition-colors duration-300
              pointer-events-none
              text-sm
            "
          >
            {item.text}
          </div>
        </div>
      ))}
    </section>
  );
}
