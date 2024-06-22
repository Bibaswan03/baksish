"use client";
import React from "react";
import "./name.css";
function Resturantname(res_name) {
  console.log(res_name);
  return (
    <div className="mt-10 mb-10 flex justify-center items-center  underline-offset-0">
      <div className="w-fit mx-auto">
        {/* <div class="twelve">
          <h1>YourName</h1>
        </div> */}
        {/* <h1 className="  text-3xl lg:text-5xl font-bold leading-9 text-center  text-amber-600 bg-clip-text text-transparent pb-4">
          {res_name.res_name}
          
        </h1> */}
        <div class="text-center">
        <div class="relative inline-block">
            <div class="absolute left-0 right-[60%] top-0 h-1 bg-gradient-to-r rounded-3xl from-[#fcb02c]"></div>
            <h1 class="text-3xl font-semibold text-[#6c0345]  tracking-widest font-sans py-2 bg-clip-text">Welcome to {res_name.res_name}</h1>
            <div class="absolute left-[60%] right-0 bottom-0 h-1 bg-gradient-to-r rounded-3xl from-transparent to-[#fcb02c]"></div>
        </div>
    </div>
      </div>
    </div>
  );
}

export default Resturantname;
