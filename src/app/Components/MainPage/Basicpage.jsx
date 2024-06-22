import Image from "next/image";
import { useState , useEffect } from "react";
import React from "react";
import img1 from "../../assets/mainimg2.jpeg";
import img2 from "../../assets/mainimg1.png";
import img3 from "../../assets/mainimg3.png";
import img from "../../assets/baksish_logo.png";

function Basicpage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);
  const slides = [img1, img2 , img3];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-transparent">
        <h1 className="lg:text-5xl  flex text-3xl font-bold text-center  -mt-10 lg:mt-4"><span className="text-yellow-600 animate-pulse duration-1000">Welcome to&nbsp;</span><Image className="lg:w-44 w-32 h-fit" src={img} height={30} width={160} alt="logo"/></h1>
        <p className="mt-6 lg:text-2xl text-lg mx-2 text-center text-gray-700">Revolutionize the way your customers tip.</p>
        <div className="relative mt-10 w-[90%] md:w-[60%] h-[30%] max-w-4xl mx-auto">
          <div className="flex items-center justify-center md:ml-12 ml-[1.6rem] overflow-hidden rounded-lg shadow-lg md:w-[90%] w-[85%] relative h-48 lg:h-96">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image src={slide} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-yellow-400 text-gray-800 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-yellow-400 text-gray-800 rounded-full"
          >
            ›
          </button>
        </div>
        <div className="mt-12 mx-2 text-center">
          <h2 className="text-3xl font-semibold text-yellow-500">Why Join Us?</h2>
          <p className="mt-4 text-lg text-gray-700">Enhance customer experience and boost your employees' income with our seamless tipping solution.</p>
          <p className="mt-3 text-2xl font-semobold text-gray-700">Join us today and brighten your employees' tomorrow !</p>
        </div>
        <button onClick={()=>{window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/RegisterResturant`}} className=" mt-10 flex justify-center items-center text-center  text-gray-800 bg-yellow-300 hover:scale-95 hover:bg-yellow-200  font-medium rounded-lg text-lg animate-bounce px-5 py-2.5 me-2 mb-2">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Basicpage;
