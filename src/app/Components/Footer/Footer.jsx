import React from 'react'
import Link from 'next/link'
import img from "../../assets/baksish_logo.png";
import Image from 'next/image';
function Footer() {
  return (
    <div><footer className="bg-[#fdff97] mt-4 shadow ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex justify-center items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center  text-xl font-semibold whitespace-nowrap ">
          <Image className=' lg:w-[100px]' src={img} height={40} width={80} alt="logo"/>
          </span>
        </Link>
        <ul className="flex flex-wrap  justify-center items-center mb-6 text-sm font-medium text-slate-700 sm:mb-0 ">
          <li>
            <Link href={'/AboutUs'} className="hover:underline me-4 md:me-6">
              About Us
            </Link>
          </li>
          <li>
            <Link href={`/PrivacyPolicy`} className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li> 
          
          <li className="pr-6">
            <Link href={`/Terms&Conditions`} className="hover:underline">
              Terms & Conditions
            </Link>
          </li>
          <li className="pr-6">
            <Link href={`/RefundPolicy`} className="hover:underline">
              Refund Policy
            </Link>
          </li>
          <li>
            <Link href={"/ContactUs"} className="hover:underline me-4 md:me-6" >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-yellow-800 sm:mx-auto  lg:my-8" />
      <span className="block text-sm text-yellow-800 text-center ">
        © 2024{" "}
        <a href="/" className="hover:underline">
        Baksish™
        </a>
        . All Rights Reserved.
      </span>
    </div>
  </footer></div>
  )
}

export default Footer