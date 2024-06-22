"use client";
import React from "react";
import Image from "next/image";
import { encrypt } from "../(functions)/encryption";
import './name.css' 


function Photogallery(emp_data) {
  
  const data = emp_data.data;
  
  
  const handleClickToNewPage=(emp_id)=>{
    const encoded_emp_id=encrypt(emp_id)
    window.location=`${process.env.NEXT_PUBLIC_VERCEL_URL}/PayCaretaker?id=${encoded_emp_id}`
  }

  return (
    <div>
      

      <div className="mx-4">
        <h1 className="text-2xl    text-center pacifico mb-10 underline">
        Leave a Token of Thanks
        </h1>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 gap-y-8">
          {data &&
            data.map((item, i) => (
              <div key={i}>
                
                <div className="flex justify-center items-center">
                  <Image
                    className="lg:h-44 h-28 lg:w-44 w-32 max-w-full object-cover object-top rounded-full hover:cursor-pointer"
                    src={item?.photo}
                    width={150}
                    height={150}
                    alt="Loading"
                    onClick={() => handleClickToNewPage(item.emp_id)}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleClickToNewPage(item.emp_id)}
                    className="text-center lg:mt-2 hover:underline hover:cursor-pointer"
                  >
                    {item.name}{" "}
                  </button>
                </div>
               
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Photogallery;
