// ProductSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// 👇 مهم جدًا تحط دول هنا
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function ProductSlider({ product }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="w-full h-60 relative"
    >
      {product.images?.map((image, idx) => (
        <SwiperSlide key={idx} className="w-48 h-60 flex items-center justify-center">
          <img
            src={image}
            alt={product.title}
            className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
