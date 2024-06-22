"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Head from "next/head";
import "./style.css"
function Review() {
  const [link, setlink] = useState("")
  const searchParams = useSearchParams();
  const res_id = searchParams.get("id");
  // console.log(res_id);
  useEffect(() => {
    const getlink=async()=>{
      const request = await fetch("/api/getresturantreviewlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          res_id:res_id,
        }),
      });
      const response=await request.json();
      setlink(response.link);
      //console.log(link);
    }
    getlink();
  }, [])
  
  return (<>
    <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
    <div className="flex flex-col justify-center -mt-20 items-center h-screen bg-transparent text-center font-poppins">
      <div className="mb-8 animate-bounce">
        <svg
          className="w-20 h-20 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="stroke-current text-green-500"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            strokeWidth="2"
          />
          <path
            className="stroke-current text-green-500"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-green-600 mb-4 animate-fade-in-down">Payment Successful!</h2>
      <p className="text-lg textst text-gray-700 mx-4 mb-4 animate-fade-in-left">
        Thank you. <br/>We appreciate your generosity!
      </p>
      <p className="text-xl textst text-gray-700 font-bold mx-4 mb-8 animate-fade-in-right">
        Your support means the world to us. Help us improve our service.
      </p>
      <h1 className="text-3xl font-serif">Rate us!</h1>
      <a
        className="bg-yellow-300 text-gray-800 mt-2 font-sans font-semibold py-2 px-4 rounded-lg text-lg hover:bg-yellow-200 transition-colors duration-300 animate-fade-in-up"
        href={link}
      >
        Rate our Restaurant
      </a>
    </div>
    </>
  );
}

export default Review;
