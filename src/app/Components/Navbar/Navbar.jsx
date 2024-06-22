"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { CgMenuGridO, CgClose } from "react-icons/cg";
import img from "../../assets/baksish_logo.png";
import Image from "next/image";

function Navbar() {
    const [mobile, setmobile] = useState(false);
    return (
      <nav className="bg-[#fdff97] shadow-md   py-2 z-30">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div
              className="absolute inset-y-0 left-0 flex items-center sm:hidden"
              onClick={() => {
                setmobile(!mobile);
              }}
            >
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-transparent hover:text-slate-900 focus:outline-none  "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
  
                {!mobile && <CgMenuGridO className="text-xl text-slate-900" />}
                {mobile && <CgClose className="text-xl text-slate-900" />}
  
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link href={"/"} className="flex flex-shrink-0 items-center">
                
                <Image className="w-[100px]" src={img} height={40} width={80} alt="logo"/>
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center space-x-4">
                  <Link
                    href={"/AboutUs"}
                    className="text-slate-700 hover:scale-95 hover:text-slate-500 rounded-md px-3 py-2 text-[1rem] font-medium"
                  >
                    About Us
                  </Link>
                  <Link
                    href={"/ContactUs"}
                    className="text-slate-700 hover:scale-95 hover:text-slate-500 rounded-md px-3 py-2 text-[1rem] font-medium"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href={"/Feedback"}
                    className="text-slate-700 hover:scale-95 hover:text-slate-500 rounded-md px-3 py-2 text-[1rem] font-medium"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {mobile && (
          <div className="sm:hidden transition-all duration-500" id="mobile-menu" onMouseLeave={()=>setmobile(false)}>
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href={"/AboutUs"}
                className="text-slate-700 hover:bg-[#D6F8E7] hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium"
              >
                About Us
              </Link>
              <Link
                href={"/ContactUs"}
                className="text-slate-700 hover:bg-[#D6F8E7] hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium"
              >
                ContactUs
              </Link>
              <Link
                href={"/Feedback"}
                className="text-slate-700 hover:bg-[#D6F8E7] hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium"
              >
                Feedback
              </Link>
            </div>
          </div>
        )}
        </nav>
  )
}

export default Navbar