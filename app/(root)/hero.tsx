"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
];

const texts = [
  "WELCOME TO NASS LIBRARY",
  "Access to a World of Knowledge",
  "Supporting Academic Excellence",
  "Your Resource for Lifelong Learning",
  "Empowering Research and Learning",
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
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-900 -mt-20 mb-10 rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          className="absolute inset-0"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={images[currentImage]}
            alt={`NASS Library slide ${currentImage + 1}: ${texts[currentImage]}`}
            fill
            className="object-cover rounded-lg"
            priority={currentImage === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 z-10 rounded-lg"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12">
        <motion.h1
          key={texts[currentImage]}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {texts[currentImage]}
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl font-sans font-light max-w-3xl mb-8 leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The NASS Library offers a vast collection of resources to support your research and learning journey. Join us to access books, journals, and more.
        </motion.p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.a
            href="/sign-in"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-700 rounded-full hover:bg-blue-800 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join the Library
          </motion.a>
          <motion.a
            href="/search"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Search Catalog
          </motion.a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center space-x-3 py-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentImage === index ? "bg-blue-500 scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent z-20 rounded-t-lg"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent z-20 rounded-b-lg"></div>
    </div>
  );
};

export default Hero;