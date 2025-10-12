import hots from "../../assets/hots-01.jpg";
import imagebox1 from "../../assets/img-box02-1.jpg";
import imagbox2 from "../../assets/img-box03-1.jpg";

import React, { useState } from "react";

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState(null);

  const products = [
    {
      id: 1,
      name: "Long-sleeve T-Shirt",
      price: "$10.00",
      image: hots,
      position: { top: "30%", left: "60%" },
    },
    {
      id: 2,
      name: "White Shorts",
      price: "$20.00",
      image: imagebox1,
      position: { top: "55%", left: "45%" },
    },
    {
      id: 3,
      name: "Sneakers",
      price: "$120.00",
      image: imagbox2,
      position: { top: "80%", left: "50%" },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-10 py-16">
      {/* Left Side: Model Image */}
      <div className="relative flex justify-center">
        <img src={hots} alt="Model" className="max-h-[600px] object-contain" />
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className="absolute"
            style={{ top: item.position.top, left: item.position.left }}
          >
            {/* دائرة متحركة */}
            <span
              className={`absolute inline-flex h-full w-full rounded-full bg-black opacity-30 ${
                activeId === item.id ? "animate-ping" : ""
              }`}
            ></span>

            {/* الدائرة الأساسية بعلامة + */}
            <div
              className={`relative w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow cursor-pointer transition 
              ${
                activeId === item.id
                  ? "bg-black text-white scale-110"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="text-xl font-bold">+</span>
            </div>
          </div>
        ))}
      </div>
      {/* Right Side: Product Info */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Prestigious Brands' Goods Sale
        </h2>
        <p className="text-gray-600 mb-8">
          Integer neque felis, egestas a euismod in, pulvinar et nisl. Aliquam
          ullamcorper, nulla tincidunt convallis bibendum, justo maximus
          pulvinar.
        </p>

        <div className="space-y-6">
          {products.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between  pb-4 p-2 rounded transition 
                ${activeId === item.id ? "bg-gray-100 shadow-md" : ""}`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-gray-700">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
         
    </div>
  );
}
