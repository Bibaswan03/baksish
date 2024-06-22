"use client";
import React from "react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const validator = require("email-validator");
function page() {
  //loading
  const [loading, setloading] = useState(false);

  //contact data
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  //validation for contact data
  const [validname, setvalidname] = useState(true);
  const [validemail, setvalidemail] = useState(true);
  const [validmessage, setvalidmessage] = useState(true);

  const handleInput_for_sendmessage = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    }
    if (e.target.name == "email") {
      setemail(e.target.value);
    }
    if (e.target.name == "message") {
      setmessage(e.target.value);
    }
    if (e.target.name == "email" && validator.validate(email)) {
      setvalidemail(true);
    } else if (e.target.name == "email" && validator.validate(email) == false) {
      setvalidemail(false);
    } else if (e.target.name == "name" && e.target.value.length < 3) {
      setvalidname(false);
    } else if (e.target.name == "name" && e.target.value.length > 2) {
      setvalidname(true);
    } else if (e.target.name == "message" && e.target.value.length < 6) {
      setvalidmessage(false);
    } else if (e.target.name == "message" && e.target.value.length > 5) {
      setvalidmessage(true);
    }
  };

  //clear all fields
  const clearInput = () => {
    setname("");
    setemail("");
    setmessage("");
    setvalidemail(true);
    setvalidname(true);
    setvalidmessage(true);
  };

  function disableScroll() {
    window.scrollTo(0, 0);
  }

  function enableScroll() {
    window.onscroll = function () {};
  }

  const sentemail = async() => {
    setloading(true);
    disableScroll();
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };
    if (!email || !name || !message) {
      toast.error("Please fill all credentials.");
    } else {
      let request = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/sendcontactemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(templateParams),
        }
      );
      const response = await request.json();
      console.log(response);
      if(response.success) {toast.success("Message sent. You will recieve a reply soon.");}
    }
    setloading(false);
    enableScroll();
    clearInput();
  };

  return (
    <div>
      <Toaster
      />{" "}
      {loading && (
        <div className="min-h-screen flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <section className="text-gray-600 body-font relative">
        <div className="container md:px-20 px-2 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-200 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d4308.492192863368!2d88.38580195950892!3d22.88210269581864!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1716183001805!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            

            <div className="bg-white relative flex flex-wrap py-6 rounded-xl shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">
                  Chinsurah, Hooghly, West Bengal
                  <br />
                  Pin - 712101
                </p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a className="text-yellow-500 leading-relaxed">
                baksish247@gmail.com
                </a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed">(+91)&nbsp;9330277953</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex px-10 py-10 rounded-xl shadow-md flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-xl mb-1 font-sans font-semibold title-font">
              Let's Talk
            </h2>
            <p className="leading-relaxed mb-5 text-sm text-gray-500">
              Feel Free To Contact With Us
            </p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInput_for_sendmessage}
                value={name}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {!validname && (
                <span className="absolute -bottom-4 text-rose-500 right-1  text-[.7rem]">
                  *Name must contain more than 2 characters
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInput_for_sendmessage}
                value={email}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {!validemail && (
                <span className="absolute -bottom-4 text-rose-500 right-1  text-[.7rem]">
                  *Enter a valid email address
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleInput_for_sendmessage}
                value={message}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                defaultValue={""}
              />
              {!validmessage && (
                <span className="absolute -bottom-2 pt-[0.1rem] text-rose-500 right-1  text-[.7rem]">
                  *Message must contain more than 5 characters
                </span>
              )}
            </div>
            <button
              onClick={sentemail}
              className="text-gray-800 bg-yellow-300 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-200 rounded-lg text-base"
            >
              <span className="flex justify-center space-x-1 items-center">
                {" "}
                <p>Send Message</p> <FiSend />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
