"use client"
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-4">We Value Your Feedback!</h1>
        <p className="text-gray-600 mb-8">
          Please fill out the form below to share your feedback with us. Your input helps us improve our services.
        </p>
        <div className="min-h-[70vh] relative aspect-ratio">
          <iframe
            src="https://forms.gle/xWMhnstNKwgbD4wXA"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            title="Feedback Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
      <style jsx>{`
        .aspect-ratio {
          padding-bottom: 56.25%; /* 16:9 ratio */
          height: 0;
        }

        @media (max-width: 768px) {
          .aspect-ratio {
            padding-bottom: 75%; /* Adjust ratio for smaller screens if needed */
          }
        }

        @media (max-width: 480px) {
          .aspect-ratio {
            padding-bottom: 100%; /* 1:1 ratio for very small screens */
          }
        }
      `}</style>
    </div>
  );
}

export default page;
