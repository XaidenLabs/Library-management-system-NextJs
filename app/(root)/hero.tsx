"use client"

import React, { useEffect, useState } from "react";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative text-white text-7xl font-bold text-center mt-20 p-10 rounded-lg h-80 flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
      <div className="relative z-10">WELCOME TO NASS LIBRARY</div>
    </div>
  );
};

export default Hero;
