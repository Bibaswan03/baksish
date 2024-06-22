import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";

function SigninPage() {
  return (
    <div className="flex justify-center items-center mx-4 my-5">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={()=>{window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/RegisterResturant`}}
          className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-s-lg hover:bg-yellow-200 hover:text-gray-800    "
        >
          <SiGnuprivacyguard/>
          &nbsp;Register
        </button>
        
        <button
          type="button"
          onClick={()=>{window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/LoginResturant`}}
          className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-e-lg hover:bg-yellow-200 hover:text-gray-700    "
        >
          
          &nbsp;Sign in&nbsp;&nbsp;
          <IoMdLogIn/>
        </button>
      </div>
    </div>
  );
}

export default SigninPage;
