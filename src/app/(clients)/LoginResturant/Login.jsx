"use client";

import React, { useState } from "react";
import { signInSchema } from "../FormValidator";
import Image from "next/image";
import img from "../../assets/baksish_logo.png";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
//import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "react-hot-toast";

import { useFormik } from "formik";

function Login({ signup_set }) {
  function checkNumber(str) {
    return /^\d+$/.test(str);
  }

  //loading
  const [loading, setloading] = useState(false);
  //signin data
  const [username, setusername] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  //signup validation and signup input
  const [validusername, setvalidusername] = useState(true);

  //submit form for signin
  const handlesubmit_for_signin = async (v) => {
    try {
      setloading(true);
      let data;
      if (checkNumber(v.Username)) {
        data = { email: "", phone: v.Username, password: v.password };
      } else {
        data = { email: v.Username, phone: "", password: v.password };
      }

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/resturantlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resdata = await res.json();
      if (resdata.success) {
        localStorage.setItem("token", resdata.token);
        setloading(false);
        setusername("");
        setloginpassword("");
        toast.success("Login Successful");
        setTimeout(() => {
          window.location = process.env.NEXT_PUBLIC_VERCEL_URL;
        }, 1000);
      } else if (resdata.registered) {
        toast.error("Invalid credentials");
        setusername("");
        setloginpassword("");
        setloading(false);
      } else if (!resdata.registered) {
        toast.error("Username not registered. Please register");
        setusername("");
        setloginpassword("");
        setloading(false);
      } else {
        toast.error("Unexpected error occured");
        setusername("");
        setloginpassword("");
        setloading(false);
        setTimeout(() => {
          window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        }, 2000);
      }
    } catch (error) {
      toast.error("Unexpected error occured. Try refreshing the page");
      setusername("");
      setloginpassword("");
      setloading(false);
      setTimeout(() => {
        window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}`;
      }, 2000);
    }
  };

  //view password controler
  const [passwordview, setpasswordview] = useState(false);
  const tooglepasswordview = () => {
    setpasswordview(!passwordview);
  };

  const initialValues = {
    Username: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        handlesubmit_for_signin(values);
        action.resetForm();
      },
    });

  return (
    <div className="">
      <Toaster />{" "}
      {loading && (
        <div className="min-h-screen flex justify-center bg-yellow-200/40 backdrop-blur-xl items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin  fill-yellow-600"
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
      <section className="loginform">
        <div className="container mx-auto ">
          <div className="flex justify-center px-6 my-10">
            {/* Row */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex bg-white shadow-md rounded-xl">
              {/* Col */}
              <div className="w-full text-center h-full bg-transparent my-10   hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
                <Image
                  className="ml-32 mt-32"
                  src={img}
                  height={300}
                  width={300}
                  alt="login image"
                />
                <h1 className="mt-24 z-50 text-center font-serif font-semibold text-2xl text-yellow-600">
                  " Your Gateway to Appreciation "
                </h1>
              </div>
              {/* Col */}
              <div className="w-full lg:w-1/2 bg-transparent p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 flex items-center justify-center mb-2 font-sans font-semibold text-slate-500 text-2xl">
                    Login With <span className=" "><Image
                  className="ml-2"
                  src={img}
                  height={100}
                  width={100}
                  alt="login image"
                /> </span>
                  </h3>
                  <p className="mb-4 text-[.8rem] text-gray-500">
                  " Your Gateway to Appreciation "
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-transparent rounded"
                >
                  <div className="mb-4 relative">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700"
                      htmlFor="Username"
                    >
                      Email / Phone No.
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="Username"
                      id="Username"
                      type="email"
                      placeholder="Enter Your Email Address or Phone Number"
                      value={values.Username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {!validusername && (
                      <span className="absolute -bottom-5 text-rose-500 right-1  text-[.65rem]">
                        *Invalid Username Format
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700"
                      htmlFor="passsword"
                    >
                      Password
                    </label>
                    <div className="relative">
                      {!passwordview ? (
                        <input
                          className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Enter Your Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      ) : (
                        <input
                          className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                          name="password"
                          id="password"
                          type="text"
                          placeholder="Enter Your Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      )}
                      {!passwordview && (
                        <AiFillEye
                          onClick={tooglepasswordview}
                          className="absolute cursor-pointer text-slate-500 hover:text-yellow-500 right-2 top-2 text-xl"
                        />
                      )}
                      {passwordview && (
                        <AiFillEyeInvisible
                          onClick={tooglepasswordview}
                          className="absolute cursor-pointer text-slate-500 hover:text-yellow-500 right-2 top-2 text-xl"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-gray-600 bg-yellow-300 rounded-lg hover:bg-yellow-200 focus:outline-none disabled:cursor-not-allowed focus:shadow-outline"
                      disabled={Object.keys(errors).length > 0}
                      type="submit"
                    >
                      <span className="flex justify-center font-semibold space-x-1 items-center ">
                        <span>Sign In</span>
                      </span>
                    </button>
                  </div>
                  <hr className="mb-6 border-t border-black/20 rounded " />

                  <div className="md:flex text-center text-slate-500 justify-between items-center">
                    <p className="text-[.8rem]">
                      Don't Have An Account ?{" "}
                      <span
                        onClick={() => {
                          window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/RegisterResturant`;
                        }}
                        className="hover:text-yellow-600  font-semibold underline-offset-1 hover:underline cursor-pointer"
                      >
                        Register
                      </span>{" "}
                    </p>
                    <Link
                      href={"/ForgotPassword"}
                      className="text-[.8rem]  hover:underline hover:text-yellow-600 cursor-pointer"
                    >
                      Forgot Password?{" "}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
