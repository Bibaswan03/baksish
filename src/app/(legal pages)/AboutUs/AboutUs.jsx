import React from "react";
import logo from "../../assets/baksish_logo.png";
import Image from "next/image";
function AboutUs() {
  return (
    <div>
      <div className="bg-transparent ">
        <div className="max-w-4xl mx-auto px-4">
        <hr className="h-px mt-8 mb-2 bg-yellow-800 border-0 "/>
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl flex items-center justify-center font-bold mb-6 text-gray-800 text-center">
              About <span className="text-yellow-500 text-4xl"><Image
                  className="ml-2 w-28"
                  src={logo}
                  height={100}
                  width={100}
                  alt="login image"
                /> </span>
            </h1>
            <p className="text-lg mb-6 text-gray-800 leading-relaxed">
              Welcome to our restaurant tipping platform! We aim to
              revolutionize the way customers show appreciation for the service
              they receive at restaurants.
            </p>
            <p className="text-lg mb-6 text-gray-800 leading-relaxed">
              With the advent of online payments, the traditional culture of
              giving tips to waiters has changed. We provide a convenient and
              secure platform where customers can easily tip their waiters
              through online UPI payments after selecting them based on their
              dining experience.
            </p>
            <p className="text-lg mb-6 text-gray-800 leading-relaxed">
              Our platform benefits both customers and waitstaff, creating a
              win-win situation for everyone involved. Customers can express
              their gratitude for exceptional service, while waiters receive
              recognition and additional income for their hard work.
            </p>
            <p className="text-lg mb-6 text-gray-800 leading-relaxed">
              Whether you're a restaurant owner looking to enroll your waitstaff
              or a customer eager to show appreciation for great service, we
              welcome you to join our community and be part of the tipping
              revolution!
            </p>
          </div>
          <hr className="h-px mt-3 mb-8 bg-yellow-700 border-0 "/>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
