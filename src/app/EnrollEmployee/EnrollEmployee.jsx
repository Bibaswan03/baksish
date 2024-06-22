"use client";
//import Spin from "@/app/(Utilities)/Spin";
import React, { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import Image from "next/image";
import { validatePattern, ValidateVPA } from "bhimupijs";
import { signUpSchema } from "./FormValidator";



function EnrollEmployee(res_data) {
  const fileInputRef = useRef(null);

  const [uploadedphoto, setuploadedphoto] = useState(false)
  const res_id = res_data.res_data.res_id;
  let emp_id = res_data.res_data.last_emp_id;
  emp_id = emp_id + 1;
  const employee_id = "EMP_" + emp_id.toString();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    upi_id: "",
    terms: false,
  };
  const [loading, setloading] = useState(false);
  const [tickterms, settickterms] = useState(false);
  const [upi_id, setupi_id] = useState("");
  const [photo, setphoto] = useState();
  const [validupi, setvalidupi] = useState(true);
  //const [phototype, setphototype] = useState("")
  let phototype = "";
  //let tickterms=false;
  function disableScroll() {
    window.scrollTo(0, 0);
  }

  function enableScroll() {
    window.onscroll = function () {};
  }
  const changetickterm = () => {
    settickterms(!tickterms);
  };
  //otpgenerate

  const handleSubmit_UPI = (e) => {
    setupi_id(e.target.value);
    // const validationResult = validatePattern(e.target.value);
    // if (!validationResult.isQueryPatternValid) {
    //   setvalidupi(false);
    // } else {
    //   setvalidupi(true);
    // }
  };

  //submit form for signup
  const handlesubmit_for_signup = async (v) => {
    try {
      setloading(true);
      disableScroll();
      const record = {
        key: res_data.res_data.key,
        last_res_id: res_data.res_data.last_res_id,
        last_emp_id: emp_id,
      };
      let recordres = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/updaterecord`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );
      const recorddata = await recordres.json();
      if (recorddata.success) {
        const photo_data = {
          key: employee_id,
          type: phototype,
        };
        let put_response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/awsapiput`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(photo_data),
          }
        );
        const put_resdata = await put_response.json();
        const put_url = put_resdata.url;

        let response = await fetch(put_url, {
          method: "PUT",
          headers: {
            "Content-Type": phototype,
          },
          body: photo,
        });
        const result = response.text();

        const data = {
          emp_id: employee_id,
          res_id: res_id,
          name: v.name,
          email: v.email,
          phone: v.phone,
          upi_id: v.upi_id,
          photo: `https://tipppz-emp-photos.s3.ap-south-1.amazonaws.com/${employee_id}.jpg`,
        };
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/employeeregister`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const resdata = await res.json();
        if (resdata) {
          setloading(false);
          enableScroll();
        }
        // console.log(resdata);
        if (resdata.success) {
          toast.success("Employee enrolled.");
          setTimeout(() => {
            window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}`;
          }, 3000);
        } else {
          if (resdata.error == 101) {
            toast.error("Email already registered.");
          } else if (resdata.error == 102) {
            toast.error("Phone already registered.");
          } else if (resdata.error == 103) {
            toast.error("Restaurant id already registered.");
          } else {
            toast.error(
              "Unexpected error occured. We are sorry for the inconvenience"
            );
          }
          // setTimeout(() => {
          //   window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/EnrollEmployee`;
          // }, 500);
        }
      } else {
        toast.error("Unexpected error occured. Try refreshing the page");

        setloading(false);
        setTimeout(() => {
          window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/EnrollEmployee`;
        }, 2000);
      }
    } catch (error) {
      toast.error("Unexpected error occured. Try refreshing the page");

      setloading(false);
      setTimeout(() => {
        window.location = `${process.env.NEXT_PUBLIC_VERCEL_URL}/EnrollEmployee`;
      }, 2000);
    }
    setupi_id("");
    
    settickterms(false);
    setvalidupi(false);
    setuploadedphoto(false);
    setphoto(null); // Reset file state
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        handlesubmit_for_signup(values);
        action.resetForm();
      },
    });
  //console.log(errors, photo,uploadedphoto);

  return (
    <div className="">
      <Toaster />{" "}
      {loading && (
        <div className="absolute top-0 z-50 h-full w-full flex justify-center items-center backdrop-blur-sm">
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
        </div>
      )}
      <section className="loginform">
        <div className="container mx-auto ">
          <div className="flex  justify-center px-6 my-10">
            {/* Row */}
            <div className="w-full xl:w-2/4 lg:w-11/12 flex bg-gray-50 shadow-md rounded-xl">
              {/* Col */}

              {/* Col */}
              <div className="w-full  bg-transparent md:p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 font-sans font-semibold text-slate-500 text-2xl">
                    Register Your Employee{" "}
                    <span className="text-yellow-500 "> Baksish</span>
                  </h3>
                  <p className="mb-4 text-[.8rem] text-gray-500">
                  " Your Gateway to Appreciation "
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-transparent rounded"
                >
                  {/* Name */}
                  <div className="mb-5 relative">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="name"
                    >
                      Employee Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Enter Your Name..."
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  {/* Email */}
                  <div className="mb-5 relative">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Enter Email Address..."
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="phone"
                        id="phone"
                        type="text"
                        placeholder="Enter Your phone Number..."
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone ? (
                        <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* UPI ID */}
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="upi_id"
                    >
                      UPI ID
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="upi_id"
                        id="upi_id"
                        type="text"
                        placeholder="Enter your employee upi_id ..."
                        value={values.upi_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.upi_id && touched.upi_id ? (
                        <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                          {errors.upi_id}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="photo"
                    >
                      Employee Photo
                    </label>
                    <div className="relative">
                      {/* <input
                          className="w-full px-3 py-2 text-sm rounded-lg leading-tight text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                          name="photo"
                          id="photo"
                          type="text"
                          placeholder="Upload employee's photo..."
                          value={photo}
                          onChange={(e)=>{setphoto(e.target.value)}}
                          onBlur={handleBlur}
                        /> */}
                      <input
                        className="block w-full text-[0.85rem] text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        ref={fileInputRef}
                        name="photo"
                        onChange={(e) => {
                          setuploadedphoto(true);
                          setphoto(e.target.files?.[0]);
                          phototype = e.target.files?.[0]?.type;
                        }}
                      />
                      {errors.photo && touched.photo ? (
                        <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                          {errors.photo}
                        </p>
                      ) : null}

                      <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                        Upload a photo of the employee. The format must be
                        '.jpg' only.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      id="check"
                      name="terms"
                      onChange={handleChange}
                      type="checkbox"
                      checked={values.terms}
                      className="w-4 h-4 text-purple-600 bg-transparent border-gray-300 rounded focus:ring-purple-500"
                    />

                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 text-sm font-sans font text-gray-800 "
                    >
                      I agree with the{" "}
                      <span
                        className=" font-semibold  hover:underline hover:text-yellow-600 hover:cursor-pointer"
                        onClick={() => {
                          window.open(
                            `${process.env.NEXT_PUBLIC_VERCEL_URL}/PrivacyPolicy`,
                            '_blank"'
                          );
                        }}
                      >
                        Privacy Policy
                      </span>{" "}
                      and{" "}
                      <span
                        className="font-semibold  hover:underline hover:text-yellow-600 hover:cursor-pointer"
                        onClick={() => {
                          window.open(
                            `${process.env.NEXT_PUBLIC_VERCEL_URL}/Terms&Conditions`,
                            '_blank"'
                          );
                        }}
                      >
                        Terms and Conditions
                      </span>{" "}
                      of the company.
                    </label>
                    {errors.terms && touched.terms ? (
                      <p className="form-error p-[2px] text-[0.65rem] text-rose-500">
                        {errors.terms}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-6 mt-6 text-center">
                    <button
                      disabled={Object.keys(errors).length > 0 ||!uploadedphoto}
                      className="w-full px-4 py-2 font-bold text-white bg-yellow-300 rounded-lg hover:bg-yellow-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-500 focus:shadow-outline"
                      type="submit"
                    >
                      <span className="flex justify-center space-x-1 items-center ">
                        <span>Sign Up</span>
                      </span>
                    </button>
                    {!tickterms && (
                      <p className="text-[.7rem] text-rose-500">
                        Fill all details including checkbox
                      </p>
                    )}
                  </div>
                  <hr className="mb-6 border-t border-black/20 rounded " />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EnrollEmployee;
