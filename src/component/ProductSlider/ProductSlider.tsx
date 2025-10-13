import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface Product {
  id?: string;
  _id?: string;
  title?: string;
  images?: string[];
  imageCover?: string;
  [key: string]: unknown;
}

interface Props {
  product: Product;
}

export default function ProductSlider({ product }: Props): React.ReactElement {
  const images =
    product.images ?? (product.imageCover ? [product.imageCover] : []);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor
      centeredSlides
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
      {images.map((image, idx) => (
        <SwiperSlide
          key={product.id ?? product._id ?? idx}
          className="w-48 h-60 flex items-center justify-center"
        >
          <img
            src={image}
            alt={product.title ?? "product"}
            className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
