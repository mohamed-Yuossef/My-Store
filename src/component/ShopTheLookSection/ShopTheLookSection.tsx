import React from "react";
import inst1 from "../../assets/insta-01.jpg";
import inst2 from "../../assets/insta-03.jpg";
import inst3 from "../../assets/insta-04.jpg";
import { Link } from "react-router-dom";
// ...existing code...

type Item = {
  id: number;
  image: string;
  title?: string;
  text?: string;
  link?: string;
};

const products: Item[] = [
  {
    id: 1,
    image: inst1,
    text: "Fteger que feis. Duis sed risus suscipit justoimus pulvinar.",
    link: "/shop/look-1",
  },
  {
    id: 2,
    image: inst2,
    text: "Fteger que feis. Duis sed risus suscipit justoimus pulvinar. ",
    link: "/shop/look-2",
  },
  {
    id: 3,
    image: inst3,
    text: "Fteger que feis. Duis sed risus suscipit justoimus pulvinar. ",
    link: "/shop/look-3",
  },
];

export default function ShopTheLookSection(): React.ReactElement {
  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item: Item) => (
            <figure
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-gray-100"
            >
              {/* الصورة */}
              <img
                src={item.image}
                alt={item.title || "look"}
                className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* أوفرلاي خفيف عشان النص يبان */}
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* الكارت اللي في النص */}
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  md:opacity-0 group-hover:opacity-100
                  focus-within:opacity-100
                  transition-opacity duration-300
                "
              >
                <div
                  className="
                    pointer-events-auto
                    rounded-2xl shadow-xl
                    bg-white/70 backdrop-blur
                    px-6 py-6 w-[85%] max-w-[320px] text-center
                    border border-white/60
                  "
                >
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                    {item.text ||
                      "Sed risus duis suscipit justoimus pulvinar. Integer que felis."}
                  </p>

                  {/* أيقونة إنستجرام */}
                  <div className="mx-auto my-3 h-9 w-9 grid place-items-center rounded-full border border-gray-900/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m9.75 2.5a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"
                      />
                    </svg>
                  </div>

                  <Link
                    to={"/products"}
                    className="
                      inline-block text-xs tracking-[0.25em]
                      font-medium uppercase
                      hover:underline focus:underline
                      outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded
                    "
                  >
                    Shop The Look
                  </Link>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
