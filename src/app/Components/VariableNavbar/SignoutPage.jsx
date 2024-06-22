import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "react-hot-toast";
function SignoutPage() {
  const handlelogout = () => {
    toast.success("Logged out");
    // alert("Logging out")
    localStorage.removeItem("token");
    window.location = process.env.NEXT_PUBLIC_VERCEL_URL;
  };
  return (
    <div>
      <Toaster/>
    <div className="flex justify-end items-center mx-4 my-5 space-x-2 mr:2 lg:mr-10">
      <div className="inline-flex rounded-md shadow-sm pr-5 " role="group">
        <button
          type="button"
          onClick={handlelogout}
          className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-lg hover:bg-yellow-200 hover:scale-95"
        >
          <IoMdLogIn/>
          &nbsp;Signout
        </button>
        
      </div>
      <div className=" text-yellow-500 text-4xl hover:cursor-pointer hover:scale-95 hover:text-yellow-300" onClick={()=>{window.location=`${process.env.NEXT_PUBLIC_VERCEL_URL}/MyAccount`}}><CgProfile /></div>
    </div>
    
    </div>
  );
}

export default SignoutPage;
